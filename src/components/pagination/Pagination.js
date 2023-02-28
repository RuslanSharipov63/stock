import _ from 'lodash';
import { useEffect } from 'react';

const Pagination = (props) => {

    useEffect(() => {

    }, [props])

    console.log(props.itemsCount)


    return (
        <div>
            <ul className="pagination">
                <li className="pageItem">
                    <a className="pageLink">1</a>
                </li>
            </ul>
        </div>
    );
}

export default Pagination;