import React, { Component, useState, useEffect } from 'react';
import { Layout, Menu, Row, Col } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../asset/resource/logo5.png'
import { logout } from '../../services/login.js';
import style from './BackStage.module.less'


const { Header, Content, Sider } = Layout;

export default function BackStage(props)  {
    const [collState, setCollState] = useState(false);

    const onCollapse = (collapsed) => {
        console.log(collapsed);
        setCollState(collapsed)
    };

    function getItem(label, key, icon, children) {
        return {
            key,
            icon,
            children,
            label,
        };
    }

    const items = [
        getItem('房间管理', '1'),
        getItem('用户管理', '2'),
    ];

    const loginOut = () => {
        logout().then(
            (res) => {
                if(res.success) {
                    notification.success({
                        message: '成功',
                        description: '退出登录成功'
                    })
                }
            }).catch((err) => {
                if(err.code == '0') {
                    notification.success({
                        message: '成功',
                        description: '退出登录成功'
                    })
                    Local.removeLocal('token', true);
                    Local.removeLocal('curUser', true);
                    navigate('/');
                }
        });
    }

    return (
        <Layout>
            <>
                <div className={style.headers}>
                    <div className={style.header}>
                        <Row>
                            <Col span={2}>
                                <div className={style.logo}>
                                    <img src={logo} alt=""/>
                                </div>
                            </Col>
                            <Col span={6}>
                                <div>
                                    <div className={style.text}>克苏鲁的呼唤-后台管理</div>
                                </div>
                            </Col>
                            <Col span={10}></Col>
                            <Col span={6}>
                                <div className={style.avatar}>
                                    {
                                        <>
                                        <Row>
                                            <Col span={18}>
                                                尊敬的管理员,欢迎您
                                            </Col>
                                            <Col span={6}>
                                                <span onClick={loginOut}>退出登录</span>
                                            </Col> 
                                        </Row>
                                    </>
                                    }
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </>
            <Layout>
                <Sider collapsed={collState} onCollapse={onCollapse} style={{height: 760}}>
                    <Menu theme="dark" >
                        <Menu.Item key="1"><Link to="/backstage/room">房间管理</Link></Menu.Item>
                        <Menu.Item key="2"><Link to="/backstage/user">用户管理</Link></Menu.Item>
                    </Menu>
                </Sider>
                <Content
                    className="site-layout-background"
                >
                    这里是管理员主页
                </Content> 
            </Layout>
        </Layout>
    );
} 