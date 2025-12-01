import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, saveToken } from '../api';

export default function Login(){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  async function submit(e){
    e.preventDefault();
    try{
      const data = await login(username, password);
      saveToken(data.access_token);
      navigate('/admin');
    }catch(e){
      setErr('Login failed');
    }
  }

  return (
    <div style={{maxWidth:400, margin:'40px auto'}}>
      <h2>Admin login</h2>
      <form onSubmit={submit}>
        <div>
          <label>Username</label>
          <input value={username} onChange={e=>setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        </div>
        <button type="submit">Sign in</button>
        {err && <div style={{color:'red'}}>{err}</div>}
      </form>
    </div>
  );
}
