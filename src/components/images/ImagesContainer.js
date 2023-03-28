import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataImages } from "../../store/imagesPageSlice";
import Item from "../main/Item";
import PaginationContainer from "../pagination/PaginationContainer";

const ImagesContainer = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchDataImages())
    }, [dispatch])

    const data = useSelector(state => state.imagesPage)
    const dataMessage = { ...data.data }

    const funcRedirect = (id) => {
        navigate(`/itempage/${id}`)
    }
    return (
        <>

            {data.status != null && data.status}
            {data.error != null && data.error}
            {dataMessage.message === 'true' ? 'Ошибка соединения с базой данных' : <Item imgList={data} funcRedirect={funcRedirect} />}
            <PaginationContainer text={'video'}/>
        </>
    );
}

export default ImagesContainer

