import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getImageSize } from 'react-image-size';
import Button from '../components/button/Button';
import style from './ItemPage.module.css';
import { fetchDownload } from '../store/downloadSlice';
import regExtension from '../regexp/regExtension';


const ItemPage = (props) => {
    const [nameImage, setNameImage] = useState(null)
    const [extensionState, setExtensionState] = useState('')
    const [sizeMb, setSizeMb] = useState(0);
    const [size, setSize] = useState({
        widthImg: 0,
        heightImg: 0,
    })

    const dispatch = useDispatch();
    const { status, error, imgOne, author } = props.imgList;

    const imageOne = { ...imgOne[0] }
    const imgla = props.imgLA;

    const nameImageFunc = () => {
        setNameImage(null)
        let a = JSON.stringify(imgOne);
        let b = a.split('"');
        const c = b.find(i => i.includes('.'))
        setNameImage(c)
    }
    async function main() {
      await  setSize({
            ...size,
            widthImg: 0,
            heightImg: 0
        })
        const arrForExtension = await nameImage.split('.');
        if (regExtension.test(nameImage) != false) {
            const { width, height } = await getImageSize(require('./../../../stock_back/img/' + nameImage));
            setSize({
                ...size,
                widthImg: width,
                heightImg: height
            })
        }
        const extension = await arrForExtension[arrForExtension.length - 1];
        setExtensionState(extension);
        setSizeMb(imageOne.size / 1000000);
    }
    

    useEffect(() => {
        if (imgOne.length != 0) {
            nameImageFunc()
        }
        if (nameImage != null || nameImage != undefined) {
            main();

        }
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
                            {regExtension.test(imageOne.img_original_big) ?
                                <img
                                    className={style.imgBig}
                                    src={require('./../../../stock_back/img/' + imageOne.img_original_big)}
                                    alt="фото"
                                    onContextMenu={(e) => { e.preventDefault(); return false; }}
                                /> : <video
                                    src={require('./../../../stock_back/img/' + imageOne.img_original_big)}
                                    className={style.imgBig}
                                    controls="controls"
                                    onContextMenu={(e) => { e.preventDefault(); return false; }}
                                ></video>}
                            <p>Теги: {imageOne.tags}</p>
                        </div>
                    }
                </div>
                {status != null ? status : null}
                {error != null ? error : null}
                {author.map(item =>
                    < div className={style.dataContainer} key={item.name}>
                        <p>размер <span>{sizeMb.toFixed(2)}</span> Мб </p>
                        <p>расширение <span>{extensionState}</span></p>
                        {size.widthImg != 0 ? <div>
                            <p> ширина
                                <span > {size.widthImg} </span> px
                            </p>
                            <p>высота
                                <span> {size.heightImg} </span> px
                            </p> </div> : null}
                        <p>Автор: {item.name}</p>
                        <Button text={'Купить'} />
                        <Button
                            universalFunc={downloadFunc}
                            text={'Скачать'}
                        />
                    </div>
                )
                }

            </div >
            <p className={style.text}>Другие работы автора</p>
            <div className={style.containerImgAuthor}>

                {imgla.length === 0 ? <p>Ничего не найдено</p> : imgla.map(item => <div
                    className={style.cardImgAuthor}
                    onClick={() => props.funcRedirect(item.id)}
                    key={item.id}
                >
                    {regExtension.test(item.img_original_big) ?
                        <img
                            className={style.imgAuthor}
                            src={require('./../../../stock_back/img/' + item.img_original_big)}
                            alt="фотография"
                            onContextMenu={(e) => { e.preventDefault(); return false; }}
                        /> : <video
                            src={require('./../../../stock_back/img/' + item.img_original_big)}
                            className={style.imgAuthor}
                            controls="controls"
                            onContextMenu={(e) => { e.preventDefault(); return false; }}
                        ></video>}
                </div>)}
            </div>
        </div >
    );
}

export default ItemPage;