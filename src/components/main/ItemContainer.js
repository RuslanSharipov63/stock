import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Item from './Item';
import PaginationContainer from "../pagination/PaginationContainer";
import { fetchAllData } from './../../store/allDataSlice';





const ItemContainer = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(fetchAllData())
    }, [dispatch])

    const data = useSelector(state => state.allDataSlice);

    const funcRedirect = (id) => {
        navigate(`/itempage/${id}`)
    }


    return (
        <div>
            {data.status === 'Загрузка' ? <p style={{
                width: '30px',
                margin: '10px auto',
                fontSize: '2vw'
            }}>Loading...</p> :
                <Item imgList={data} funcRedirect={funcRedirect} />}
            <PaginationContainer paramsRows={'all'}/>
        </div>
    );
}

export default ItemContainer;