import React, { useState, useEffect } from 'react';
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
    Divider,
    Select,
    DatePicker
} from 'antd';
import { useNavigate, Link } from 'react-router-dom'
import logo from '../../../asset/resource/logo5.png'
import Local from '../../../utils/storage.js'
import { logout } from '../../../services/login.js';
import { userinfoUpdate, getUsers, passwordChange, deleteUser } from '../../../services/user.js'
import PasswordDialog from "../../Personal/passwordDialog/PasswordDialog.jsx"
import style from './UserForm.module.less'

const { Option } = Select;
const dateFormat = 'YYYY/MM/DD';
const { Header, Content, Sider } = Layout;

export default function UserForm(props)  {
    let navigate = useNavigate();
    const [collState, setCollState] = useState(false);
    const [userModal1, setUserModal1] = useState(false);
    const [userModal2, setUserModal2] = useState(false);
    const [users, setUsers] = useState([]);
    const [curUser, setCurUser] = useState('');

    const [userForm] = Form.useForm();

    useEffect(() => {
        getUserLists()
    },[])

    const onFinish1 = (values) => {
        console.log('value',values);

        const sendData = {
            id: curUser.id,
            gender: userForm.getFieldsValue().gender=="man" ? 1 : 0,
            birthdate: userForm.getFieldsValue().birthdate,
            selfInfo: userForm.getFieldsValue().selfInfo,
        };
        console.log('userdata',sendData);
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
    };
    
    const handleUser1 = (record) => {
        console.log('hanle',record);
        setCurUser(record);
        setUserModal1(true);
    }

    const handleUser2 = (record) => {
        console.log('hanle',record);
        setCurUser(record);
        setUserModal2(true);
    }

    const user_columns = [
        {
            dataIndex: "account",
            title: "用户名称",
            align: 'center',
        },
        {
            dataIndex: "gender",
            title: "性别",
            align: "center"
        },
        {
            dataIndex: "birthdate",
            title: "出生日期",
            align: "center"
        },
        {
            dataIndex: "selfInfo",
            title: "自我介绍",
            align: "center"
        },
        {
            dataIndex: 'id',
            title: "操作按钮",
            align: "center",
            render : (text,record,index) => {
                return (
                <>
                    <Button type='primary' onClick={() => handleUser1(record)}>编辑</Button>
                    {userModal1 && <Modal
                        key={record}
                        title="编辑用户信息"
                        visible={userModal1}
                        footer={null}
                        destroyOnClose
                    >
                        <Form
                            form={userForm}
                            onFinish={onFinish1}
                        >
                            <Form.Item
                                name="account"
                                label="用户名称"
                                required
                                initialValue={record.account}
                            >
                                <Input disabled/>
                            </Form.Item>
                            <Form.Item
                                name="gender"
                                label="性别"
                                required
                                initialValue={record.gender == 1 ? "男" : "女"}
                            >
                                <Select
                                    placeholder="请选择性别" 
                                >
                                    <Option value="man">男</Option>
                                    <Option value="woman">女</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label={"出生日期"}
                                name="birthdate"
                                rules={[{ required: true, message: '请选择生日!' }]}
                                initialValue={record.birthdate}
                            >
                                <DatePicker
                                    placeholder="请选择生日"
                                    format={"YYYY/MM/DD"}
                                />
                            </Form.Item>
                            <Form.Item
                                label={"个人介绍"}
                                name="selfInfo"
                                rules={[{ required: true, message: '请输入个人简介!' }]}
                            >
                                <Input.TextArea
                                    placeholder="请输入个人简介"
                                    defaultValue={record.selfInfo}
                                    showCount
                                    maxLength={100}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Row justify='space-around'>
                                    <Col span={6}>
                                        <Button type="primary" htmlType="submit">
                                            提交
                                        </Button>
                                    </Col>
                                    <Col span={6}>
                                        <Button htmlType="button" onClick={() => setUserModal1(false)}>
                                            取消
                                        </Button>
                                    </Col>
                                </Row>
                            </Form.Item>
                        </Form>
                    </Modal>}
                    <Divider type="vertical" />
                    <Button onClick={() => {
                        setUserModal2(true);
                    }}>
                        修改密码
                    </Button>
                    { userModal2 ? (
                        <PasswordDialog
                            account={record}
                            passwordDialogVis={userModal2}
                            setPasswordDialogVis={setUserModal2}
                        />
                    ) : ('')
                    }
                    <Divider type="vertical" />
                    <Button type='danger' onClick={() => userDelete(record)}>删除</Button>
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

    const getUserLists = () => {
        getUsers().then(
            (res) => {
                if(res.success) {
                }
            }).catch((err) => {
                if(err.code == '0') {
                    // for(let i = 0;i<err.data.length;i++){
                    //     if(err.data[i].account == 'admin'){
                    //         delete err.data[i];
                    //     }
                    // }
                    setUsers(err.data);
                }
        });
    }

    const userDelete = (item) => {
        console.log(item);
        const sendData = {
            id: item.id
        }
        deleteUser(sendData).then(
            (res) => {
                if(res.success) {
                }
            }).catch((err) => {
                if(err.code == '0') {
                    notification.success({
                        message: '成功',
                        description: err.msg
                    })
                    getUserLists();
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
                        columns={user_columns}
                        bordered={true}
                        dataSource={users}
                    />
                </Content> 
            </Layout>
        </Layout>
    );
} 