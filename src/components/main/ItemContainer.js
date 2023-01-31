import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Item from './Item';
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
            {data.status == 'loading' ? <p style={{
                width: '30px',
                margin: '10px auto',
                fontSize: '2vw'
            }}>Loading...</p> :
                <Item imgList={data} funcRedirect={funcRedirect} />}
        </div>
    );
}

export default ItemContainer;