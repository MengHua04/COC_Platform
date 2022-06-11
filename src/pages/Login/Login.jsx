import { Form, Input, Button, Tabs } from 'antd';
import React,{ useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.less';
import logo from '../../asset/resource/logo.png'
import { login } from '../../services/login.js';
import Local from '../../utils/storage.js';
import LoginForm from './LoginForm.jsx'
import RegisterForm from './RegisterForm.jsx'

const { TabPane } = Tabs;

export default function Login() {

  let navigate = useNavigate();

  const [state, setState] = useState({
    show: 'login'
  })

  return (
    <div className={styles.bg}>
      <Tabs centered type="card">
        <TabPane tab="登录" key="1">
          <LoginForm />
        </TabPane>
        <TabPane tab="注册" key="2">
          <RegisterForm />
        </TabPane>
      </Tabs>
    </div>
  )
}