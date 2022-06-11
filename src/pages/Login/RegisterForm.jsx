import { Form, Input, Button, Select, DatePicker, notification } from 'antd';
import React,{ useState } from 'react';
import logo from '../../asset/resource/logo.png'
import styles from './index.module.less';
import { register } from '../../services/register.js';
import Local from '../../utils/storage.js';
import CryptoJs from 'crypto-js'
import moment from 'moment';

const { Option } = Select;
const dateFormat = 'YYYY/MM/DD';

export default function LoginForm() {

    const onFinish = async (values) => {
        const pwd = CryptoJs.SHA1(values.password).toString();
        values.password = pwd;
        const birthday = moment(values.birthdata).format('YYYY-MM-DD');
        const boyOrNot = values.sex === 'man' ? true : false;
        const sendData = {
            avator: '../../asset/resource/avator.jpeg',
            account: values.username,
            password: values.password,
            gender: boyOrNot,
            birthdate: birthday,
            selfInfo: values.info,
        }
        register(sendData).then(
            (res) => {
                if(res.success) {
                    notification.success({
                        message: '成功',
                        description: '注册成功'
                    })
                }
            }).catch((err) => {
                if(err.code == '0') {
                    notification.success({
                        message: '成功',
                        description: '注册成功'
                    })
                }
            });
    }

    return (
        <>
            <div className={styles.heard}>
            <div className={styles.cloud}>
                <img src={logo} alt="logo"/>
            </div>
            <p className={styles.title}>克苏鲁的呼唤</p>
            </div>
            <div className={styles.register_card}>
                <Form
                    name="normal_register"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: '请输入用户名!' }]}
                        style={{ borderBottom: '1px solid #B6B6B6', borderRadius: '12px' }}
                    >
                        <Input placeholder="请输入用户名" bordered={false} />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: '请输入密码!' }]}
                        style={{ borderBottom: '1px solid #B6B6B6', borderRadius: '12px' }}
                    >
                        <Input
                            bordered={false}
                            type="password"
                            placeholder="请输入密码"
                        />
                    </Form.Item>
                    <Form.Item
                        name="confirm"
                        dependencies={['password']}
                        rules={[
                            {
                                required: true,
                                message: '请再次输入密码!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('前后两次密码不一致！'));
                                    },
                                }),
                        ]}
                        style={{ borderBottom: '1px solid #B6B6B6', borderRadius: '12px' }}
                    >
                        <Input
                            bordered={false}
                            type="password"
                            placeholder="请再次输入密码"
                        />
                    </Form.Item>
                    <Form.Item
                        name="sex"
                        rules={[{ required: true, message: '请选择性别!' }]}
                    >
                        <Select placeholder="请选择性别" style={{ width: 400 }}>
                            <Option value="man">男</Option>
                            <Option value="woman">女</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="birth"
                        rules={[{ required: true, message: '请选择生日!' }]}
                    >
                        <DatePicker placeholder="请选择生日" format={dateFormat} style={{ width: 400 }}/>
                    </Form.Item>
                    <Form.Item
                        name="info"
                        rules={[{ required: true, message: '请输入个人简介!' }]}
                        style={{ borderBottom: '1px solid #B6B6B6', borderRadius: '12px' }}
                    >
                        <Input.TextArea placeholder="请输入个人简介" showCount maxLength={100} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block className={styles.register_button}>
                            注册
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <p style={{ color: '#8C8D9B' }} >欢迎来到克苏鲁的呼唤跑团平台</p>
                    </Form.Item>
                </Form>
            </div>
        </>

    )
}