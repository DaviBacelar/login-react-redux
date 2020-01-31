import React, { useState } from 'react'
import Axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import { authAction } from '../actions'
const Icons = {}

const RegisterComp = (props) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCPF] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth)

    const validateForm = () => {
      return email.length > 0 && password.length > 0;
    }

    const postCredentials = (e) => {
        e.preventDefault();
        Axios.post('https://www.geniusdev.net/api/tests/login-react-redux/register', {
            name: name,
            email: email,
            cpf: cpf,
            password: password,
            passwordConfirm: passwordConfirm
          })
        .then(response => {
          dispatch(authAction(true))
          setError(false)
        })
        .catch(error => {
          console.log(error);
          setError(true)
        });
    }

    return (
    <form className="login-box" onSubmit={ e => postCredentials(e) }>
        <h2 className="login-title" style={{textAlign: "center"}}>Criar Nova Conta</h2>
        <div className="input-box">
          <div className="input-div">
              <label>Nome:</label>
              <input
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}            
                type="text"
                required />
              <span className="icon"><i className={Icons.user}></i></span>
          </div>
          <div className="input-div">
            <label>Email:</label>
            <input
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}            
              type="text"
              required />
              <span className="icon"><i className={Icons.user}></i></span>
          </div>
          <div className="input-div">
            <label>CPF:</label>
            <input
              id="cpf"
              value={cpf}
              onChange={e => setCPF(e.target.value)}            
              type="text"
              required />
              <span className="icon"><i className={Icons.user}></i></span>
          </div>
          <div className="input-div">
            <label>Password:</label>
            <input
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              type={ showPassword ? "text" : "password" } 
              required />
              <span className="icon"><i className={Icons.lock}></i></span>
              <a className="show-button" onClick={e => showPassword ? setShowPassword(false) : setShowPassword(true)}>
              { showPassword ? <i className={Icons.showEye}></i> : <i className={Icons.hideEye}></i> }
            </a>   
          </div>
          <div className="input-div">
            <label>Confirmar Password:</label>
            <input
              id="passwordConfirm"
              value={passwordConfirm}
              onChange={e => setPasswordConfirm(e.target.value)}
              type={ showPasswordConfirm ? "text" : "password" } 
              required />
              <span className="icon"><i className={Icons.lock}></i></span>
              <a className="show-button" onClick={e => showPasswordConfirm ? setShowPasswordConfirm(false) : setShowPasswordConfirm(true)}>
              { showPasswordConfirm ? <i className={Icons.showEye}></i> : <i className={Icons.hideEye}></i> }
            </a>   
          </div>
        </div>
        {error &&
          <div className="error-box">
            Nome de Usuário ou Senha Incorretos
          </div>
        }
        <div className="login-button-div">
          <button id="submit" type="submit" className="button expanded" disabled={!validateForm()}>Registrar</button>
        </div>
    </form>
    )
}

export default RegisterComp