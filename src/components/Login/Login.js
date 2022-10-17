import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/UserContext';
import './Login.css';
const Login = () => {

    const {SingIn}= useContext(AuthContext);
    const navigate= useNavigate();
    const location= useLocation();
    const from= location.state?.from?.pathname ||'/'

    const handlerSingIn=(event)=>{

        event.preventDefault();
        const form= event.target;
        const email= form.email.value;
        const password= form.password.value;

        SingIn(email, password)
        .then(result=>{
            const user= result.user;
             console.log(user);
            form.reset();
            navigate(from,{replace:true})
        })
        .catch(error=>{
            console.log(error);
        })

    }

    return (
        <div className='form-container'>
            <h2 className='form-title'>Login</h2>

            <form onSubmit={handlerSingIn}>
                <div className='form-control'>
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' required />
                </div>

                <div className='form-control'>
                    <label htmlFor="email">Password</label>
                    <input type="Password" name='password' required />
                </div>

                <button className='btn-submit' type='submit' value='Login' >Login</button>
            </form>
            <p>New to ema john <Link to='/sing up'>Create a New Account</Link></p>
            
        </div>
    );
};

export default Login;
