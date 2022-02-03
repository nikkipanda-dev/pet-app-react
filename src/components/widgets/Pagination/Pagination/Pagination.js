import { ContainerIdx } from "../../../core/Container";
import { BtnIdx } from "../../../core/Button";

export const Pagination = ({ currentPage, setCurrentPage, pageSize, total, data, children }) => {
    // console.log('pagesize: ', pageSize);
    // console.log('total: ', total);
    // console.log('data: ', data);
    // console.log('children: ', children);
    // console.log('currentPage: ', currentPage);

    // const page

    // TODO: MIN: ( pageNum * 1 ) - 1;
        // ( 2 * 10 ) - 1 = 19
    // TODO: MAX: ( pageNum * pageSize ) - 1;
        // ( 2 * 10 ) - 10 = 10
    // TODO: num of pages
    // if chunked.len < 10

    return (
        <ContainerIdx className="py-5">
            {/* Pagination { pageSize } { total } */}
            { children }
            <BtnIdx type='regular' text='pageNum' btnClass='mt-5'/>
        </ContainerIdx>
    )
};
