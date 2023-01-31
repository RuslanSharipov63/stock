import { useEffect } from 'react';
import style from './Item.module.css';


const Item = (props) => {

    useEffect(() => {

    }, [props.imgList])

    const imgList = props.imgList;

    return (
        <div className={style.container} >
            {imgList.data.map(item => <div key={item.id}
                className={style.cardItem}
                onClick={() => props.funcRedirect(item.id)}
            >
                {/* <div className={style.wrapper}> */}
                    <img src={require('./../../../../back_stock/imgwater/' + item.img_water_big)} alt={item.id} className={style.img} />
                </div>
            /* </div> */)}
        </div>
    );
}

export default Item;
