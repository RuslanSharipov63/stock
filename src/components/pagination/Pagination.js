import _ from 'lodash';

const Pagination = (props) => {

    const { itemsCount, pageSize } = props;
    const pageCount = Math.ceil(itemsCount / pageSize);
    const pages = _.range(1, pageCount + 1)
    console.log(pages)

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