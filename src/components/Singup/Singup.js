import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import UserContext, { AuthContext } from '../Context/UserContext';
import './Singup.css';


const Singup = () => {

    const [error, setError]= useState(null); 
    const {createUser}= useContext(AuthContext)

    const handleSubmit=(event)=>{
        event.preventDefault();

        const form= event.target;
         const email = form.email.value;
        const password= form.password.value;
        const confirm= form.confirm.value;

        if(password.length <6){
            setError('password should be 6 characters or more.');
            return;
        }
        if(password !== confirm){
            setError('Your Password did not match');
            return;
        }

        createUser(email,password)
        .then(result=>{
            const user= result.user;
            console.log(user);
            form.reset();
        })
        .catch(error=>console.log(error))


       


    }

    return (
        <div className='form-container'>
            <h2 className='form-title'>Sing up</h2>

            <form onSubmit={handleSubmit}>
                <div className='form-control'>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" required />
                </div>

                <div className='form-control'>
                    <label htmlFor="email">Password</label>
                    <input type="Password" name="password" required />
                </div>

                <div className='form-control'>
                    <label htmlFor="email">Confirm Password</label>
                    <input type="Password" name="confirm" required />
                </div>

                <button className='btn-submit' type='submit' value='Login' >Sing up</button>
            </form>
            <p>All Ready have an Account <Link to='/login'>Login</Link></p>
            <p className='text-error'>{error}</p>
        </div>
    );
};

export default Singup;