const parseNumber = (value, defaultValue) => {
    if (typeof value !== "string") return defaultValue;

    const parsedValue = parseInt(value);

    if(Number.isNaN(parsedValue)) return defaultValue;

    return parsedValue;
}


const pasrePaginationParams = ({page, perPage}) => {
    const parsePage = parseNumber(page, 1);
    const parsePerPage = parseNumber(perPage, 10);

    return {
        page: parsePage,
        perPage: parsePerPage
    }
}

export default pasrePaginationParams;