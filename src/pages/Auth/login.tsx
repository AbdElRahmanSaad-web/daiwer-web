import React, { useEffect } from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input, message, Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/DAIWER.png';

type FieldType = {
    email_phone?: string;
    password?: string;
};

const Login: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        if (!token) {
            navigate('/login');
        } else {
            navigate('/');
        }
    }, []);

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        console.log('Form Submitted:', values);

        try {
            const response = await fetch('https://api.daiwer.com/api/v1.0/user/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Client-key': 'Ph!no!icApp',
                },
                body: JSON.stringify({
                    email_phone: values.email_phone,
                    password: values.password,
                }),
            });

            const data = await response.json();

            if (!response.ok || data.code !== '0000') {
                handleApiError(data.code, data.message);
                return;
            }

            if (data?.data?.token) {
                localStorage.setItem('auth_token', data.data.token);
                message.success({
                    content: 'Login successful!',
                    icon: <span style={{ color: 'green' }}>✔</span>,
                });
                navigate('/');
            } else {
                message.warning('Login successful but no token received.');
            }
        } catch (error) {
            console.error('Unexpected error:', error);
            message.error('An unexpected error occurred. Please try again.');
        }
    };

    const handleApiError = (code: string, messageText: string) => {
        switch (code) {
            case '0017':
                message.error('Wrong email/phone or password. Please try again.');
                break;
            case '0118':
                message.error('You are not authorized to use the API(s).');
                break;
            default:
                message.error(messageText || 'An unknown error occurred.');
                break;
        }
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Form validation failed:', errorInfo);
        message.error('Please fill in all required fields.');
    };

    return (
        <div
          style={{
            display: 'grid',
            placeItems: 'center',
            height: '100vh',
            overflow: 'hidden',
            padding: '10px',
          }}
        >
          <div
            style={{
              background: '#fff',
              padding: '30px',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              maxWidth: '400px',
              width: '100%',
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <img src={logo} alt="Logo" style={{ width: '120px' }} />
            </div>
            <Form
             name="login-form"
             labelCol={{ span: 8 }}
             wrapperCol={{ span: 16 }}
             style={{ maxWidth: 600 }}
             initialValues={{ remember: true }}
             onFinish={onFinish}
             onFinishFailed={onFinishFailed}
             autoComplete="off"
            >
              <Form.Item
                label="Email or Phone"
                name="email_phone"
                rules={[{ required: true, message: 'Please input your email or phone!' }]}
              >
                <Input placeholder="Enter your email or phone" />
              </Form.Item>
    
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password placeholder="Enter your password" />
              </Form.Item>
    
              <Row gutter={16}>
                <Col span={12}>
                  <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                    Login
                  </Button>
                </Col>
                <Col span={12}>
                  <Button
                    type="default"
                    style={{
                      width: '100%',
                      backgroundColor: '#73d13d',
                      color: 'white',
                      borderColor: '#73d13d',
                    }}
                    onClick={() => navigate('/register')}
                  >
                    Register
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      );
    };
    
    export default Login;