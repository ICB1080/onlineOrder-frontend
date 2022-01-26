import React, {Component} from 'react';
import { Form, Input, Button, message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {login} from '../utils'
class LoginForm extends Component {
    state = {
        loading: false,
    };

    onFinish = (values) => {
        // set button loading
        this.setState({loading: true})
        login(values)
            .then(() => {
                // login successfully
                // inform users
                // inform parent component app logged in
                message.success(`Login Successful`);
                // 子向父的数据传递
                this.props.onSuccess();
            })
            .catch((err) => {
                // login failed
                // inform users
                // err什么message这里就什么message
                message.error(err.message);
            })
            .finally(() => {
                // do whatever
                // set button not loading
                this.setState({
                    loading: false,
                });
            })
    };

    render() {
        return (


            <Form
                name="normal_login"
                style={{
                    width: 300,
                    margin: "auto",
                }}
                onFinish={this.onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input.Password
                        prefix={<LockOutlined />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    {/*htmlType在button点击后触发onfinish事件*/}
                    <Button type="primary" htmlType="submit" loading = {this.state.loading}>
                        Log in
                    </Button>
                </Form.Item>
            </Form>

        );
    }
}

export default LoginForm;