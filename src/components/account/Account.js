
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import AddContent from './../addcontent/AddContent';
import { fetchIsToken } from '../../store/authSlice';
import { fetchUser } from "../../store/userSlice";
import { fetchUserImg } from "../../store/userImgSlice";
import { fetchDeleteImg } from "../../store/userImgSlice";
import style from './Account.module.css';
import Button from "../button/Button";


const Account = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user)
    const isAllData = useSelector(state => state.allDataSlice)
    const { loading, isTokenId } = useSelector(state => state.isAuth)
    const userimg = useSelector(state => state.userimg.img)
    const id = useParams();
    console.log(userimg)

    useEffect(() => {
        dispatch(fetchIsToken())
        redirectAuth()
        dispatch(fetchUserImg(id.id))
    }, [])


    useEffect(() => {
        dispatch(fetchUser(id.id))
    }, [])

    const redirectAuth = () => {
        if (loading === 'Пользователь не авторизован') {
            navigate('/auth')
            return false;
        }
    }

    const universalFunc = (item) => {
        dispatch(fetchDeleteImg(item.id))
    }
    return (
        <div className={style.container}>

            <div className={style.containerImg}>
                {userimg.length === 0 ? <p>Фотографии отсутствуют</p> : userimg.map(item => <div key={item.id} className={style.cardImg}>

                    <img className={style.img}
                        src={require('./../../../../stock_back/img/' + item.img_original_big)} alt="картинка" />
                    <p>Теги: {item.tags}</p>
                    <Button text={'Удалить'} universalFunc={() => universalFunc(item)} />
                </div>
                )}
            </div>
            <div className={style.containerProfile}>
                {isAllData.loading != null ? <p>{isAllData.loading}</p> : null}
                {isAllData.error != null ? <p>{isAllData.error}</p> : null}
                <p>Имя: {user.map(item => item.name)}</p>
                <AddContent id={id.id} />
            </div>
        </div>
    );
}

export default Account;

