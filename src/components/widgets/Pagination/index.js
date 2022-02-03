import { Pagination as Paginator } from "./Pagination/Pagination";

export const Pagination = ({ currentPage, setCurrentPage, setChunkedPosts, pageSize, total, data }) => {
    return (
        <Paginator 
            pageSize={ pageSize } 
            total={ total } 
            currentPage={ currentPage } 
            setCurrentPage={ setCurrentPage } 
            setChunkedPosts={ setChunkedPosts }
            data={ data } />
    )
};

export default Pagination;