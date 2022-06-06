import React, { useState } from "react"
import style from "./RoomCardList.module.less"
import { Card, Row, Col, Descriptions, Button, Typography } from "antd"
import roomlogo from "../../asset/resource/roomlogo.jpg"
import { useNavigate } from 'react-router-dom';
import { roomJoin } from '../../services/hall.js';

const { Paragraph } = Typography;

function RoomCardList(props) {
    const {
        dataSource = [],
        onClickItem = () => { }
    } = props

    return (
        <Row justify="space-around">
            {dataSource.map((item, index) =>
                <RoomCard
                    dataItem={item}
                    key={index}
                    onClickItem={onClickItem}
                />
            )}
        </Row>
    )
}

function RoomCard(props) {
    const { dataItem = {},onClickItem = () => { } } = props;
    const [ellipsis, setEllipsis] = useState(true);
    let navigate = useNavigate();

    const toRoom = (id) => {
        const sendData = {
            roomNo:id
        }
        roomJoin(sendData).then(
            (res) => {
                if(res.success) {
                }
            }).catch((err) => {
                navigate(`/room/${id}`,{
                    state:{
                        id:id
                    }
                })
        });

    }

    return (
        <Col span={6}>
            <Card
                className={style.room_card}
                cover={<img className={style.card_img} alt="roomlogo" src={roomlogo} />}
            >
                <Descriptions
                    column={1}
                >
                    <Descriptions.Item style={{paddingBottom:"0"}} label="房间名称">{dataItem.roomNo}</Descriptions.Item>
                    {/* <Descriptions.Item style={{paddingBottom:"0"}} label="KP">{dataItem.kp}</Descriptions.Item> */}
                    <Descriptions.Item style={{paddingBottom:"0"}} label="游玩人数">{dataItem.personLimit}</Descriptions.Item>
                    <Descriptions.Item style={{paddingBottom:"0"}} label="车卡类型">{dataItem.rule}</Descriptions.Item>
                    <Descriptions.Item style={{paddingBottom:"0"}} label="背景">
                        <Paragraph ellipsis={ellipsis ? { rows: 3, tooltip: `${dataItem.bgStory}` } : false}>
                            {dataItem.bgStory}
                        </Paragraph>
                    </Descriptions.Item>
                </Descriptions>
                <div className={style.operation}>
                    <Button type="primary" shape="round" onClick={() => toRoom(dataItem.roomNo)}>
                        加入房间
                    </Button>
                </div>
            </Card>
        </Col>
    )
}

export default RoomCardList

