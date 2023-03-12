import style from './Pagination.module.css'
import { useEffect } from 'react';

const Pagination = (props) => {

    useEffect(() => {
    }, [props])

    const { left, right } = props.styleOffset;
    const leftStyle = right != '' ? right + "px" : null;
    const rightStyle = left != '' ? left + "px" : null;

    let arrayPage = []

    for (let i = 1; i <= props.itemsCount; i++) {
        arrayPage.push(
            <p className={style.page}
                key={`page${i}`}
                onClick={() => props.onPageChange(i)}>
                {i}
            </p>)
    }

    return (
        <div className={style.container}>
            <div
                className={style.left}
                onClick={props.onStyleChangeLeft}

            >&laquo;</div>
            <div className={style.wrapper}>
                <div className={style.pagination}
                    style={{
                        left: leftStyle,
                        right: rightStyle
                    }}
                >
                    {arrayPage}
                </div>
            </div>
            <div
                className={style.right}
                onClick={props.onStyleChangeRight}
            >&raquo;</div>
        </div >
    );
}

export default Pagination;