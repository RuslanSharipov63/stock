import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getImageSize } from 'react-image-size';
import Button from '../components/button/Button';
import style from './ItemPage.module.css';
import { fetchDownload } from '../store/downloadSlice';

const ItemPage = (props) => {

    const [size, setSize] = useState({
        widthImg: 0,
        heightImg: 0,
    })
    const dispatch = useDispatch();
    const { status, error, imgOne, author } = props.imgList;
    const imageOne = { ...imgOne[0] }

    const imgla = props.imgLA;
    let a = JSON.stringify(imgOne);
    let b = a.split('"');
    const c = b.find(i => i.includes('.'))

    async function main() {
        const { width, height } = await getImageSize(require('./../../../stock_back/img/' + c));
        setSize({
            ...size,
            widthImg: width,
            heightImg: height
        })

    }

    useEffect(() => {
        main()

    }, [props.imgList, props.imgLA])

    const downloadFunc = () => {
        dispatch(fetchDownload(imageOne.img_original_big))
    }


    return (
        <div className={style.containerBig}>

            <div className={style.container}>
                <div className={style.imgContainer}>
                    {status != null ? status : null}
                    {imgOne.length === 0 ? <p>Загрузка...</p> :

                        <div className={style.cardImg}
                            key={imageOne.id}
                        >
                            <img
                                className={style.imgBig}
                                src={require('./../../../stock_back/img/' + imageOne.img_original_big)}
                                alt="фото"
                                onContextMenu={(e) => { e.preventDefault(); return false; }}
                            />
                            <p>Ширина <span>{size.widthImg}</span> px высота <span>{size.heightImg}</span> px
                            </p>
                            <p>Теги: {imageOne.tags}</p>
                        </div>
                    }
                </div>
                {status != null ? status : null}
                {error != null ? error : null}
                {author.map(item =>
                    < div className={style.dataContainer} key={item.name}>
                        <p>Автор: {item.name}</p>
                        <Button text={'Купить'} />
                        <Button
                            universalFunc={downloadFunc}
                            text={'Скачать'}
                        />
                    </div>
                )}

            </div >
            <p className={style.text}>Другие фотографии автора</p>
            <div className={style.containerImgAuthor}>

                {imgla.length === 0 ? <p>Загрузка...</p> : imgla.map(item => <div
                    className={style.cardImgAuthor}
                    onClick={() => props.funcRedirect(item.id)}
                    key={item.id}
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