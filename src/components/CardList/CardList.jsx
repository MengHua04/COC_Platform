import React from "react";
import style from "./CardList.module.less";
import { Card, Row, Col, Descriptions, Button, notification } from "antd";
import { useNavigate } from 'react-router-dom';
import { cardDelete } from '../../services/person';

function CardList(props) {
    const {
        dataSource = [],
        weapons = [],
        onClickItem = () => { }
    } = props

    return (
        <Row justify="space-around">
            {dataSource.map((item, index) =>
                <CardItem
                    dataItem={item}
                    key={index}
                    weapons={weapons}
                    onClickItem={onClickItem}
                />
            )}
        </Row>
    )
}

function CardItem(props) {
    const { dataItem = {},weapons = [], onClickItem = () => { } } = props
    let navigate = useNavigate();

    const modifyCard = (record) => {
        navigate(`/cardupdate/${record.id}`, {
            state: {
                cardItem: record,
                weaponList: weapons,
            }
        });
    }

    const deleteCard = (record) => {
        const sendData = {
            id: record.id
        }
        cardDelete(sendData).then(
            (res) => {
                if(res.success) {
                    notification.success({
                        message: '成功',
                        description: '删除成功'
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
            onClickItem();
    }

    return (
        <Col span={6}>
            <Card
                className={style.cards}
                cover={<img className={style.card_img} alt="card_avator" src={require(`../../asset/resource/avator.jpeg`)} />}
            >
                <Descriptions
                    column={1}
                >
                    <Descriptions.Item style={{paddingBottom:"0"}} label="ID">{dataItem.id}</Descriptions.Item>
                    <Descriptions.Item style={{paddingBottom:"0"}} label="姓名">{dataItem.name}</Descriptions.Item>
                    <Descriptions.Item style={{paddingBottom:"0"}} label="年龄">{dataItem.age}</Descriptions.Item>
                    <Descriptions.Item style={{paddingBottom:"0"}} label="职业">{dataItem.profession}</Descriptions.Item>
                </Descriptions>
                <div className={style.operation}>
                    <Row>
                        <Col span={12}>
                            <Button type="primary" shape="round" onClick={() => {modifyCard(dataItem)}}>
                                修改
                            </Button>
                        </Col>
                        <Col span={12}>
                            <Button type="primary" shape="round" onClick={() => {deleteCard(dataItem)}}>
                                删除
                            </Button>
                        </Col>
                    </Row>
                </div>
            </Card>
        </Col>
    )
}

export default CardList

