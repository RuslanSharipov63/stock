import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import style from './AddContent.module.css';
import Button from "../button/Button";
import { fetchAddContent } from "../../store/userImgSlice";

const AddContent = (props) => {
    const dispatch = useDispatch();
    const selectFile = useRef(null);
    const [tags, setTags] = useState('')
    const [newFile, setNewFile] = useState(null)
    const [preView, setPreView] = useState(null)
    const isLodaing = useSelector(state => state.allDataSlice.status)
    const isError = useSelector(state => state.allDataSlice.error)

    const addFile = (e) => {
        e.preventDefault();

        if (!newFile) {
            alert('Файл не выбран')
            return;
        };
        if (tags === '') {
            alert('Пропишите теги')
            return;
        }

        const content = {
            id: props.id,
            tags: tags.replace(/,/g, " "),
            img: newFile
        }
        console.log(content)
        dispatch(fetchAddContent(content))

    }

    const handleFile = (e) => {
        e.preventDefault();
        setNewFile(e.target.files[0])
        setPreView(URL.createObjectURL(e.target.files[0]))

    }

    const uploadFile = (e) => {
        e.preventDefault();
        selectFile.current.click();
    }


    return (
        <div className={style.container}>
            {isLodaing != null ? <p>{isLodaing}</p> : null}
            {isError != null ? <p> {isError}</p> : null}

            <p>Выберите картинку (png, jpg, gif)</p>
            <Button text={'Загрузить'} universalFunc={uploadFile} />
            <div className={style.inpFileDiv}>
                <input
                    className={style.hidden}
                    type="file"
                    ref={selectFile}
                    onChange={(e) => handleFile(e)}
                    accept="image/*, .png, .jpg, .gif,"
                />
            </div>
            <p>Теги</p>
            <div className={style.inpDiv}>
                <input
                    className={style.inp}
                    type="text"
                    name="tags"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                />
            </div>
            <Button
                text={'Добавить'}
                universalFunc={addFile}
            />
            {
                newFile && (
                    <ul>
                        <li>Название файла: {newFile.name}</li>
                        <li>Тип: {newFile.type}</li>
                        <li>Размер: {newFile.size} байт</li>
                        <img src={preView} style={{ width: '200px' }} />
                    </ul>

                )
            }
        </div >
    );
}

export default AddContent;