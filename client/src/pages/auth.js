import React, { useState } from 'react'

const Auth = () => {
  return (
    <div><Login /></div>
  )
}

export default Auth

const Login = () => {
  return (
    <div>
      Login from here
    </div>
  )
}
//here
const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <form>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" value={username} onChange={(event) => setUsername(event.target.value)}></input>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)}></input>
      </form>
    </div>
  )
}