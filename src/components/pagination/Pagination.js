import style from './Pagination.module.css'
import { useEffect } from 'react';

const Pagination = (props) => {

    useEffect(() => {
    }, [props])


    let arrayPage = []

    for (let i = 1; i <= props.itemsCount; i++) {
        arrayPage.push(
            <li className={style.page}
                key={`page${i}`}
                onClick={() => props.onPageChange(i)}>
                {i}
            </li>)
    }

    return (
        <>
            <ul className={style.pagination}>
                {arrayPage}
            </ul>

        </>
    );
}

export default Pagination;