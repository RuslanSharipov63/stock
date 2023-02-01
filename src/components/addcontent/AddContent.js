import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import style from './AddContent.module.css';
import Button from "../button/Button";
import { fetchAddContent } from "../../store/allDataSlice";

const AddContent = (props) => {
    const dispatch = useDispatch();
    const selectFile = useRef(null);
    const [tags, setTags] = useState('')
    const [newFile, setNewFile] = useState(null)
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
            tags: tags,
            img: newFile
        }
        console.log(content)
        dispatch(fetchAddContent(content))

    }

    const handleFile = (e) => {
        setNewFile(e.target.files[0])

    }

    const uploadFile = () => {
        selectFile.current.click();
    }


    return (
        <div className={style.container}>
            {isLodaing != null ? <p>{isLodaing}</p> : null}
            {isError != null ? <p> {isError}</p> : null}

            <p>Выберите картинку (png, jpg, gif)</p>
            <Button text={'Загрузить'} universalFunc={uploadFile} />
            {/* <button onClick={uploadFile}>Загрузить</button> */}
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
            {/* <button onClick={(e) => addFile(e)}>Добавить</button> */}
            {
                newFile && (
                    <ul>
                        <li>Название файла: {newFile.name}</li>
                        <li>Тип: {newFile.type}</li>
                        <li>Размер: {newFile.size} байт</li>
                    </ul>
                )
            }
        </div >
    );
}

export default AddContent;