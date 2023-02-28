import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Item from './Item';
import Pagination from "../pagination/Pagination";
import { fetchAllData } from './../../store/allDataSlice';
import { fetchRows } from "../../store/rowsSlice";

const ItemContainer = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllData())

    }, [dispatch])

    useEffect(() => {
        dispatch(fetchRows('all'))
    }, [dispatch])

    const data = useSelector(state => state.allDataSlice);
    const countRows = useSelector(state => state.rows.size)
    const count = data.data.length;
    const pageSize = 5;
    const itemsCount = Math.ceil(count / pageSize);

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
                itemsCount={itemsCount}
                onPageChange={handlePageChange}
                countRows={countRows}
            />
        </div>
    );
}

export default ItemContainer;