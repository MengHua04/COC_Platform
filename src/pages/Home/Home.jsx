import React,{ useState, useEffect } from 'react';
import {
  Layout,
  Button,
  Row,
  Col,
  Input,
  Pagination,
} from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { roomList } from '../../services/hall.js';
import Head from '../../components/Header/Header.jsx';
import RoomCardList from '../../components/RoomCardList/RoomCardList.jsx'
import Banner from '../../components/Banner/Banner.jsx';
import background from "../../asset/resource/Load.jpg";
import style from './Home.module.less';


const { Search } = Input;

export default function Home() {

  let navigate = useNavigate();

  const toAddRoom = () => {
    navigate('addroom');
  }

  const [rooms, setRooms] = useState([
    {
      id:'1',
      roomNo:'失落之城',
      kp:'aba',
      personLimit:'4',
      rule:'480购点',
      bgStory:'近代日本',
      roomOwnerId: '27',
    },
    {
      id:'2',
      roomNo:'亚特兰蒂斯',
      kp:'test',
      personLimit:'4',
      rule:'480购点',
      bgStory:'中世纪',
      roomOwnerId: '2',
    },
  ]);
  
  useEffect(() => {
		getRooms();
	}, []);

  const getCurrentRooms = () => {

  }

	const getRooms = async() => {
    roomList().then(
      (res) => {
          if(res.success) {

          }
      }).catch((err) => {
          if(err.code == '0') {
              setRooms(err.data.records);
          }
      });
	};

  return (
    <div className={style.bg}>
      <Layout>
        <Head />
        <div className={style.head_dividar}></div>
        <Content style={{ backgroundImage: `url(${background})`}}>
          <div className={style.banner}>
            <Banner />
          </div>
          <div className={style.lobby}>
            <span
              className={style.lobby_title}>
              大厅
            </span>
            <div className={style.operation_group}>
              <Row>
                <Col span={16}></Col>
                <Col span={5}>
                  <Search placeholder="请输入房间名称" onSearch={getCurrentRooms} style={{ width: 200 }} />
                </Col>
                <Col span={3}>
                  <Button type="primary" shape="round" onClick={toAddRoom} icon={<PlusOutlined />}>
                    新建房间
                  </Button>
                </Col>
              </Row>
            </div>
            <div className={style.show_lobby}>
              <RoomCardList 
                dataSource={rooms}
                onClick = {(item) => { store.set('inCluster', item.id); }}
              />
              <Pagination className={style.pagination} defaultCurrent={1} total={1} />
            </div>
          </div>
        </Content>
      </Layout>
    </div>
  )
}