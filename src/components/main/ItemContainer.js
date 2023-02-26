import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Item from './Item';
import Pagination from "../pagination/Pagination";
import { fetchAllData } from './../../store/allDataSlice';

const ItemContainer = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllData())

    }, [dispatch])

    const data = useSelector(state => state.allDataSlice);
    const count = data.data.length;
    const pageSize = 4;

    const handlePageChange = (pageIndex) => {
        console.log('page ', pageIndex)
    }

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
            <Pagination
                itemsCount={count}
                pageSize={pageSize}
                onPageChange={handlePageChange}
            />
        </div>
    );
}

export default ItemContainer;