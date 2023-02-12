import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearch } from "../../store/searchSlice";
import Item from "../main/Item";

const SearchContainer = () => {
    let navigate = useNavigate();
    const params = useParams();
    const [paramsUrl, setParamsUrl] = useState('')
    const dispatch = useDispatch();
    const data = useSelector(state => state.search)

    useEffect(() => {
        setParamsUrl(params.search);
        if (paramsUrl != '' && paramsUrl != undefined) {
            console.log(paramsUrl);
            dispatch(fetchSearch(paramsUrl));
            return;
        }
    }, [paramsUrl])

    const funcRedirect = (id) => {
        navigate(`/itempage/${id}`)
    }
    return (
        <div>
            <Item imgList={data} funcRedirect={funcRedirect} />
        </div>
    );
}

export default SearchContainer;