const rows = [
    { id: 105, name: 'b', family: 'abc', score: 8 },
    { id: 102, name: 'g', family: 'def', score: 12 },
    { id: 103, name: 'c', family: 'tom', score: 55 },
    { id: 104, name: 'x', family: 'sam', score: 100 },
    { id: 101, name: 'b1', family: 'tim', score: 55 },
    { id: 99, name: 'a', family: 'david', score: 12 }
];

const defaultSortOrder = { name: 0, family: 0, id: 0, score: 0 };

import { multiFieldComparator } from '../CommonUtil/CommonUtil.js';

function reducer(state = {}, action) {

    const { prop, newDirection } = action;
    let sortColumn, sortDirections, rows2, index;
    switch (action.type) {

        case 'RESET_COLUMN':

            index = state.sortColumn.findIndex(a => a.prop === prop);
            sortColumn = state.sortColumn.slice();
            if (index > -1) {
                sortColumn.splice(index, 1);
            }
            sortDirections = Object.assign({}, state.sortDirections, { [prop]: 0 });
            rows2 = rows.slice();
            rows2.sort(multiFieldComparator(sortColumn));
            return { rows: rows2, sortColumn, sortDirections };

        case 'SET_NEW_DIRECTION':

            sortColumn = [{ prop, direction: newDirection }];
            sortDirections = Object.assign({}, defaultSortOrder, { [prop]: newDirection });

            rows2 = rows.slice();
            rows2.sort(multiFieldComparator(sortColumn));
            return { rows: rows2, sortDirections, sortColumn };

        case 'ADD_NEW_DIRECTION':

            sortColumn = state.sortColumn.slice();
            //if pressing alt on already pressed column , then ignore
            index = sortColumn.findIndex(a => a.prop === prop);
            if (index > -1) {
                sortColumn[index] = { prop, direction: newDirection };
            } else {
                sortColumn.push({ prop, direction: newDirection });
            }
            sortDirections = Object.assign({}, state.sortDirections, { [prop]: newDirection });
            rows2 = state.rows.slice();
            rows2.sort(multiFieldComparator(sortColumn));
            return { rows: rows2, sortDirections: sortDirections, sortColumn };

        case 'RESET':
            break;
    }

    return { rows: rows.slice(), sortDirections: Object.assign({}, defaultSortOrder), sortColumn: [] };
}

export default reducer;
