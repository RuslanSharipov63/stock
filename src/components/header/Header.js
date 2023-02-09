import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import style from './Header.module.css';
import Button from '../button/Button';
import { toggleLoading } from '../../store/authSlice';
import { searchMain } from '../../store/allDataSlice';


const Header = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.isAuth.loading)
    const [buttonMessage, setButtonMessage] = useState('Войти');
    const [search, setSearch] = useState('Поиск');

    const chekState = (isAuth) => {
        if (isAuth === 'Пользователь авторизован') {
            setButtonMessage('Выйти')
        }

    }

    const searchMain = (e) => {
        let a = e.target.value
        setSearch(a)
        console.log(search)
    }

    useEffect(() => {
        chekState(isAuth)
    })

    const inOut = () => {
        dispatch(toggleLoading(null));
        localStorage.clear();
    }


    useEffect(() => {
         if (search != 'Поиск' && search != '') {
            dispatch(searchMain(search));

         } 
    }, [search, dispatch])


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
                        onChange={searchMain}
                      /*   onFocus={() => setSearch('')} */
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