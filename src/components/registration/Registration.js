import React, { useState } from 'react'
import validator from 'validator';
import Button from '../button/Button';
import { useSelector } from "react-redux";
import { fetchRegistrationSlice } from '../../store/authSlice';
import { useDispatch } from 'react-redux';

const Registration = () => {
    const dispath = useDispatch();
    const [register, setRegister] = useState(() => {
        return {
            username: "",
            email: "",
            password: "",
            password2: "",
        }
    })


    const changeInputRegister = event => {
        event.persist()
        setRegister(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value,
            }
        })
    }

 
    const isLoading = useSelector(state => state.isAuth.loading)
 

    const submitChackin = event => {
        event.preventDefault();
        if (!validator.isEmail(register.email)) {
            alert("You did not enter email")
        } else if (register.password !== register.password2) {
            alert("Repeated password incorrectly")
        } else if (!validator.isStrongPassword(register.password, { minSymbols: 0 })) {
            alert("Password must consist of one lowercase, uppercase letter and number, at least 8 characters")
        } else {
            const user = {
                name: register.username,
                email: register.email,
                password: register.password
            }
            dispath(fetchRegistrationSlice(user))

        }
    }


    return (
        <div>
            <h2>Register user:</h2>
            <p>{isLoading != null ? isLoading : null }</p>
            <p>Name: <input
                type="username"
                id="username"
                name="username"
                value={register.username}
                onChange={changeInputRegister}
            /></p>
            <p>Email: <input
                type="email"
                id="email"
                name="email"
                value={register.email}
                onChange={changeInputRegister}
                formnovalidate
            /></p>
            <p>Password: <input
                type="password"
                id="password"
                name="password"
                value={register.password}
                onChange={changeInputRegister}
            /></p>
            <p>Repeat password: <input
                type="password"
                id="password2"
                name="password2"
                value={register.password2}
                onChange={changeInputRegister}
            /></p>
            {/* <input type="submit" onClick={submitChackin}/> */}
            <Button
                text={'Отправить'}
                universalFunc={submitChackin}
            />

        </div>
    );
}

export default Registration;