import { multiFieldComparator } from 'CommonUtil/CommonUtil.js';
import assert from 'assert';

describe('multiFieldComparator', () => {
    it('when sortfield is empty then comparator returns 0', () => {
        const a = {}, b = {};
        const result = multiFieldComparator([])(a, b);
        assert.equal(0, result);
    })

    it('when sortfield is not empty it will sort by prop order', () => {
        const a = { name: 'Sam' };
        const b = { name: 'John' };
        const comparator = multiFieldComparator([{ prop: 'name', direction: 1 }]);
        const result = [a, b].sort(comparator);
        assert.equal('John', result[0].name);
    })
})