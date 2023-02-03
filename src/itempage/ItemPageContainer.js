import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllData } from "../store/allDataSlice";
import ItemPage from "./ItemPage";

const ItemPageContainer = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllData())

    }, [dispatch])

    const params = useParams();
    const imgList = useSelector(state => state.allDataSlice)
   
    

    return (
        <div>
            <ItemPage imgList={imgList} params={params}/>
        </div>
    );
}

export default ItemPageContainer;