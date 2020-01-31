import React, { useState } from 'react'
import Axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import { authAction } from '../actions'
import { Redirect } from 'react-router'
const Icons = {}

const LoginComp = (props) => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth)

    const logout = (e) => {
        dispatch(authAction(false))
    }

    return (
        <div>
            {auth == true && 
                <div className="login-box">
                    <h2 style={{textAlign: 'center'}}>Logado</h2>
                    <button class="button expanded" onClick={_ => logout()}>Deslogar</button>
                </div>
            }

            {auth != true && 
                <Redirect to="/login" />
            }
        </div>
    )
}

export default LoginComp