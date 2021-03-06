import { 
  Input,
  Button,
  Row,
  Col,
  Layout,
  Descriptions,
  Divider,
  Card,
  Collapse,
  Space,
  Tabs,
  Typography,
  notification,
  Table,
  Modal,
  Form,
} from 'antd';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { UserOutlined } from '@ant-design/icons';
import style from './Room.module.less';
import Head from '../../components/Header/Header.jsx';
import background from "../../asset/resource/Load.jpg";
import Local from '../../utils/storage.js';
import RoomCardDetailList from '../../components/RoomCardDetailList/RoomCardDetailList.jsx';
import RoomChat from './RoomChat/RoomChat.jsx';
import { roomList, roomExit } from '../../services/hall.js';
import { cardAssign, cardImport, cardImportList, roomUsers } from '../../services/room.js';
import { close } from '../../utils/websocket.js';
import { getPersonSkills } from '../../services/skills.js';
import { getPersonWeapons } from '../../services/weapons.js';
import { useLocation, useNavigate } from 'react-router-dom';
import { sortedLastIndex } from 'lodash';

const { Content } = Layout;
const { Panel } = Collapse;
const { TabPane } = Tabs;
const { Paragraph } = Typography;

export default function Room() {
  const [userAccount, setUserAccount] = useState('');
  const [roomMsg, setRoomMsg] = useState([]);
  const [roomUser, setRoomUser] = useState([]);
  const [roomAssignCard, setRoomAssignCard] = useState([]);
  const [importAssignModal, setImportAssignModal] = useState(false);
  const [cardId, setCardId] = useState('');
  const [cardList, setCardList] = useState([]);
  const [curUser, setCurUser] = useState([]);
  let location = useLocation();
  const roomId = location.state.id;
  let navigate = useNavigate();

  useEffect(() => {
    function getCurUser() {
      const loggedInUser = Local.getLocal('curUser');
      if(loggedInUser) {
          setUserAccount(loggedInUser);
      }
      getRoom(roomId);
    }
    getCurUser();
  },[])

  useEffect(() => {
    getUsers();
    getCardList();
  },[]);

  useEffect(() => {
    getAssignCards();
  },[importAssignModal])

  const getUsers = async() => {
    roomUsers().then(
      (res) => {
        if(res.success) {
        }
    }).catch((err) => {
        if(err.code == '0') {
          let datas = [];
          for(let index in err.data){
            const msg = {
              id: err.data[index].id,
              account: err.data[index].account
            }
            datas.push(msg)
          }
          setRoomUser(datas);
        }
      }
    )
  }


  window.onunload = function() {
    console.log("????????????");
    exitRoom()
  }

  const getRoom = async(id) => {
    const sendData = {
      roomNo: id
    }
    roomList(sendData).then(
      (res) => {
          if(res.success) {
  
          }
      }).catch((err) => {
          if(err.code == '0') {
            for(let i=0;i<err.data.records.length;i++){
              const msg = err.data.records[i];
              if(msg.roomNo == id){
                setRoomMsg(msg);
              }
            }
          }
      });
  };

  const getCardList = async() => {
    cardImportList().then(
      (res) => {
        if(res.success) {
        }
      }).catch((err) => {
          if(err.code == '0') {
              console.log('cardList',err);
              setCardList(err.data);
          }
      });
  }

  const getAssignCards = async() => {
    roomUsers().then(
      (res) => {
        if(res.success) {
        }
    }).catch((err) => {
        if(err.code == '0') {
          let datas = [];
          for(let index in err.data){
            if(err.data[index].person.length != 0){
              // datas.push(err.data[index].person);
              getPersonSkills({personId: err.data[index].person.id}).then(
                (subres) => {
                  if(subres.success) {}
                }).catch((suberr) => {
                  if(suberr.code == '0') {
                    if(suberr.data.length != 0) {
                      err.data[index].person.skills = suberr.data;
                    }
                  }
                })
              getPersonWeapons({personId: err.data[index].person.id}).then(
                (subres) => {
                  if(subres.success) {}
                }).catch((suberr) => {
                  if(suberr.code == '0') {
                    if(suberr.data.length != 0) {
                      err.data[index].person.weapons = suberr.data;
                    }
                  }
                })
              datas.push(err.data[index].person);
            }
          }
          console.log('assignCard',datas);
          setRoomAssignCard(datas);
        }
      }
    )
  }

  const exitRoom = async () => {
    const sendData = {
      id:curUser.id
    }
    roomExit(sendData).then(
        (res) => {
            if(res.success) {
                notification.success({
                    message: '??????',
                    description: '????????????'
                })
            }
        }).catch((err) => {
            if(err.code == '0') {
                notification.success({
                    message: '??????',
                    description: err.msg
                })
                close()
                navigate('/home');
            }
        });
  }

  const handleCardImport = (account) => {
    console.log('button',account);
    setCurUser(account);
    setImportAssignModal(true);
  }

  const handleOk = async(item, index) => {//???????????????OK?????????????????????
    var userId = '';
    console.log(roomUser,curUser);
    for(let j=0;j<roomUser.length;j++) {
      if(curUser.account == roomUser[j].account) {
        userId = roomUser[j].id;
      }
    }
    for(let i=0;i<cardList.length;i++) {
      if(cardId == cardList[i].id) {
        const sendData = {
          personId: cardId,
          userId: userId,
        }
        console.log('assign',sendData);
        if(sendData.personId == undefined) {
          notification.success ({
            message: '??????',
            description: '???????????????'
          })
        }
        cardAssign(sendData).then(
          (res) => {
              if(res.success) {
                  notification.success({
                      message: '??????',
                      description: '?????????????????????'
                  })
              }
          }).catch((err) => {
              if(err.code == '0') {
                  notification.success({
                      message: '??????',
                      description: err.msg
                  })
                  console.log('assign',err);
                  getUsers();
              }
          });
      }
    }
    setImportAssignModal(false);
  }

  const getCardId = (event) => {
    const word = event.target.value
    setCardId(word);
  }

  const importCard = async(id) => {
    const sendData = {
      personId :id
    }
    cardImport(sendData).then(
      (res) => {
          if(res.success) {
              notification.success({
                  message: '??????',
                  description: '????????????'
              })
          }
      }).catch((err) => {
          if(err.code == '0') {
              notification.success({
                  message: '??????',
                  description: err.msg
              })
              getCardList();
          }
      });
  }

  return (
    <div className={style.bg}>
      <Layout>
        <Head />
        <Content style={{ backgroundImage: `url(${background})`, padding: 0, margin: 24 }}>
          <div className={style.content}>
            <Row gutter={24}>
              <Col span={7}>
                <div className={style.gutter_box}>
                  <div className={style.sub_title}>?????????</div>
                  <RoomCardDetailList 
                    dataSource={roomAssignCard}
                    onClick
                  />
                </div>
              </Col>
              <Col span={10}>
                <div className={style.gutter_box}>
                  <div className={style.sub_title}>?????????</div>
                  <RoomChat />
                </div>
              </Col>
              <Col span={7}>
                <div className={style.gutter_box}>
                  <div className={style.sub_title}>?????????</div>
                  <div className={style.room_functions}>
                    <Tabs type="card">
                      <TabPane tab="????????????" key="1">
                        <Descriptions
                          column={1}
                        >
                            <Descriptions.Item style={{paddingBottom:"0"}} label="????????????">{roomMsg.roomNo}</Descriptions.Item>
                            <Descriptions.Item style={{paddingBottom:"0"}} label="????????????">{roomMsg.personLimit}</Descriptions.Item>
                            <Descriptions.Item style={{paddingBottom:"0"}} label="????????????">{roomMsg.rule}</Descriptions.Item>
                            <Descriptions.Item style={{paddingBottom:"0"}} label="??????">
                                <Paragraph>
                                    {roomMsg.bgStory}
                                </Paragraph>
                            </Descriptions.Item>
                        </Descriptions>
                      </TabPane>
                      <TabPane tab="?????????" key="2">
                        <div className={style.roomUsers}>
                          <h2>????????????</h2>
                          <Table
                            rowKey="id"
                            bordered
                            columns={[
                              {
                                dataIndex: "account",
                                title: "????????????",
                                align: 'center'
                              },
                              {
                                dataIndex: "id",
                                title: "????????????",
                                align: 'center',
                                render : (text,record,index) => {
                                  return (
                                    <>
                                      <Button type='primary' onClick={() => handleCardImport(record)}>?????????????????????</Button>
                                      <Modal
                                        key={record}
                                        title="?????????????????????"
                                        visible={importAssignModal}
                                        onOk={handleOk}
                                        onCancel={() => setImportAssignModal(false)}
                                        okText="??????"
                                        cancelText="??????"
                                        destroyOnClose
                                      >
                                        <Row gutter={16}>
                                          <Col span={12}>
                                            <Input onChange={getCardId}></Input>
                                          </Col>
                                          <Col span={6}>
                                            <Input
                                                disabled
                                                placeholder='???????????????'
                                            />
                                          </Col>
                                          <Col span={6}>
                                            <Button type='primary' onClick={() => importCard(cardId)}>??????</Button>
                                          </Col>
                                        </Row>
                                      </Modal>
                                    </>
                                  )
                                }
                              }
                            ]}
                            dataSource={roomUser}
                            pagination={false}
                            scroll={{ y: 400 }}
                          />
                        </div>
                        <div className={style.operations}>
                          <Button type='default' onClick={exitRoom}>????????????</Button>
                        </div>
                      </TabPane>
                    </Tabs>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>
    </div>
  )
}