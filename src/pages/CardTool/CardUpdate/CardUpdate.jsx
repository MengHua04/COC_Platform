import React,{ useState, useEffect } from 'react';
import {
    Layout,
    Button,
    Row,
    Col,
    Input,
    Form,
    Select,
    InputNumber,
    Tabs,
    Table,
    notification
} from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { useNavigate, useLocation } from 'react-router-dom';
import { cardUpdate } from '../../../services/person.js'
import { getPersonWeapons } from '../../../services/weapons.js';
import { getPersonSkills } from '../../../services/skills.js';
import Head from '../../../components/Header/Header.jsx';
import CardList from '../../../components/CardList/CardList.jsx'
import background from "../../../asset/resource/Load.jpg";
import style from './CardUpdate.module.less';

const { Option } = Select;

export default function CardUpdate() {
    const [card, setCard] = useState([]);
    const [skillList, setSkillList] = useState([
        {
            "id": 1,
            "skillType": "交际类",
            "skillName": "Social",
            "label": "话术",
            "name": "FastTalk",
            "description": "话术特别限定于言语上的哄骗，欺骗以及误导，例如迷惑一名门卫来让你进入一间俱乐部，让某人在一张他还没有读的文件上签字，误导警察看向另一边，以及诸如此类的。经过一段时间的相信期后，对方会意识到自己被欺骗了。",
            "initial": "5"
        },
        {
            "id": 2,
            "skillType": "交际类",
            "skillName": "Social",
            "label": "恐吓",
            "name": "Intimidate",
            "description": "恐吓可以以许多形式使用，包括武力威慑，心理操控，以及威胁。这通常被用来使某人害怕，并迫使其进行某种特定的行为。恐吓的对抗技能为恐吓或者心理学",
            "initial": "15"
        },
        {
            "id": 3,
            "skillType": "交际类",
            "skillName": "Social",
            "label": "魅惑",
            "name": "Charm",
            "description": "取悦允许通过许多形式来使用，包括肉体魅力、诱惑、奉承或是单纯令人感到温暖的人格魅力。取悦可能可以被用于迫使某人进行特定的行动，但是不会是与个人日常举止完全相反的行为。取悦或是心理学技能可以用于对抗取悦技能。",
            "initial": "15"
        },
        {
            "id": 4,
            "skillType": "交际类",
            "skillName": "Social",
            "label": "说服",
            "name": "Persuade",
            "description": "使用说服来通过一场有理有据的论述、争辩以及讨论让目标相信一个确切的想法，概念，或者信仰。说服并不一定需要涉及真实的内容。成功的说服技能的运用将花费不少的时间：至少半小时。如果你想快速地说服某人，你应该使用话术技能。",
            "initial": "10"
        },
    ]);
    const [curWeapons, setCurWeapons] = useState([
        {
            "id": 1,
            "name": "",
            "skill": "",
            "hurt": "",
            "range": "",
            "penetrate": "",
            "number": "",
            "bullet": "",
            "breakdown": "",
            "dynasty": "",
            "price": ""
        },
    ]);

    let navigate = useNavigate();
    let location = useLocation();
    const cardDefault = location.state.cardItem;
    const userAccount = location.state.cardItem.account;
    // const skills = location.state.skillList;
    const weapons = location.state.weaponList;
    const initTotal = parseInt(cardDefault.str) + parseInt(cardDefault.con) + parseInt(cardDefault.siz)
                        + parseInt(cardDefault.dex) + parseInt(cardDefault.app) + parseInt(cardDefault.intelligence)
                        + parseInt(cardDefault.pow) + parseInt(cardDefault.edu);

    useEffect(() => {
        getPersonWeapon()
        getPersonSkill()
    },[])

    const [basic_Form] = Form.useForm();
    const [inP_Form] = Form.useForm();
    const [outP_Form] = Form.useForm();
    const [occu_Form] = Form.useForm();
    const [skill_Form] = Form.useForm();
    const [weapon_Form] = Form.useForm();
    const [other_Form] = Form.useForm();

    const weaponColumns = [
        {
            dataIndex: "name",
            title: "武器名称",
            align: 'center',
            render: (text, record, index) => (
                <Select
                    value={record.setting === '' ? undefined : record.setting}
                    key={record.setting}
                    placeholder="请选择武器"
                    onChange={handleSave}
                    defaultValue={curWeapons[0]?.name}
                >
                    {weapons.length&&weapons.map((item) => 
                        <Option key={item.id} value={item.id}>{item.name}</Option>
                    )}
                </Select>
            )
        },
        {
            dataIndex: "skill",
            title: "使用技能",
            align: 'center',
        },
        {
            dataIndex: "hurt",
            title: "伤害",
            align: 'center',
        },
        {
            dataIndex: "penetrate",
            title: "贯穿",
            align: 'center',
        },
        {
            dataIndex: "range",
            title: "射程",
            align: 'center',
        },
        {
            dataIndex: "bullet",
            title: "装弹数",
            align: 'center',
        },
        {
            dataIndex: "price",
            title: "价格",
            align: 'center',
        },
        {
            dataIndex: "breakdown",
            title: "故障值",
            align: 'center',
        },
        {
            dataIndex: "dynasty",
            title: "时代",
            align: 'center',
        },
    ]

    const skillsColumns = [
        {
            dataIndex: "label",
            title: "技能名称",
            align: 'center'
        },
        {
            dataIndex: "initial",
            title: "成功率",
            align: 'center',
        }
    ]

    const getPersonWeapon = async() => {
        const sendData = {
            personId: location.state.cardItem.id
        }
        getPersonWeapons(sendData).then(
            (res) => {
                if(res.success) {
                    notification.success({
                        message: '成功',
                        description: '查询成功'
                    })
                }
            }).catch((err) => {
                console.log('msg',err);
                if(err.code == '0') {
                    setCurWeapons(err.data);
                }
            });
    }

    const getPersonSkill = async() => {
        const sendData = {
            personId: location.state.cardItem.id
        }
        getPersonSkills(sendData).then(
            (res) => {
                if(res.success) {
                    notification.success({
                        message: '成功',
                        description: '查询成功'
                    })
                }
            }).catch((err) => {
                console.log('msg',err);
                if(err.code == '0') {
                    setSkillList(err.data);
                }
            });
    }

    const onInPValuesChange = (changedValues, allValues) => {
        var inTotal = 0;
        console.log(basic_Form.getFieldsValue());
        for(var key in allValues) {
            if(allValues[key] == undefined) {
                allValues[key] = 0;
            }
            if(key == 'luck') {
                delete allValues[key];
            }
            if(key == 'total') {
                delete allValues[key];
            }
        }
        for(var key in allValues) {
            inTotal += allValues[key];
        }
        inP_Form.setFieldsValue({total:inTotal});

        // 调整对应的表格数据
        if(allValues.con + allValues.siz != 0){
            var hp = (allValues.con + allValues.siz) / 10;
            hp = Math.floor(hp);
        }
        if(allValues.pow != 0){
            var mp = allValues.pow / 5;
            mp = Math.floor(mp);
        }
        var mov = 7;
        if(allValues.str < allValues.siz && allValues.dex < allValues.siz) {
            mov = 7;
        } else if(allValues.str > allValues.siz && allValues.dex > allValues.siz) {
            mov = 9;
        } else if(allValues.str >= allValues.siz || allValues.dex >= allValues.siz) {
            mov = 8;
        }
        var san = allValues.pow;
        var strongLevel = allValues.str + allValues.siz;
        var strong = 0;
        var hurtLevel = 0;
        if(strongLevel>=2 && strongLevel<=64) {
            strong = -2;
            hurtLevel = '-2';
        } else if(strongLevel>=65 && strongLevel<=84) {
            strong = -1;
            hurtLevel = '-1';
        } else if(strongLevel>=85 && strongLevel<=124) {
            strong = 0;
            hurtLevel = '0';
        } else if(strongLevel>=125 && strongLevel<=164) {
            strong = 1;
            hurtLevel = '1D4';
        } else if(strongLevel>=165 && strongLevel<=204) {
            strong = 2;
            hurtLevel = '1D6';
        }
        outP_Form.setFieldsValue({
            hit: hp,
            magic: mp,
            sanity: san,
            strong: strong,
            wrestle: hurtLevel,
            move: mov,
        });

        //调整属性影响的技能
        if(allValues.edu > 0) {
            skillList.map((item) => {
                if(item.label == '母语'){
                    item.initial = allValues.edu;
                }
            })
        }
        if(allValues.dex > 0) {
            skillList.map((item) => {
                if(item.label == '闪避'){
                    item.initial = Math.floor(allValues.dex/2);
                }
            })
        }
    }

    const onFinish = async () => {
        console.log('basic',basic_Form.getFieldsValue());
        console.log('occu',occu_Form.getFieldsValue());
        console.log('inP',inP_Form.getFieldsValue());
        console.log('outP',outP_Form.getFieldsValue());
        // console.log('skill',skill_Form.getFieldsValue(),skillList);
        console.log('weapon',weapon_Form.getFieldsValue(),curWeapons);
        console.log('other',other_Form.getFieldsValue());
        const personWeapon = [
            {
                "id": curWeapons[0].id,
                "name": curWeapons[0].name,
                "skill": curWeapons[0].skill,
                "hurt": curWeapons[0].hurt,
                "range": curWeapons[0].range,
                "penetrate": curWeapons[0].penetrate,
                "number": curWeapons[0].number,
                "bullet": curWeapons[0].bullet,
                "breakdown": curWeapons[0].breakdown,
                "dynasty": curWeapons[0].dynasty,
                "price": curWeapons[0].price
            },
        ]

        const sendData = {
            id: location.state.cardItem.id,
            image: cardDefault.image,
            name: basic_Form.getFieldsValue().name,
            account: userAccount,
            dynasty: basic_Form.getFieldsValue().dynasty,
            profession: cardDefault.profession,
            professionNumber: location.state.cardItem.professionNumber,
            age: basic_Form.getFieldsValue().age,
            sex: basic_Form.getFieldsValue().sex,
            address: basic_Form.getFieldsValue().address,
            hometown: basic_Form.getFieldsValue().hometown,
            str: inP_Form.getFieldsValue().str,
            con: inP_Form.getFieldsValue().con,
            siz: inP_Form.getFieldsValue().siz,
            dex: inP_Form.getFieldsValue().dex,
            app: inP_Form.getFieldsValue().app,
            intelligence: inP_Form.getFieldsValue().intelligence,
            pow: inP_Form.getFieldsValue().pow,
            edu: inP_Form.getFieldsValue().edu,
            luck: inP_Form.getFieldsValue().luck,
            mov: outP_Form.getFieldsValue().move,
            hit: outP_Form.getFieldsValue().hit,
            sanity: outP_Form.getFieldsValue().sanity,
            magic: outP_Form.getFieldsValue().magic,
            bodyStatus: '健康',
            mindStatus: '神志清醒',
            wrestle: outP_Form.getFieldsValue().wrestle,
            money: other_Form.getFieldsValue().money,
            goods: other_Form.getFieldsValue().goods,
            experience: other_Form.getFieldsValue().experience,
            background: other_Form.getFieldsValue().background,
            partner: other_Form.getFieldsValue().partner,
            myth: other_Form.getFieldsValue().myth,
            // skills: skills,
            weapons: personWeapon,
        }
        console.log(sendData);
        cardUpdate(sendData).then(
            (res) => {
                if(res.success) {
                    notification.success({
                        message: '成功',
                        description: '修改成功'
                    })
                }
            }).catch((err) => {
                console.log('msg',err);
                if(err.code == '0') {
                    notification.success({
                        message: '成功',
                        description: err.msg
                    })
                    navigate('/home');
                }
            });
    }

    //有一定问题，无法多选
    const handleSave = (row) => {
        // 从新将数据 copy 一波
        const newData = [...weapons];
        // 找到操作更新的数据在源数据中的下标
        const index = newData.findIndex(item => row === item.id);
        // 找到对应更新的数据
        const item = newData[index];
        // 将新数据中的数据进行更新
        const WeaponData = [...curWeapons];
        WeaponData.splice(index, 1, {
        ...item,
        });
        // console.log(row,index,item,WeaponData);
        // useState 更新即可
        setCurWeapons(WeaponData);
    }

    return (
        <div className={style.bg}>
            <Layout>
                <Head />
                <Content style={{ backgroundImage: `url(${background})`}}>
                    <div className={style.card_content}>
                        <span
                        className={style.card_content_title}>
                            修改人物卡
                        </span>
                        <div className={style.show_card}>
                            <Form.Provider
                                onFormFinish={(name, { values, forms }) => {
                                    console.log('Provider',values,forms);
                                }}
                            >
                                <Form
                                    className={style.card1_form}
                                    name={"basic"}
                                    form={basic_Form}
                                    labelCol={{ span: 4 }}
                                    labelAlign={"left"}
                                >
                                    <Form.Item
                                        className={style.card_form1_item}
                                        label={"姓名"}
                                        name="name"
                                        rules={[
                                            {
                                                required: true,
                                                message: '请输入人物名称'
                                            },
                                            {
                                                max: 64,
                                                message: '输入字符过长，请重新输入'
                                            }
                                        ]}
                                        initialValue={cardDefault.name}
                                    >
                                        <Input placeholder={'请输入中英文数字，限制在64字符串'}/>
                                    </Form.Item>
                                    <Form.Item
                                        className={style.card_form1_item}
                                        label={"玩家"}
                                        name="account"
                                        rules={[
                                            {
                                                required: true,
                                                message: '请输入玩家名称'
                                            },
                                            {
                                                max: 64,
                                                message: '输入字符过长，请重新输入'
                                            }
                                        ]}
                                        initialValue={cardDefault.account}
                                    >
                                        <Input
                                            placeholder={'请输入中英文数字，限制在64字符串'}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        className={style.card_form1_item}
                                        label={"时代"}
                                        name="dynasty"
                                        wrapperCol={{ span: 6, offset: 0 }}
                                        rules={[{ required: true, message: '请选择时代!' }]}
                                        initialValue={cardDefault.dynasty}
                                    >
                                        <Select placeholder="请选择时代" style={{ width: 400 }}>
                                            <Option value="1820-1920">1820-1920</Option>
                                            <Option value="1920-1990">1920-1990</Option>
                                            <Option value="1990-2010">1990-2010</Option>
                                            <Option value="2010-至今">2010-至今</Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        className={style.card_form1_item}
                                        label={"年龄"}
                                        name="age"
                                        rules={[
                                            {
                                                required: true,
                                                message: '请输入年龄'
                                            },
                                            {
                                                max: 64,
                                                message: '输入字符过长，请重新输入'
                                            }
                                        ]}
                                        initialValue={cardDefault.age}
                                    >
                                        <Input placeholder={'请输入英文数字，限制在64字符串'}/>
                                    </Form.Item>
                                    <Form.Item
                                        className={style.card_form1_item}
                                        label={"性别"}
                                        name="sex"
                                        wrapperCol={{ span: 6, offset: 0 }}
                                        rules={[{ required: true, message: '请选择性别!' }]}
                                        initialValue={cardDefault.sex}
                                    >
                                        <Select placeholder="请选择性别" style={{ width: 400 }}>
                                            <Option value="man">男</Option>
                                            <Option value="woman">女</Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        className={style.card_form1_item}
                                        label={"居住地"}
                                        name="address"
                                        rules={[
                                            {
                                                required: true,
                                                message: '请输入居住地'
                                            },
                                            {
                                                max: 64,
                                                message: '输入字符过长，请重新输入'
                                            }
                                        ]}
                                        initialValue={cardDefault.address}
                                    >
                                        <Input placeholder={'请输入中英文数字，限制在64字符串'}/>
                                    </Form.Item>
                                    <Form.Item
                                        className={style.card_form1_item}
                                        label={"故乡"}
                                        name="hometown"
                                        rules={[
                                            {
                                                required: true,
                                                message: '请输入故乡'
                                            },
                                            {
                                                max: 64,
                                                message: '输入字符过长，请重新输入'
                                            }
                                        ]}
                                        initialValue={cardDefault.hometown}
                                    >
                                        <Input placeholder={'请输入中英文数字，限制在64字符串'}/>
                                    </Form.Item>
                                </Form>
                                <Form
                                    className={style.card2_form}
                                    name={"occuption"}
                                    form={occu_Form}
                                    labelCol={{ span: 4 }}
                                    labelAlign={"left"}
                                >
                                    <Form.Item
                                        className={style.card_form2_item}
                                        label={"职业"}
                                        name="profession"
                                        wrapperCol={{ span: 6, offset: 0 }}
                                        required
                                    >
                                        <h3 style={{width: 200,paddingTop: 4}}>{cardDefault.profession}</h3>
                                    </Form.Item>
                                </Form>
                                <Row>
                                    <Col span={12}>
                                        <Form
                                            className={style.card3_form}
                                            form={inP_Form}
                                            name={"in_property"}
                                            layout="inline"
                                            labelAlign={"left"}
                                            onValuesChange={onInPValuesChange}
                                        >
                                            <Form.Item
                                                className={style.card_form3_item}
                                                label={"力量 STR"}
                                                name="str"
                                                required
                                                initialValue={parseInt(cardDefault.str)}
                                            >
                                                <InputNumber min={1} max={99} />
                                            </Form.Item>
                                            <Form.Item
                                                className={style.card_form3_item}
                                                label={"体质 CON"}
                                                name="con"
                                                required
                                                initialValue={parseInt(cardDefault.con)}
                                            >
                                                <InputNumber min={1} max={99} />
                                            </Form.Item>
                                            <Form.Item
                                                className={style.card_form3_item}
                                                label={"体型 SIZ"}
                                                name="siz"
                                                required
                                                initialValue={parseInt(cardDefault.siz)}
                                            >
                                                <InputNumber min={1} max={99} />
                                            </Form.Item>
                                            <Form.Item
                                                className={style.card_form3_item}
                                                label={"敏捷 DEX"}
                                                name="dex"
                                                required
                                                initialValue={parseInt(cardDefault.dex)}
                                            >
                                                <InputNumber min={1} max={99} />
                                            </Form.Item>
                                            <Form.Item
                                                className={style.card_form3_item}
                                                label={"外貌 APP"}
                                                name="app"
                                                required
                                                initialValue={parseInt(cardDefault.app)}
                                            >
                                                <InputNumber min={1} max={99} />
                                            </Form.Item>
                                            <Form.Item
                                                className={style.card_form3_item}
                                                label={"智力 INT"}
                                                name="intelligence"
                                                required
                                                initialValue={parseInt(cardDefault.intelligence)}
                                            >
                                                <InputNumber min={1} max={99} />
                                            </Form.Item>
                                            <Form.Item
                                                className={style.card_form3_item}
                                                label={"意志 POW"}
                                                name="pow"
                                                required
                                                initialValue={parseInt(cardDefault.pow)}
                                            >
                                                <InputNumber min={1} max={99} />
                                            </Form.Item>
                                            <Form.Item
                                                className={style.card_form3_item}
                                                label={"教育 EDU"}
                                                name="edu"
                                                required
                                                initialValue={parseInt(cardDefault.edu)}
                                            >
                                                <InputNumber min={1} max={99} />
                                            </Form.Item>
                                            <Form.Item
                                                className={style.card_form3_item}
                                                label={"幸运 LUCK"}
                                                name="luck"
                                                required
                                                initialValue={parseInt(cardDefault.luck)}
                                            >
                                                <InputNumber min={1} max={99} />
                                            </Form.Item>
                                            <Form.Item
                                                className={style.card_form3_item}
                                                label={"总点数(除幸运)"}
                                                name="total"
                                                initialValue={initTotal}
                                            >
                                                <InputNumber
                                                    disabled
                                                    bordered={false}
                                                />
                                            </Form.Item>
                                        </Form>
                                    </Col>
                                    <Col span={12}>
                                        <Form
                                            className={style.card4_form}
                                            name={"out_property"}
                                            form={outP_Form}
                                            layout="inline"
                                            labelAlign={"left"}
                                        >
                                            <Form.Item
                                                className={style.card_form4_item}
                                                label={"体力"}
                                                name="hit"
                                                initialValue={cardDefault.hit}
                                            >
                                                <Input disabled/>
                                            </Form.Item>
                                            <Form.Item
                                                className={style.card_form4_item}
                                                label={"魔力"}
                                                name="magic"
                                                initialValue={cardDefault.magic}
                                            >
                                                <Input disabled/>
                                            </Form.Item>
                                            <Form.Item
                                                className={style.card_form4_item}
                                                label={"理智"}
                                                name="sanity"
                                                initialValue={cardDefault.sanity}
                                            >
                                                <Input disabled/>
                                            </Form.Item>
                                            <Form.Item
                                                className={style.card_form4_item}
                                                label={"移动"}
                                                name="move"
                                                initialValue={cardDefault.mov}
                                            >
                                                <Input disabled/>
                                            </Form.Item>
                                            <Form.Item
                                                className={style.card_form4_item}
                                                label={"体格"}
                                                name="strong"
                                                initialValue={cardDefault.wrestle}
                                            >
                                                <Input disabled/>
                                            </Form.Item>
                                            <Form.Item
                                                className={style.card_form4_item}
                                                label={"伤害加深"}
                                                name="wrestle"
                                                initialValue={cardDefault.wrestle}
                                            >
                                                <Input disabled/>
                                            </Form.Item>
                                            <Form.Item
                                                className={style.card_form4_item}
                                                label={"身体状态"}
                                                name="body_status"
                                                initialValue={"健康"}
                                            >
                                                <Input disabled/>
                                            </Form.Item>
                                            <Form.Item
                                                className={style.card_form4_item}
                                                label={"精神状态"}
                                                name="mind_status"
                                                initialValue={"神志清醒"}
                                            >
                                                <Input disabled/>
                                            </Form.Item>
                                        </Form>
                                    </Col>
                                </Row>
                                <Form
                                    className={style.card5_form}
                                    form={skill_Form}
                                    name={"skill"}
                                    labelAlign={"left"}
                                >
                                    <Form.Item
                                        className={style.card_form5_item}
                                        name="skillsList"
                                        label="技能表"
                                        required
                                        labelCol={{ span: 0, offset: 0 }}
                                        wrapperCol={{ span: 20 }}
                                    >
                                        <Table
                                            rowKey="id"
                                            bordered={true}
                                            columns={skillsColumns}
                                            dataSource={skillList}
                                            pagination={false}
                                            style={{paddingTop: 10}}
                                            scroll={{ y: 300 }}
                                        />
                                    </Form.Item>
                                </Form>
                                <Form
                                    className={style.card6_form}
                                    name={"weapon"}
                                    form={weapon_Form}
                                    // labelCol={{ span: 4 }}
                                    labelAlign={"left"}
                                >
                                    <Form.Item
                                        className={style.card_form6_item}
                                        label={"武器表"}
                                        name="weaponsList"
                                    >
                                        <Table
                                            rowKey="id"
                                            bordered={true}
                                            columns={weaponColumns}
                                            dataSource={curWeapons}
                                            pagination={false}
                                            style={{paddingTop: 10}}
                                        />
                                    </Form.Item>
                                </Form>
                                <Form
                                    className={style.card7_form}
                                    name={"other"}
                                    form={other_Form}
                                    // labelCol={{ span: 4 }}
                                    labelAlign={"left"}
                                >
                                    <Form.Item
                                        className={style.card_form7_item}
                                        label={"携带物品"}
                                        name="goods"
                                        rules={[
                                            {
                                                required: true,
                                                message: '请输入携带物品'
                                            },
                                            {
                                                max: 128,
                                                message: '输入字符过长，请重新输入'
                                            }
                                        ]}
                                        initialValue={cardDefault.goods} 
                                    >
                                        <Input placeholder='请输入携带的物品'></Input>
                                    </Form.Item>
                                    <Form.Item
                                        className={style.card_form7_item}
                                        label={"资产情况"}
                                        name="money"
                                        rules={[
                                            {
                                                required: true,
                                                message: '请输入资产情况'
                                            },
                                            {
                                                max: 64,
                                                message: '输入字符过长，请重新输入'
                                            }
                                        ]}
                                        initialValue={cardDefault.money} 
                                    >
                                        <Input placeholder='请输入资产情况'></Input>
                                    </Form.Item>
                                    <Form.Item
                                        className={style.card_form7_item}
                                        label={"背景故事"}
                                        name="background"
                                        rules={[
                                            {
                                                required: true,
                                                message: '请输入背景故事'
                                            },
                                            {
                                                max: 128,
                                                message: '输入字符过长，请重新输入'
                                            }
                                        ]}
                                        initialValue={cardDefault.background} 
                                    >
                                        <Input placeholder='请输入背景故事'></Input>
                                    </Form.Item>
                                    <Form.Item
                                        className={style.card_form7_item}
                                        label={"调查员经历"}
                                        name="experience"
                                        rules={[
                                            {
                                                required: true,
                                                message: '请输入调查员经历'
                                            },
                                            {
                                                max: 128,
                                                message: '输入字符过长，请重新输入'
                                            }
                                        ]}
                                        initialValue={cardDefault.experience} 
                                    >
                                        <Input placeholder='请输入调查员经历s'></Input>
                                    </Form.Item>
                                    <Form.Item
                                        className={style.card_form7_item}
                                        label={"调查员伙伴"}
                                        name="partner"
                                        rules={[
                                            {
                                                required: true,
                                                message: '请输入调查员伙伴'
                                            },
                                            {
                                                max: 64,
                                                message: '输入字符过长，请重新输入'
                                            }
                                        ]}
                                        initialValue={cardDefault.partner}
                                    >
                                        <Input placeholder='请输入调查员伙伴'></Input>
                                    </Form.Item>
                                    <Form.Item
                                        className={style.card_form7_item}
                                        label={"克苏鲁神话"}
                                        name="myth"
                                        rules={[
                                            {
                                                required: true,
                                                message: '请输入克苏鲁神话'
                                            },
                                            {
                                                max: 64,
                                                message: '输入字符过长，请重新输入'
                                            }
                                        ]}
                                        initialValue={cardDefault.myth}
                                    >
                                        <Input placeholder='请输入克苏鲁神话'></Input>
                                    </Form.Item>
                                </Form>
                                <Button type='primary' htmlType='submit' onClick={onFinish}>修改人物卡</Button>
                            </Form.Provider>
                        </div>
                    </div>
                </Content>
            </Layout>
        </div>
    )
}