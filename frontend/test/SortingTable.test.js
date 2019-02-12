import SortingTable from 'MyTable/SortingTable.js'
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15.4';
import React from 'react';
import assert from 'assert';
import reducer from '../components/MyTable/MyReducer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

configure({ adapter: new Adapter() });

let store;
describe('SortingTable', () => {

    let wrapper;
    beforeEach(() => {
        store = createStore(reducer);
        wrapper = mount(
            <Provider store={store}>
                <SortingTable></SortingTable>
            </Provider>);
    })

    it('when #score is click SortingTable will sort by score', () => {

        const score = wrapper.find(SortingTable)
            .find('table').find('thead').find('tr').find('#score');
        score.simulate('click')
        const state = store.getState();
        assert.equal(state.rows[0].score, 8);
        assert.equal(state.rows[1].score, 12);
        assert.equal(state.rows[2].score, 12);
        assert.equal(state.rows[3].score, 55);
        assert.equal(state.rows[4].score, 55);
    })




})


