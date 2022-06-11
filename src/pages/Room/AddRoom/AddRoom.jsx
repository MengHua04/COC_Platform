import React,{ useState, useEffect } from 'react';
import {
    Layout,
    Form,
    Button,
    Slider,
    Input,
    PageHeader,
    notification,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import { Content } from 'antd/lib/layout/layout';
import { roomCreate, roomExit, roomJoin } from '../../../services/hall.js';
import Head from '../../../components/Header/Header.jsx';
import background from "../../../asset/resource/Load.jpg";
import style from './AddRoom.module.less';
import Local from '../../../utils/storage.js';

export default function AddRoom() {
    const [roomForm] = Form.useForm();
    const [formData, setFormData] = useState({});
    const [disabled, setDisabled] = useState(true);
    const [user, setUser] = useState([])

    let navigate = useNavigate()
    
    function onAfterChange(value) {
        console.log('onAfterChange: ', value);
    }

    const exitRoom = async () => {
        navigate(-1);
        // roomExit().then(
        //     (res) => {
        //         if(res.success) {
        //             notification.success({
        //                 message: '成功',
        //                 description: '离开房间'
        //             })
        //         }
        //     }).catch((err) => {
        //         if(err.code == '0') {
        //             notification.success({
        //                 message: '成功',
        //                 description: err.msg
        //             })
        //             navigate(-1);
        //         }
        //     });
    }

    const onFinish = async (values) => {
        const sendData = {
            roomNo: values.name,
            personLimit: values.persons,
            rule: values.cardtype,
            bgStory: values.background,
            roomOwnerId: user.id,
        }
        console.log(sendData);
        roomCreate(sendData).then(
            (res) => {
                if(res.success) {
                    notification.success({
                        message: '成功',
                        description: '创建成功'
                    })
                }
            }).catch((err) => {
                if(err.code == '0') {
                    notification.success({
                        message: '成功',
                        description: err.msg
                    })
                    navigate(`/room/${values.name}`,{
                        state:{
                            id:values.name
                        }
                    })
                }
            });
    }

    useEffect(() => {
        const loggedInUser = Local.getLocal('curUser');
        if(loggedInUser) {
            setUser(loggedInUser);
        }
    },[])


    return (
        <div className={style.bg}>
            <Layout>
                <Head />
                <Content style={{ backgroundImage: `url(${background})`}}>
                    <div className={style.room_form}>
                        <PageHeader
                            onBack={exitRoom}
                            title={'新建房间'}
                        >
                        </PageHeader>
                        <div className={style.form}>
                            <Form
                                style={{width: "700px"}}
                                // onValuesChange={onValuesChange}
                                form={roomForm}
                                labelCol={{ span: 4 }}
                                labelAlign={"left"}
                                onFinish={onFinish}
                            >
                                <Form.Item
                                    className={style.room_form_item}
                                    label={"游戏名称"}
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入游戏名称'
                                        },
                                        {
                                            max: 64,
                                            message: '输入字符过长，请重新输入'
                                        }
                                    ]}
                                >
                                    <Input placeholder={'请输入中英文数字，限制在64字符串'}/>
                                </Form.Item>
                                {/* <Form.Item
                                    className={style.room_form_item}
                                    label={"KP"}
                                    name="kp"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入kp名称'
                                        },
                                        {
                                            max: 64,
                                            message: '输入字符过长，请重新输入'
                                        }
                                    ]}
                                >
                                    <Input placeholder={'请输入中英文数字，限制在64字符串'}/>
                                </Form.Item> */}
                                <Form.Item
                                    className={style.room_form_item}
                                    required
                                    label={"游戏人数"}
                                    name="persons" 
                                >
                                    <Slider
                                        min={1}
                                        max={16}
                                        step={1}
                                        dots
                                        defaultValue={1}
                                        onAfterChange={onAfterChange}
                                    />
                                </Form.Item>
                                <Form.Item
                                    className={style.room_form_item}
                                    label={"车卡要求"}
                                    name="cardtype"
                                    rules={[
                                        {
                                            max: 32,
                                            message: '输入字符过长，请重新输入'
                                        }
                                    ]}
                                >
                                    <Input placeholder={'roll点或者480购点'}/>
                                </Form.Item>
                                {/* <Form.Item 
                                    name="game_time"
                                    label="游戏时间"
                                    className={style.room_form_item} 
                                    rules={[
                                        {
                                            required: true,
                                            message: '请选择时间'
                                        },
                                    ]}
                                >
                                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                                </Form.Item> */}
                                <Form.Item
                                    className={style.room_form_item}
                                    name="background"
                                    label="背景"
                                >
                                    <Input.TextArea showCount maxLength={100} />
                                </Form.Item>
                                <Form.Item 
                                    className={style.room_form_item}
                                    wrapperCol={{ span: 4, offset: 0 }}
                                >
                                    <Button type="primary" htmlType="submit">
                                        创建房间
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </Content>
            </Layout>
        </div>
    )
}