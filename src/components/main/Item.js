import { useEffect } from 'react';
import style from './Item.module.css';
import regExtension from '../../regexp/regExtension';


const Item = (props) => {

    useEffect(() => {
    }, [props.imgList])

    const imgList = props.imgList;

    return (
        <div className={style.container} >

            {imgList.data.map(item => <div
                key={item.id}
                className={style.cardItem}
                onClick={() => props.funcRedirect(item.id)}
            >
                <div className={style.wrapper} >
                    {regExtension.test(item.img_original_big) ? <img
                        src={require('./../../../../stock_back/img/' + item.img_original_big)}
                        alt={item.id}
                        className={style.img}
                        onContextMenu={(e) => { e.preventDefault(); return false; }}
                    /> : <video
                        src={require('./../../../../stock_back/img/' + item.img_original_big)}
                        className={style.img}
                        controls="controls"
                        onContextMenu={(e) => { e.preventDefault(); return false; }}
                    ></video>}
                </div>
            </div>)}
        </div>

    );
}

export default Item;
