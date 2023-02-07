import { useEffect } from 'react';
import Button from '../components/button/Button';
import style from './ItemPage.module.css';

const ItemPage = (props) => {


    const { status, error, imgOne, author } = props.imgList;
    const imgla = props.imgLA;

    useEffect(() => {

    }, [props.imgList, props.imgLA])


    return (
        <div className={style.containerBig}>

            <div className={style.container}>
                <div className={style.imgContainer}>
                    {status != null ? status : null}
                    {imgOne.length === 0 ? <p>Ошибка сервера</p> :
                        imgOne.map(item =>
                            <div className={style.cardImg}
                                key={item.id}
                            >
                                <img
                                    className={style.imgBig}
                                    src={require('./../../../stock_back/img/' + item.img_original_big)}
                                    alt="фото"
                                    onContextMenu={(e) => { e.preventDefault(); return false; }}
                                />
                                <p>Теги: {item.tags}</p>
                            </div>
                        )}
                </div>
                {status != null ? status : null}
                {error != null ? error : null}
                {author.map(item =>
                    < div className={style.dataContainer} key={item.name}>
                        <p>Автор: {item.name}</p>
                        <Button text={'Купить'} />
                    </div>
                )}

            </div >
            <p className={style.text}>Другие фотографии автора</p>
            <div className={style.containerImgAuthor}>

                {imgla.length === 0 ? <p>Ошибка сервера</p> : imgla.map(item => <div
                    className={style.cardImgAuthor}
                    onClick={() => props.funcRedirect(item.id)}
                >
                    <img
                        className={style.imgAuthor}
                        src={require('./../../../stock_back/img/' + item.img_original_big)}
                        alt="фотография"
                        onContextMenu={(e) => { e.preventDefault(); return false; }}
                    />
                </div>)}
            </div>
        </div>
    );
}

export default ItemPage;