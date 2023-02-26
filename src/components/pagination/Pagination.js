import _ from 'lodash';

const Pagination = (props) => {

    const { itemsCount, pageSize } = props;
    const pageCount = Math.ceil(itemsCount / pageSize);
    console.log(pageCount)

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