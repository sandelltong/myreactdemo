import React, { useState } from 'react';
import {Redirect} from 'react-router-dom';
import {Form, Button, Row, Col} from 'react-bootstrap'
import './Login.scss';
import axios from "axios";

axios.defaults.baseURL = window.location.origin;

const Login = props => {    
    const initialUser = {email:'', password:''}

    const [ user, setUser ] = useState(initialUser);
    const [ loginSuccess, setLoginSuccess ] = useState(false);

    const onLogin = async () => {
        try {
            var response = await axios.post('/api/users/login', user);
            console.log(response)
        }
        catch(error) {
            console.error(error);
        }
    }

    const handleInputChange = event => {
        const { name, value } = event.target
        setUser({ ...user, [name]: value })
    }
    
    if (loginSuccess) {
        return <Redirect to='/incident' />
    }
    else {
        return (
            <div className='login-form'>
                <Form noValidate onSubmit={onLogin}>
                    <Form.Group as={Row}>
                        <Form.Label column sm="4">Email address</Form.Label>
                        <Col sm="8">
                            <Form.Control type="email" name='email' onChange={handleInputChange} placeholder="Enter email" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="4">Password</Form.Label>
                        <Col sm="8">                    
                            <Form.Control type="password" name='password'  onChange={handleInputChange} placeholder="Password" />
                        </Col>
                    </Form.Group>
                    <Button variant="primary" type='submit'>
                        Login
                    </Button>
                    <Form.Group as={Row}>
                        <Col sm="12">
                            <Form.Label>No account? <a href="/register">Create one!</a></Form.Label>
                        </Col>
                    </Form.Group>                
                </Form>
            </div>
        );
    }
}

export default Login;