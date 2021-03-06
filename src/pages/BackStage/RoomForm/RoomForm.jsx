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
            title: "????????????",
            align: 'center',
        },
        {
            dataIndex: "personLimit",
            title: "??????????????????",
            align: "center"
        },
        {
            dataIndex: "rule",
            title: "????????????",
            align: "center"
        },
        {
            dataIndex: "bgStory",
            title: "????????????",
            align: "center"
        },
        {
            dataIndex: 'id',
            title: "????????????",
            align: "center",
            render : (text,record,index) => {
                return (
                <>
                    <Button type='primary' onClick={() => handleRoom(record)}>??????</Button>
                    <Modal
                        key={record}
                        title="??????????????????"
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
                                label="??????"
                                required
                                initialValue={record.roomNo}
                            >
                                <Input disabled/>
                            </Form.Item>
                            <Form.Item
                                name="personLimit"
                                label="????????????"
                                required
                                initialValue={record.personLimit}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                name="rule"
                                label="????????????"
                                required
                                initialValue={record.rule}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                name="bgStory"
                                label="????????????"
                                required
                                initialValue={record.bgStory}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item>
                                <Row justify='space-around'>
                                    <Col span={6}>
                                        <Button type="primary" htmlType="submit">
                                            ??????
                                        </Button>
                                    </Col>
                                    <Col span={6}>
                                        <Button htmlType="button" onClick={() => handleCancel()}>
                                            ??????
                                        </Button>
                                    </Col>
                                </Row>
                            </Form.Item>
                        </Form>
                    </Modal>
                    <Divider type="vertical" />
                    <Button type='danger' onClick={() => deleteRoom(record)}>??????</Button>
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
                        message: '??????',
                        description: '??????????????????'
                    })
                }
            }).catch((err) => {
                if(err.code == '0') {
                    notification.success({
                        message: '??????',
                        description: '??????????????????'
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
                        message: '??????',
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
                                    <div className={style.text}>??????????????????-????????????</div>
                                </div>
                            </Col>
                            <Col span={10}></Col>
                            <Col span={6}>
                                <div className={style.avatar}>
                                    {
                                        <>
                                        <Row>
                                            <Col span={18}>
                                                ??????????????????,?????????
                                            </Col>
                                            <Col span={6}>
                                                <span onClick={loginOut}>????????????</span>
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
                        <Menu.Item key="1"><Link to="/backstage/room">????????????</Link></Menu.Item>
                        <Menu.Item key="2"><Link to="/backstage/user">????????????</Link></Menu.Item>
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