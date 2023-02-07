import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchImgForId, fetchAuthorid } from "../store/allDataSlice";
import { fetchImgAuthorId } from "../store/userImgSlice";
import { } from "../store/allDataSlice";
import ItemPage from "./ItemPage";


const ItemPageContainer = () => {
    const dispatch = useDispatch();
    const params = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchImgForId(params.id))
        dispatch(fetchAuthorid(params.id))
        dispatch(fetchImgAuthorId(params.id))


    }, [dispatch, params])

    
    const imgList = useSelector(state => state.allDataSlice)
    const imgListForAuthor = useSelector(state => state.userimg.img)

    const funcRedirect = (id) => {
        navigate(`/itempage/${id}`)
    }

    return (
        <div>
            <ItemPage
                imgList={imgList}
                imgLA={imgListForAuthor}
                funcRedirect={funcRedirect}
            />
        </div>
    );
}

export default ItemPageContainer;