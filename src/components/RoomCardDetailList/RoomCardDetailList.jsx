import React,{ useState, useEffect } from 'react';
import { 
    Card,
    Row,
    Col,
    Descriptions,
    Button,
    Space,
    Tabs,
    Collapse,
    Divider,
    Avatar,
    Table,
    Input
} from "antd"
import style from "./RoomCardDetailList.module.less"

const { Panel } = Collapse;
const { TabPane } = Tabs;

function RoomCardDetailList(props) {
    const {
        dataSource = [],
        onClickItem = () => { }
    } = props

    const [activeTabKey2, setActiveTabKey2] = useState('');
    const [tabList, setTabList] = useState([]);
    const [contentList, setContentList] = useState({});

    useEffect(() => {
        getTabLists();
        getContentLists();
    },[dataSource])

    useEffect(() => {
        getContentLists();
    },[activeTabKey2])

    const weaponColumns = [
        {
            dataIndex: "name",
            title: "武器名称",
            align: 'center',
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

    const getTabLists = () => {
        var tabTitle = [];
        dataSource.map((item) => {
            tabTitle.push ({
                key: item.name,
                tab: item.name
            }) 
            setActiveTabKey2(item.name);
        })
        console.log('tabList',tabTitle);
        setTabList(tabTitle);
    }

    const callback = (key) => {
        getContentLists();
    }

    const getContentLists = () => {
        var contentList = {};
        var content = {};
        dataSource.map((item) => {
            content = {
                [item.name]:
                <>
                    <div className={style.cardDetail1}>
                        <Row>
                            <Col span={6}>
                                <Avatar className={style.card} shape="square" size={64} src={require(`../../asset/resource/avator.jpeg`)} />
                            </Col>
                            <Col span={18}>
                                <Descriptions
                                    title="角色介绍"
                                    size='small'
                                    column={3}
                                >
                                    <Descriptions.Item label="角色">{item.name}</Descriptions.Item>
                                    <Descriptions.Item label="玩家">{item.account}</Descriptions.Item>
                                    <Descriptions.Item label="年龄">{item.age}</Descriptions.Item>
                                    <Descriptions.Item label="职业">{item.profession}</Descriptions.Item>
                                    <Descriptions.Item label="HP">{item.hit}</Descriptions.Item>
                                    <Descriptions.Item label="MP">{item.magic}</Descriptions.Item>
                                    <Descriptions.Item label="San">{item.sanity}</Descriptions.Item>
                                    <Descriptions.Item label="性别">{item.sex}</Descriptions.Item>
                                    <Descriptions.Item label="DB">{item.wrestle}</Descriptions.Item>
                                    <Descriptions.Item label="属性">
                                        <Descriptions
                                            size='small'
                                            column={3}
                                        >
                                            <Descriptions.Item label="力量">{item.str}</Descriptions.Item>
                                            <Descriptions.Item label="敏捷">{item.dex}</Descriptions.Item>
                                            <Descriptions.Item label="体质">{item.con}</Descriptions.Item>
                                            <Descriptions.Item label="体型">{item.siz}</Descriptions.Item>
                                            <Descriptions.Item label="意志">{item.pow}</Descriptions.Item>
                                            <Descriptions.Item label="外貌">{item.app}</Descriptions.Item>
                                            <Descriptions.Item label="教育">{item.edu}</Descriptions.Item>
                                            <Descriptions.Item label="智力">{item.intelligence}</Descriptions.Item>
                                            <Descriptions.Item label="幸运">{item.luck}</Descriptions.Item>
                                        </Descriptions>
                                    </Descriptions.Item>
                                </Descriptions>
                            </Col>
                        </Row>
                    </div>
                    <Divider />
                    <div className={style.card_detail12}>
                        <Tabs
                            defaultActiveKey="1"
                            type="card"
                            size="small"
                            onChange={callback}
                        >
                            <TabPane
                                tab="技能"
                                key="1"
                            >
                                <Space direction="vertical">
                                    <Collapse
                                        className={style.detail_panel}
                                        collapsible="header"
                                        expandIconPosition="right"
                                    >
                                        <Panel header="已学技能" key="1">
                                            <Table
                                                rowKey="id"
                                                bordered={true}
                                                columns={[
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
                                                ]}
                                                dataSource={item.skills}
                                                pagination={false}
                                                style={{paddingTop: 10}}
                                                scroll={{ y: 100 }}
                                            />
                                        </Panel>
                                    </Collapse>
                                </Space>
                            </TabPane>
                            <TabPane
                                tab="装备/道具"
                                key="2"
                            >
                                <Space direction="vertical">
                                    <Collapse
                                        className={style.detail_panel}
                                        collapsible="header"
                                        expandIconPosition="right"
                                    >
                                        <Panel header="装备" key="2">
                                            <Table
                                                rowKey="id"
                                                bordered={true}
                                                columns={weaponColumns}
                                                dataSource={item.weapons}
                                                pagination={false}
                                                style={{paddingTop: 10}}
                                                scroll={{ x:350 }}
                                            />
                                        </Panel>
                                    </Collapse>
                                    <Collapse
                                        className={style.detail_panel}
                                        expandIconPosition="right"
                                    >
                                        <Panel header="道具" key="3">
                                            {/* <Input disabled defaultValue={item.goods}></Input> */}
                                            <Descriptions
                                                size='small'
                                                column={1}
                                            >
                                                <Descriptions.Item>{item.goods}</Descriptions.Item>
                                            </Descriptions>
                                        </Panel>
                                    </Collapse>
                                </Space>
                            </TabPane>
                            <TabPane
                                tab="详细信息"
                                key="3"
                            >
                                <Space direction="vertical">
                                    <Collapse
                                        className={style.detail_panel}
                                        collapsible="header"
                                        expandIconPosition="right"
                                    >
                                        <Panel header="详细信息" key="4">
                                            <Descriptions
                                                size='small'
                                                column={1}
                                            >
                                                <Descriptions.Item>{item.background}</Descriptions.Item>
                                            </Descriptions>
                                        </Panel>
                                    </Collapse>
                                </Space>
                            </TabPane>
                            <TabPane
                                tab="调查员经历"
                                key="4"    
                            >
                                <Space direction="vertical">
                                    <Collapse
                                        className={style.detail_panel}
                                        collapsible="header"
                                        expandIconPosition="right"
                                    >
                                        <Panel header="调查员经历" key="5">
                                            <Descriptions
                                                size='small'
                                                column={1}
                                            >
                                                <Descriptions.Item>{item.experience}</Descriptions.Item>
                                            </Descriptions>
                                        </Panel>
                                    </Collapse>
                                </Space>,
                            </TabPane>
                            <TabPane
                                tab="资金情况"
                                key="5" 
                            >
                                <Space direction="vertical">
                                    <Collapse
                                        className={style.detail_panel}
                                        collapsible="header"
                                        expandIconPosition="right"
                                    >
                                        <Panel header="资产情况" key="6">
                                            <Descriptions
                                                size='small'
                                                column={1}
                                            >
                                                <Descriptions.Item>{item.money}</Descriptions.Item>
                                            </Descriptions>
                                        </Panel>
                                    </Collapse>
                                </Space>,
                            </TabPane>
                        </Tabs>
                    </div>
                </>
            }
            console.log('content',content);
            contentList[item.name] = content[item.name];
        })
        console.log('contentList',contentList);
        setContentList(contentList);
    }

    const onTab2Change = key => {
        setActiveTabKey2(key);
    };

    return (
        <div className={style.tabContent}>
            <Card
                style={{ width: '100%' }}
                tabList={tabList}
                activeTabKey={activeTabKey2}
                onTabChange={key => {
                    onTab2Change(key);
                }}
            >
                {contentList[activeTabKey2]}
            </Card>
        </div>

    )
}

export default RoomCardDetailList

