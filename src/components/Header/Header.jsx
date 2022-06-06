import React, { Component, useState , useEffect } from 'react'
import style from './Header.module.less'
import { Row, Col, notification } from 'antd'
import logo from '../../asset/resource/logo5.png'
import { useNavigate } from 'react-router-dom';
import Local from '../../utils/storage.js';
import { logout } from '../../services/login.js';
import { getSkills } from '../../services/skills.js';
import { getOccupations } from '../../services/occupations.js';
import { getWeapons } from '../../services/weapons.js';

function Header(props) {

    let navigate = useNavigate()

    const [user, setUser] = useState([])
    const [skills, setSkills] = useState([]);
    const [weapons, setWeapons] = useState([]);
    const [occupations, setOccupations] = useState([]);

    useEffect(() => {
        const loggedInUser = Local.getLocal('curUser');
        console.log(loggedInUser);
        if(loggedInUser) {
            setUser(loggedInUser);
        }
        getOccupationList();
        getWeaponList();
		getSkillList();
    },[])

    const getSkillList = async() => {
        getSkills().then(
            (res) => {
                if(res.success) {

                }
            }).catch((err) => {
                if(err.code == '0') {
                    setSkills(err.data);
                }
            });
    }

    const getWeaponList = async() => {
        getWeapons().then(
            (res) => {
                if(res.success) {

                }
            }).catch((err) => {
                if(err.code == '0') {
                    setWeapons(err.data);
                }
            });
    }

    const getOccupationList = async() => {
        getOccupations().then(
            (res) => {
                if(res.success) {
                    
                }
            }).catch((err) => {
                if(err.code == '0') {
                    setOccupations(err.data);
                }
            });
    }


    const toHome = () => {
        navigate('/home')
    }

    const toCard = () => {
        navigate('/card', {
            state: {
                account: user.account,
                occupationList: occupations,
                weaponList: weapons,
            }
        });
    }

    const toLogin = () => {
        navigate('/');
    }

    const toPersonal = () => {
        navigate(`/personal/${user.account}`, {
            state: {
                id: user.id,
                account: user.account,
                gender: user.gender,
                birthdate: user.birthdate,
                bgStory: user.bgStory
            }
        });
    }

    const toCardTool = () => {
        navigate('/cardtool', {
            state: {
                account: user.account,
                occupationList: occupations,
                skillList: skills,
                weaponList: weapons
            }
        });
    }

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

    return (
        <>
            <div className={style.headers}>
                <div className={style.header}>
                    <Row>
                        <Col span={2}>
                            <div className={style.logo}>
                                <img src={logo} alt=""/>
                            </div>
                        </Col>
                        <Col span={3}>
                            <div>
                                <div className={style.text}>克苏鲁的呼唤</div>
                            </div>
                        </Col>
                        <Col span={1}></Col>
                        <Col span={2}>
                            <div className={style.home} onClick={toHome}>首页</div>
                        </Col>
                        <Col span={2}>
                            <div className={style.cardbox} onClick={toCard}>卡库</div>
                        </Col>
                        <Col span={2}>
                            <div className={style.cardmake} onClick={toCardTool}>车卡工具</div>
                        </Col>
                        <Col span={2}>
                            <div className={style.personal} onClick={toPersonal}>个人中心</div>
                        </Col>
                        {/* <Col span={6}></Col> */}
                        <Col span={10}>
                            <div className={style.avatar}>
                                {
                                    user.account === undefined ? (
                                        <span onClick={toLogin}>登 录</span>
                                        
                                    ) : (
                                        <>
                                            <Row>
                                                <Col span={18}>
                                                    尊敬的{user.account},欢迎您
                                                </Col>
                                                <Col span={6}>
                                                    <span onClick={loginOut}>退出登录</span>
                                                </Col> 
                                            </Row>
                                        </>
                                    )
                                }
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}

// const mapStateToProps = state => {
//     return {userInfo: state.userInfo}
// }
// const mapDispatchToProps = dispatch => {
//     return {
//         sendAction: ()=> {
//         dispatch({
//             type: 'set_userinfo',
//             value: {}
//         })
//         }
//     }
// }
export default Header