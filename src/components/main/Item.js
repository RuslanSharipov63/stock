import { useEffect } from 'react';
import style from './Item.module.css';


const Item = (props) => {

    useEffect(() => {

    }, [props.imgList])

    const imgList = props.imgList;


    return (
        <div className={style.container} >
            {imgList.data.message === false ? <p>Ничего не найдено</p> : imgList.data.map(item => <div key={item.id}
                className={style.cardItem}
                onClick={() => props.funcRedirect(item.id)}
            >
                <div className={style.wrapper}>
                    <img
                        src={require('./../../../../stock_back/img/' + item.img_original_big)}
                        alt={item.id}
                        className={style.img}
                        onContextMenu={(e) => { e.preventDefault(); return false; }}
                    />
                </div>
            </div>)}
        </div>
    );
}

export default Item;
