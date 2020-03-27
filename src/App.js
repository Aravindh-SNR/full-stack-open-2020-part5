import React, { useState } from 'react';
import Notification from './components/Notification';
import Blogs from './components/Blogs';
import LoginForm from './components/LoginForm';
import './App.css';

const App = () => {
  const initialUser = () => JSON.parse(localStorage.getItem('user') || null);

  const [user, setUser] = useState(initialUser);

  const [message, setMessage] = useState(null);
  const [type, setType] = useState('');

  return (
    <div>
      <Notification message={message} type={type} setMessage={setMessage} setType={setType} />
      {
        user ?
          <Blogs user={user} setUser={setUser} setMessage={setMessage} setType={setType} /> :
          <LoginForm setUser={setUser} setMessage={setMessage} setType={setType} />
      }
    </div>
  );
};

export default App;