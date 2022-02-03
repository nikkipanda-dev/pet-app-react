import { Pagination as Paginator } from "./Pagination/Pagination";

export const Pagination = ({ currentPage, setCurrentPage, pageSize, total, children, data }) => {
    return (
        <Paginator 
            pageSize={ pageSize } 
            total={ total } 
            currentPage={ currentPage } 
            setCurrentPage={ setCurrentPage }
            data={ data }
        >
            { children }
        </Paginator>
    )
};

export default Pagination;