import React from "react"
import { Modal , Form, Input, notification} from "antd"
import { passwordChange } from '../../../services/user.js';
import CryptoJs from 'crypto-js';
import Local from '../../../utils/storage.js';
import { useNavigate } from 'react-router-dom';

export default function PasswordDialog (props) {
    const {
        account
    } = props;
    let navigate = useNavigate();
    const { passwordDialogVis, setPasswordDialogVis} = props
    const [ passwordForm ] = Form.useForm();

    const onClose = () => {
        setPasswordDialogVis(false);
    }

    const submitForm = async () => {
        const Data = passwordForm.getFieldsValue()
        const oldPwd = CryptoJs.SHA1(Data.oldPassword).toString();
        const newPwd = CryptoJs.SHA1(Data.newPassword).toString();
        const sendData = {
            id: account.id,
            oldPassword: oldPwd,
            newPassword: newPwd,
        }
        console.log('changeword',sendData);
        passwordChange(sendData).then(
            (res) => {
                if(res.success) {
                    notification.success({
                        message: '成功',
                        description: '修改密码成功'
                    })
                }
            }).catch((err) => {
                if(err.code == '0') {
                    notification.success({
                        message: '成功',
                        description: err.msg
                    })
                    // Local.removeLocal('token', true);
                    // Local.setLocal('token', err.msg);
                    onClose()
                    // navigate('/')
                }
            });
    }

    return (
        <Modal
            visible={passwordDialogVis}
            onOk={submitForm}
            title={"修改密码"}
            onCancel={onClose}
            okText={"修改"}
            cancelText={"取消"}
        >
            <Form form={passwordForm}>
                <Form.Item
                    name="oldPassword"
                    rules={[{ required: true, message: '请输入旧密码!' }]}
                >
                    <Input
                        bordered
                        type="password"
                        placeholder="请输入旧密码"
                    />
                </Form.Item>
                <Form.Item
                    name="newPassword"
                    rules={[{ required: true, message: '请输入新密码!' }]}
                >
                    <Input
                        bordered
                        type="password"
                        placeholder="请输入新密码"
                    />
                </Form.Item>
                <Form.Item
                    name="confirmNew"
                    dependencies={['newPassword']}
                    rules={[
                        {
                            required: true,
                            message: '请再次输入新密码!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('newPassword') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('前后两次密码不一致！'));
                                },
                            }),
                    ]}
                >
                    <Input
                        type="password"
                        placeholder="请再次输入新密码"
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}