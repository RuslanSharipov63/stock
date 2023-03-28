import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPageData } from '../../store/allDataSlice';
import { fetchRows } from './../../store/rowsSlice';
import Pagination from './Pagination';

let leftOffset = 0;
let rightOffset = 0;

const PaginationContainer = (props) => {
    const dispatch = useDispatch();
    const [styleOffset, setStyleOffset] = useState({
        left: '',
        right: ''
    })
    useEffect(() => {
        dispatch(fetchRows(props.text))
    }, [dispatch])
    
    const countRows = useSelector(state => state.rows.size)

    const pageSize = 5;
    const itemsCount = Math.ceil(countRows / pageSize);
    /* максимальная длина в пикселях блока со страницами */
    let chunkItemsCount = itemsCount / 25 * 210;
    const handlePageChange = (count) => {
        dispatch(fetchPageData(count))
    }

    const onStyleChangeLeft = () => {
        /* преобразовываем строку в число нашего стейта, который потом кладется как пиксели  */
        let numberChunkItemsCount = +styleOffset.left
        if (numberChunkItemsCount > chunkItemsCount) {
            return;
        }
        if (styleOffset.left === '' && styleOffset.right === '') {
            return;
        }
        if (styleOffset.left === '0' && styleOffset.right === '0') {
            return;
        }
        rightOffset += 210;
        leftOffset -= 210;
        setStyleOffset({
            ...styleOffset,
            left: String(leftOffset),
            right: String(rightOffset)
        })
    }

    const onStyleChangeRight = () => {
        /* преобразовываем строку в число нашего стейта, который потом кладется как пиксели  */
        let numberChunkItemsCount = +styleOffset.right;

        leftOffset += 210;
        rightOffset -= 210;

        if (-numberChunkItemsCount > -chunkItemsCount) {
            return;
        }

        setStyleOffset({
            ...styleOffset,
            left: String(leftOffset),
            right: String(rightOffset)
        })

    }

    return (
        <Pagination
            itemsCount={itemsCount}
            onPageChange={handlePageChange}
            onStyleChangeLeft={onStyleChangeLeft}
            onStyleChangeRight={onStyleChangeRight}
            styleOffset={styleOffset}
        />
    )
}

export default PaginationContainer;
