import { Form, Input, Button, Tabs, notification } from 'antd';
import React,{ useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.less';
import logo from '../../asset/resource/logo.png'
import { login } from '../../services/login.js';
import Local from '../../utils/storage.js';
import CryptoJs from 'crypto-js'

export default function LoginForm(props) {

    let navigate = useNavigate();

    const onFinish = async (values) => {
        const pwd = CryptoJs.SHA1(values.password).toString();
        const sendData = {
            account: values.username,
            password: pwd
        }
        login(sendData).then(
            (res) => {
                if(res.success) {
                    notification.success({
                        message: '成功',
                        description: '登录成功'
                    })
                }
            }).catch((err) => {
                if(err!=undefined&&err.code == '0') {
                    notification.success({
                        message: '成功',
                        description: '登录成功'
                    })
                    if(sendData.account == 'admin') {
                        Local.removeLocal('token', true);
                        Local.removeLocal('curUser', true);
                        Local.setLocal('token', err.msg);
                        Local.setLocal('curUser', err.data);
                        navigate('backstage');
                    } else {
                        Local.removeLocal('token', true);
                        Local.removeLocal('curUser', true);
                        Local.setLocal('token', err.msg);
                        Local.setLocal('curUser', err.data);
                        navigate('home');
                    }
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
            <div className={styles.login_card}>
                <Form
                    name="normal_login"
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
                    <Form.Item>
                        <Button className={styles.login_button} type="primary" htmlType="submit" block>
                            登录
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