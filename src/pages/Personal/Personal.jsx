import React,{ useState, useEffect } from 'react';
import {
    Layout,
    Form,
    Button,
    Input,
    PageHeader,
    notification,
    Select,
    DatePicker,
    Row,
    Col,
} from 'antd';
import { Content } from 'antd/lib/layout/layout';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import { passwordChange, userinfoUpdate } from '../../services/user.js';
import Head from '../../components/Header/Header.jsx';
import PasswordDialog from "./passwordDialog/PasswordDialog.jsx"
import background from "../../asset/resource/Load.jpg";
import style from './Personal.module.less';

const { Option } = Select;

export default function Personal() {
    const [userInfo] = Form.useForm();
    let location = useLocation();
    console.log('parm',location);
    const user = {
        userId: location.state.id,
        userAccount: location.state.account,
        userGender: location.state.gender,
        userBirth: location.state.birthdate,
        userBgStory: location.state.BgStory
    }

    const [ passwordDialogVis, setPasswordDialogVis ] = useState(false)

    const onFinish = async (values) => {
        const birthday = moment(values.birthdate).format('YYYY-MM-DD');
        const boyOrNot = values.sex === 'man' ? true : false;
        const sendData = {
            id: location.state.id,
            gender: boyOrNot,
            birthdate: birthday,
            selfInfo: values.selfInfo,
        }
        console.log(sendData);
        userinfoUpdate(sendData).then(
            (res) => {
                if(res.success) {
                    notification.success({
                        message: '成功',
                        description: '修改用户信息成功'
                    })
                }
            }).catch((err) => {
                console.log('msg',err);
                if(err.code == '0') {
                    notification.success({
                        message: '成功',
                        description: err.msg
                    })
                }
            });
    }

    return (
        <div className={style.bg}>
            <Layout>
                <Head />
                <Content style={{ backgroundImage: `url(${background})`}}>
                    <div className={style.user_form}>
                        <PageHeader
                            title={'个人中心'}
                        >
                        </PageHeader>
                        <div className={style.form}>
                            <Form
                                style={{width: "700px"}}
                                form={userInfo}
                                labelCol={{ span: 4 }}
                                labelAlign={"left"}
                                onFinish={onFinish}
                            >
                                <Form.Item
                                    className={style.user_form_item}
                                    label={"用户ID"}
                                    name="id"
                                >
                                    <Input
                                        disabled={true}
                                        defaultValue={user.userId}
                                    />
                                </Form.Item>
                                <Form.Item
                                    className={style.user_form_item}
                                    label={"用户账号"}
                                    name="account"
                                >
                                    <Input
                                        disabled={true}
                                        defaultValue={user.userAccount}
                                    />
                                </Form.Item>
                                <Form.Item
                                    className={style.user_form_item}
                                    required
                                    label={"用户性别"}
                                    name="gender" 
                                    rules={[{ required: true, message: '请选择性别!' }]}
                                    initialValue={user.userGender ? "man" : "woman"}
                                >
                                    <Select
                                        placeholder="请选择性别" 
                                    >
                                        <Option value="man">男</Option>
                                        <Option value="woman">女</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    className={style.user_form_item}
                                    label={"出生日期"}
                                    name="birthdate"
                                    wrapperCol={{ span: 6, offset: 0 }}
                                    rules={[{ required: true, message: '请选择生日!' }]}
                                >
                                    <DatePicker
                                        // defaultValue={user.userBirth}
                                        placeholder="请选择生日"
                                        format={"YYYY/MM/DD"}
                                    />
                                </Form.Item>
                                <Form.Item
                                    className={style.user_form_item}
                                    label={"个人介绍"}
                                    name="selfInfo"
                                    rules={[{ required: true, message: '请输入个人简介!' }]}
                                >
                                    <Input.TextArea
                                        placeholder="请输入个人简介"
                                        defaultValue={user.userBgStory}
                                        showCount
                                        maxLength={100}
                                    />
                                </Form.Item>
                                <Form.Item 
                                    className={style.user_form_item}
                                    wrapperCol={{ span: 24, offset: 0 }}
                                >
                                    <Row>
                                        <Col span={12}>
                                            <Button type="primary" htmlType="submit">
                                                保存
                                            </Button>
                                        </Col>
                                        <Col span={12}>
                                            <Button onClick={() => {
                                                setPasswordDialogVis(true);
                                            }}>
                                                修改密码
                                            </Button>
                                            { passwordDialogVis ? (
                                                <PasswordDialog
                                                    account={location.state}
                                                    passwordDialogVis={passwordDialogVis}
                                                    setPasswordDialogVis={setPasswordDialogVis}
                                                />
                                            ) : ('')
                                            }
                                        </Col>
                                    </Row>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </Content>
            </Layout>
        </div>
    )
}