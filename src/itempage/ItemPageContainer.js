import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchImgForId, fetchAuthorid } from "../store/allDataSlice";
import { fetchImgAuthorId } from "../store/userImgSlice";
import { } from "../store/allDataSlice";
import ItemPage from "./ItemPage";


const ItemPageContainer = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchImgForId(params.id))
        dispatch(fetchAuthorid(params.id))
        dispatch(fetchImgAuthorId(params.id))


    }, [dispatch])

    const params = useParams();
    const imgList = useSelector(state => state.allDataSlice)
    const imgListForAuthor = useSelector(state => state.userimg.img)


    return (
        <div>
            <ItemPage
                imgList={imgList}
                imgLA={imgListForAuthor}
            />
        </div>
    );
}

export default ItemPageContainer;