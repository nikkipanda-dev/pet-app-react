import { ContainerIdx } from "../../../core/Container";
import Span from "../../../core/Span";

export const Pagination = ({ paginationClass, paginationStyle, currentPage, setCurrentPage, setChunkedPosts, pageSize, total, data }) => {
    try {
        if (total !== 0) {
            const chunkPosts = page => {
                const minIndex = (page * pageSize) - pageSize;
                const maxIndex = (page * pageSize);
                const totalPages = Math.ceil(total / pageSize);

                if (maxIndex > total && (page === totalPages)) {
                    setChunkedPosts(data.slice(minIndex));
                } else {
                    setChunkedPosts(data.slice(minIndex, maxIndex));
                }
            }

            const handlePreviousPage = evt => {
                let prevPage = parseInt(evt.target.dataset.target, 10);

                if (!(prevPage <= 1)) {
                    chunkPosts(--prevPage);
                    setCurrentPage(prevPage);
                }
            }

            const handleNextPage = evt => {
                let nextPage = parseInt(evt.target.dataset.target, 10);

                if (!(nextPage >= Math.ceil(total / pageSize))) {
                    chunkPosts(++nextPage);
                    setCurrentPage(nextPage);
                }
            }

            return (
                data ?
                    <ContainerIdx
                        type='regular'
                        containerClass={paginationClass}
                        containerStyle-={paginationStyle}>
                        <Span
                            type='regular'
                            text='Prev'
                            spanClass='paginator'
                            spanOnclick={handlePreviousPage}
                            dataTarget={currentPage} />
                        <Span type='regular' text={currentPage} />
                        <Span
                            type='regular'
                            text='Next'
                            spanClass='paginator'
                            spanOnclick={handleNextPage}
                            dataTarget={currentPage} />
                    </ContainerIdx> : ''
            )
        }
    } catch (err) {
        console.log('Err in pagination: ', err);
    }
};
