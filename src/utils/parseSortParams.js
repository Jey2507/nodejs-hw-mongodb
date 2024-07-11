import { sortOrderList } from "../constants/index.js";

const parseSortParams = ({sortOrder, sortBy}, fieldList) => {
    const parseSortOrder = sortOrderList.includes(sortOrder) ? sortOrder : sortOrderList[0];
    const parseSortBy = fieldList.includes(sortBy) ? sortBy : fieldList[0];

    return {
        sortBy: parseSortBy,
        sortOrder: parseSortOrder,
    }
}

export default parseSortParams;