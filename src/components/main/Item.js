import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import style from './Item.module.css';
import regExtension from '../../regexp/regExtension';


const Item = (props) => {

    const { ref, inView } = useInView({
        threshold: 0.5
    })

    useEffect(() => {
    }, [props.imgList])

    const imgList = props.imgList;
    console.log(inView)
    return (
        <div className={style.container} >

            {imgList.data.map(item => <div
                key={item.id}
                ref={ref}
                className={style.cardItem}
                onClick={() => props.funcRedirect(item.id)}
            >
                <div className={style.wrapper} >
                 {  regExtension.test(item.img_original_big) ? <img
                        src={require('./../../../../stock_back/img/' + item.img_original_big)}
                        alt={item.id}
                        className={style.img}
                        onContextMenu={(e) => { e.preventDefault(); return false; }}
                    /> : <video
                        src={require('./../../../../stock_back/img/' + item.img_original_big)}
                        className={style.img}
                        controls="controls"
                        onContextMenu={(e) => { e.preventDefault(); return false; }}
                    ></video> }
                </div>
            </div>
            )}
        </div>

    );
}

export default Item;
