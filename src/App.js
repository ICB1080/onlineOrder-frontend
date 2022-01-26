import logo from './logo.svg';
import './App.css';
import {Layout, Typography} from "antd";
import FoodList from "./components/FoodList";
import LoginForm from "./components/LoginForm";
import React, {useState} from 'react'
import MyCart from "./components/MyCart";
import SignUpForm from "./components/SignUpForm";
const { Header, Content} = Layout;
function App() {
    // 创建authed和修改authed的方法
    const [authed, setAuthed] = useState(false);
    const { Title } = Typography;



    return (
      <Layout style={{height : "100"}}>
        <Header>
            <div className="header">
          <Title
              level={2}
              style={{ color: "white", lineHeight: "inherit", marginBottom: 0 }}
          >Doordash Food
          </Title>

                <div>
                    { authed
                        ?
                        <MyCart />
                        :
                        <SignUpForm />
                    }
                </div>


            </div>
        </Header>
        <Content style = {{
          padding:"50px",
          // 100%指整个页面
          maxHeight: "calc(100% - 64px)",
          overflowY:"auto"
        }}>
            {
                authed ?
                    <FoodList />:
                    <LoginForm onSuccess={() => setAuthed(true)} />
            }
        </Content>
      </Layout>

  );
}

export default App;
