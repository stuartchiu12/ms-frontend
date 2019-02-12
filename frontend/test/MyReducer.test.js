import assert from 'assert';
import reducer from '../components/MyTable/MyReducer';
import { createStore } from 'redux';

let store;
describe('MyReducer', () => {

    let instance;
    beforeEach(() => {
        store = createStore(reducer);
    })

    it('when sort score once then rows will be sorted by score', () => {
        //instance.sortRow('score', false);
        store.dispatch({ type: 'SET_NEW_DIRECTION', newDirection: 1, prop: 'score' });
        const state = store.getState();
        assert.equal(state.rows[0].score, 8);
        assert.equal(state.rows[1].score, 12);
        assert.equal(state.rows[2].score, 12);
        assert.equal(state.rows[3].score, 55);
        assert.equal(state.rows[4].score, 55);
    })

    it('when sort score once and name twice state.row will sorted with score and negative name', () => {

        store.dispatch({ type: 'SET_NEW_DIRECTION', newDirection: 1, prop: 'score' });
        store.dispatch({ type: 'ADD_NEW_DIRECTION', newDirection: 1, prop: 'name' });
        let state = store.getState();
        //name a before g ASC
        assert.deepEqual({ id: 99, name: 'a', family: 'david', score: 12 }, state.rows[1]);
        assert.deepEqual({ id: 102, name: 'g', family: 'def', score: 12 }, state.rows[2]);

        store.dispatch({ type: 'ADD_NEW_DIRECTION', newDirection: -1, prop: 'name' });
        state = store.getState();

        //name g before a DESC
        assert.deepEqual({ id: 102, name: 'g', family: 'def', score: 12 }, state.rows[1]);
        assert.deepEqual({ id: 99, name: 'a', family: 'david', score: 12 }, state.rows[2]);
    })


})


