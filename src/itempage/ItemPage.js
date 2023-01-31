import Button from '../components/button/Button';
import Item from '../components/main/Item';


import style from './ItemPage.module.css';

const ItemPage = (props) => {
  

    const imgitem = props.imgItem;

    return (
        <div className={style.container}>
            <div className={style.imgContainer}>
                <div className={style.waterBig}>
                    <img
                        className={style.imgBig}
                        src={imgitem.img_water_big}
                        alt={imgitem.author}
                    />
                </div>
                <div className={style.waterSmall}>
                    <img
                        className={style.imgSmall}
                        src={imgitem.img_water_small}
                        alt={imgitem.title}
                    />
                </div>
            </div>
            <div className={style.dataContainer}>
                <p>Автор: Руслан Шарипов</p>
                <p>Теги: {imgitem.tags}</p>
                <Button text={'Купить'} />
            </div>
        </div>


    );
}

export default ItemPage;