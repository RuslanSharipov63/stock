import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataVideos } from "../../store/videosPageSlice";
import Item from "../main/Item";

const VideosContainer = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchDataVideos())
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
        </>
    );
}

export default VideosContainer

