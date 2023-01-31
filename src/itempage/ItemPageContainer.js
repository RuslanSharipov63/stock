import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllData } from "../store/allDataSlice";
import ItemPage from "./ItemPage";

const ItemPageContainer = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAllData())

    }, [])
    const params = useParams();
    const imgList = useSelector(state => state.allDataSlice)
    const imgItem = imgList.data.find(item => item.id == params.id)
    

    return (
        <div>
            <ItemPage imgItem={imgItem} />
        </div>
    );
}

export default ItemPageContainer;