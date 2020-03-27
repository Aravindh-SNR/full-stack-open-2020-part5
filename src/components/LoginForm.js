import React, { useState } from 'react';
import loginService from '../services/login';

const LoginForm = ({ setUser, setMessage, setType }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const logIn = async event => {
        event.preventDefault();

        try {
            const user = await loginService.logIn({ username, password });
            setUsername('');
            setPassword('');
            setUser(user);
            localStorage.setItem('user', JSON.stringify(user));
        } catch (exception) {
            setMessage(exception.response.data.error);
            setType('error');
        }
    }

    return (
        <div>
            <h2>Log in to the application</h2>

            <form onSubmit={logIn}>
                <div className='form-field'>
                    <label htmlFor='username'>Username: </label>
                    <input id='username' value={username} autoComplete='off' autoFocus required
                        onChange={({ target }) => setUsername(target.value)} />
                </div>

                <div className='form-field'>
                    <label htmlFor='password'>Password: </label>
                    <input id='password' value={password} autoComplete='off' required
                        onChange={({ target }) => setPassword(target.value)} />
                </div>

                <div>
                    <input type='submit' value='Log in' />
                </div>
            </form>
        </div>
    );
};

export default LoginForm;