const calcPaginationData = ({total, page, perPage}) => {
    const totalPages = Math.ceil((total/perPage))
    const hasNextPages = page < totalPages;
    const hasPreviousPages = page > 1;
    
    return {
        totalPages,
        hasNextPages,
        hasPreviousPages,
    }
}

export default calcPaginationData;