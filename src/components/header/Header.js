import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import style from './Header.module.css';
import Button from '../button/Button';
import { toggleLoading } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';



const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuth = useSelector(state => state.isAuth.loading)
    const [buttonMessage, setButtonMessage] = useState('Войти');
    const [search, setSearch] = useState('Поиск');

    const chekState = (isAuth) => {
        if (isAuth === 'Пользователь авторизован') {
            setButtonMessage('Выйти')
        }

    }

    useEffect(() => {
        chekState(isAuth)
    })

    const inOut = () => {
        dispatch(toggleLoading(null));
        localStorage.clear();
    }
    const regSearch = /* /^([a-zа-яё]+|\d+)$/i *//[\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}]/gu;

    const onKeyDown = (e) => {
        let result = search.match(regSearch);
        if (e.key === 'Enter' && result != null) {
            navigate(`/searchpage/${search}`)
            return;
        }
    }

    return (
        <div>
            <div className={style.container + ' ' + style.title}>
                <div className={style.item} >Название</div>
                <div className={style.item}><a href="/">Главная</a></div>
                <div className={style.item}><a href="">Иллюстрации</a></div>
                <div className={style.item}><a href="">Видео</a></div>
                <div className={style.item}>
                    <input
                        type="search"
                        className={style.search}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onFocus={() => setSearch('')}
                        onKeyDown={onKeyDown}
                    />
                </div>
                <div className={style.containerBtn}>
                    <div className={style.item}>
                        <a href="/Auth" onClick={inOut} >
                            <Button
                                text={buttonMessage}
                                universalFunc={inOut}
                            />
                        </a>
                    </div>
                    <div className={style.item}>
                        <a href="/Registration">
                            <Button
                                text={'Регистрация'}
                            />
                        </a>
                    </div>
                </div>



            </div>
        </div>
    );
}

export default Header;