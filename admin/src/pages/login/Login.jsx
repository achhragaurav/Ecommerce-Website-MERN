import React, { useState, useRef } from 'react';
import {useDispatch} from "react-redux"
import { useHistory } from 'react-router-dom';
import { login } from '../../redux/apiCalls';

const Login = () => {
  
  const history = useHistory()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()
  const loginButton = useRef(null);
  const [error, setError] = useState(false);

  const handleClick = async (e) =>{
    e.preventDefault();
    const resData = await login(dispatch, {username, password});
    if(resData && resData.isAdmin){
      history.push("/")
      window.location.reload();
      setError(false);
    }
    else{
        setError(true)
    }
    }

  const handleEnter = (e) =>{
    if(e.key === "Enter"){
      loginButton.current.click();
    }
    }

    React.useEffect(() => {
      window.addEventListener('keydown', handleEnter);
      return () => {
        window.removeEventListener('keydown', handleEnter);
      };
    }, []);

  return (
    <div style={{
      width: "100%",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignSelf: "center",
      justifyContent: "center",
      alignItems: "center"
      }}>
          <h1>LOGIN ADMIN</h1>
          <div style={{width: "40%",
        height: `${error ? "35vh" : "30vh"}`,
        display: "flex",
        flexDirection: "column",
        alignSelf: "center",
        justifyContent: "space-around",
        alignItems: "center"
        }}>
        <input
        style={{

          outline: "none",
          border: "none",
          borderBottom: "1px solid black",
          lineHeight: "2rem"
        }}
        type="text" placeholder='username' onChange={e=>setUsername(e.target.value)}/>
        <input
        style={{

          outline: "none",
          border: "none",
          borderBottom: "1px solid black",
          lineHeight: "2rem"
        }}
        type="password" placeholder='password' onChange={e=>setPassword(e.target.value)}/>
        <button ref={loginButton} onClick={handleClick} style={{padding: ".5rem 40px", background: "transparent"}} type='submit'>Login</button>
        {error && <span style={{
          fontSize:"12px",
          alignSelf:"center",
           color: "red",
            dispaly: "block"
            }}>Wrong Credentials</span>}
      </div>
      </div>
    );
}

export default Login;
