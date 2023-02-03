import { useEffect, useState } from 'react';
import Button from '../components/button/Button';
import style from './ItemPage.module.css';


const ItemPage = (props) => {

 
    const imglist = props.imgList;
    const imgI = imglist.data.find(item => item.id == props.params.id)


    useEffect(() => {
        
    }, [props.imgList])

    console.log(imglist)
  
    return (
        <div className={style.container}>
            <div className={style.imgContainer}>
                <div className={style.waterBig}>
                    <img
                        className={style.imgBig}
                        src={require('./../../../../timefiles/stock_back/img/' + imgI.img_original_big)}
                        alt={imgI.author}
                    />
                </div>
            </div>
            <div className={style.dataContainer}>
                <p>Автор: {imgI.author}</p>
                <p>Теги: {imgI.tags}</p>
                <Button text={'Купить'} />
            </div>
        </div>


    );
}

export default ItemPage;