import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "../button/Button";
import { fetchAuthSlice } from "../../store/authSlice";



const Auth = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [urlId, setUrlId] = useState(null);
    const navigate = useNavigate();
    const isAuth = useSelector(state => state.isAuth)


    const redirectAuth = () => {
        navigate(`/account/${urlId}`)
        return true;

    }

    const authFunc = () => {
        const userIsAuth = {
            email,
            password,
        }
        dispatch(fetchAuthSlice(userIsAuth));
        setUrlId(isAuth.isTokenId);

    }

    useEffect(() => {
        if (urlId != null) {
            redirectAuth();
        }
    }, [urlId])

    return (
        <div style={{ margin: '0 auto' }}>
            <h2>Авторизация</h2>
            <p>{isAuth.error != null ? isAuth.error : isAuth.loading}</p>
            <p>Электронная почта</p>
            <p>
                <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </p>
            <p>Пароль</p>
            <p>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </p>
            <Button text={'Войти'} universalFunc={authFunc} />
        </div >
    );
}

export default Auth;