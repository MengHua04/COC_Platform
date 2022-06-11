import React, { Component, useState, useEffect } from 'react';
import { 
    Layout,
    Menu,
    Row,
    Col,
    Table,
    Form,
    Button,
    Modal,
    Input,
    notification,
    Divider
} from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../../asset/resource/logo5.png'
import Local from '../../../utils/storage.js'
import { logout } from '../../../services/login.js';
import { roomList, roomUpdate, roomDelete } from '../../../services/hall';
import style from './RoomForm.module.less'


const { Header, Content, Sider } = Layout;

export default function RoomForm(props)  {
    let navigate = useNavigate();
    const [collState, setCollState] = useState(false);
    const [roomModal, setRoomModal] = useState(false);
    const [rooms, setRooms] = useState([]);
    const [curRoom, setCurRoom] = useState('');

    const [roomForm] = Form.useForm();

    useEffect(() => {
        getRoomLists()
    },[])

    const onFinish = (values) => {
        console.log('value',values);

        const sendData = {
            id: curRoom.id,
            roomNo: curRoom.roomNo,
            personLimit: roomForm.getFieldsValue().personLimit,
            rule: roomForm.getFieldsValue().rule,
            bgStory: roomForm.getFieldsValue().bgStory,
            roomOwnerId: curRoom.roomOwnerId
        };
        console.log('roomdata',sendData);
        roomUpdate(sendData).then(
            (res) => {
                if(res.success) {
                }
            }).catch((err) => {
                if(err.code == '0') {
                    getRoomLists();
                }
        });
        setRoomModal(false);
    };

    const handleCancel = () => {
        roomForm.resetFields();
        setRoomModal(false);
    }
    
    const handleRoom = (record) => {
        console.log('handle',record);
        setCurRoom(record);
        setRoomModal(true);
    }

    const room_columns = [
        {
            dataIndex: "roomNo",
            title: "房间名称",
            align: 'center',
        },
        {
            dataIndex: "personLimit",
            title: "游玩人数上限",
            align: "center"
        },
        {
            dataIndex: "rule",
            title: "房间规则",
            align: "center"
        },
        {
            dataIndex: "bgStory",
            title: "背景故事",
            align: "center"
        },
        {
            dataIndex: 'id',
            title: "操作按钮",
            align: "center",
            render : (text,record,index) => {
                return (
                <>
                    <Button type='primary' onClick={() => handleRoom(record)}>编辑</Button>
                    <Modal
                        key={record}
                        title="编辑房间信息"
                        visible={roomModal}
                        footer={null}
                        destroyOnClose
                    >
                        <Form
                            form={roomForm}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="roomNo"
                                label="名称"
                                required
                                initialValue={record.roomNo}
                            >
                                <Input disabled/>
                            </Form.Item>
                            <Form.Item
                                name="personLimit"
                                label="人数限制"
                                required
                                initialValue={record.personLimit}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                name="rule"
                                label="房间规则"
                                required
                                initialValue={record.rule}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                name="bgStory"
                                label="背景故事"
                                required
                                initialValue={record.bgStory}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item>
                                <Row justify='space-around'>
                                    <Col span={6}>
                                        <Button type="primary" htmlType="submit">
                                            提交
                                        </Button>
                                    </Col>
                                    <Col span={6}>
                                        <Button htmlType="button" onClick={() => handleCancel()}>
                                            取消
                                        </Button>
                                    </Col>
                                </Row>
                            </Form.Item>
                        </Form>
                    </Modal>
                    <Divider type="vertical" />
                    <Button type='danger' onClick={() => deleteRoom(record)}>删除</Button>
                </>
                )
            }
        }
    ]

    const onCollapse = (collapsed) => {
        console.log(collapsed);
        setCollState(collapsed)
    };

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

    const getRoomLists = () => {
        roomList().then(
            (res) => {
                if(res.success) {
                }
            }).catch((err) => {
                if(err.code == '0') {
                    setRooms(err.data.records);
                }
        });
    }

    const deleteRoom = (item) => {
        const sendData = {
            id: item.id
        }
        roomDelete(sendData).then(
            (res) => {
                if(res.success) {
                }
            }).catch((err) => {
                if(err.code == '0') {
                    notification.success({
                        message: '成功',
                        description: err.msg
                    })
                    getRoomLists();
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
                    <Table
                        rowKey="id"
                        columns={room_columns}
                        bordered={true}
                        dataSource={rooms}
                    />
                </Content> 
            </Layout>
        </Layout>
    );
} 