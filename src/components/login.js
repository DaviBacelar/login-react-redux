import React, { useState } from 'react'
import Axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import { authAction } from '../actions'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom';
const Icons = {}

const LoginComp = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth)

    const validateForm = () => {
        return email.length > 0 && email.length > 0;
    }

    const postCredentials = (e) => {
        e.preventDefault();
        Axios.post('https://www.geniusdev.net/tests/login/api/login', {
            email: email,
            password: password
        })
        .then(_ => {
          dispatch(authAction(true));
          setError(false);          
        })
        .catch(error => {
          console.log(error);
          setError(true);
        });
    }

    return (
      <>
        {!auth && 
          <form className="login-box" onSubmit={ e => postCredentials(e) }>
          <h2 style={{textAlign: 'center'}}>Login</h2>
          <div className="medium-12 cell">
              <label>Email:</label>
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}            
                type="email"/>               
          </div>
          <div className="medium-12 cell">
              <label>Password:</label>
              <input
                value={password}
                onChange={e => setPassword(e.target.value)}            
                type="password"/>               
          </div>
          {error &&
            <div className="error-box">
              Nome de Usuário ou Senha Incorretos
            </div>
          }
          <div className="login-button-div">            
            <button id="submit" class="button expanded" href="#"  type="submit" disabled={!validateForm()}>Login</button>
            <Link to="/register"><a class="button secondary expanded">Criar Conta</a></Link>
          </div>
      </form>
        }

        {auth &&
          <Redirect to="/" />
        }
      </>
    )
}

export default LoginComp