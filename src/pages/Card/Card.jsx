import React,{ useState,useEffect } from 'react';
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
import { useNavigate, useLocation } from 'react-router-dom';
import Head from '../../components/Header/Header.jsx';
import CardList from '../../components/CardList/CardList.jsx'
import background from "../../asset/resource/Load.jpg";
import style from './Card.module.less';
import { cardGet } from '../../services/person.js'


const { Search } = Input;

const onSearch = value => console.log(value);

export default function Card() {
    let location = useLocation();
    const userAccount = location.state.account;
    const occupations = location.state.occupationList;
    const weapons = location.state.weaponList;

    const [cardList, setCardList] = useState([
    {
        id:'1',
        url:'card2.jpg',
        name:'陈狠人',
        age:'32',
        occupation:'工程师',
    },
    {
        id:'2',
        url:'card1.jpg',
        name:'成步堂二胡',
        age:'22',
        occupation:'律师',
    },
    {
        id:'3',
        url:'card3.jpg',
        name:'科林',
        age:'36',
        occupation:'替身演员',
    },
]);

    useEffect(() => {
        getCards();
    }, []);

    const getCards = async() => {
        const sendData = {
            account: userAccount
        }
        cardGet(sendData).then(
            (res) => {
                if(res.success) {
        
                }
            }).catch((err) => {
                if(err.code == '0') {
                    // for(let i=0;i<err.data.length;i++) {
                    //     console.log(err.data[i]);
                    //     if(err.data[i].profession == occupations[err.data[i].profession-1].id) {
                    //         err.data[i].professionNumber = occupations[err.data[i].profession-1].name
                    //     }
                    // }
                    console.log('update', err.data);
                    setCardList(err.data);
                }
            });
    };

    return (
        <div className={style.bg}>
            <Layout>
                <Head />
                <Content style={{ backgroundImage: `url(${background})`}}>
                    <div className={style.card_content}>
                        <span
                        className={style.card_content_title}>
                            卡库
                        </span>
                        <div className={style.show_card}>
                            <CardList
                                dataSource={cardList}
                                weapons={weapons}
                                onClickItem = {() => {getCards}}
                            />
                            <Pagination className={style.pagination} defaultCurrent={1} total={1} />
                        </div>
                    </div>
                </Content>
            </Layout>
        </div>
    )
}