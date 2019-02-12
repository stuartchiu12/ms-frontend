import React from 'react';
import { connect, Provider } from 'react-redux';
import {
  Button,
  ButtonToolbar,
  ButtonGroup
} from 'react-bootstrap';

import {
  getRoutePath
} from 'CommonUtil/CommonUtil.js';

import SortingTable from 'MyTable/SortingTable.js';
import MyModal from 'MyModal/MyModal.js';

import reducer from '../MyTable/MyReducer.js';
import { createStore } from 'redux';

const store = createStore(reducer);

export class Sample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  showMyModal() {
    console.log('showMyModal called');
    this.props.showMyModal();
  }

  render() {
    return (
      <div>
        <h1>Components samples</h1>
        <ButtonGroup>
          <Button onClick={() => this.context.router.push(getRoutePath()) } >Goto Dashboard</Button>
        </ButtonGroup>
        <h2>Modal, Button toolbar:</h2>
        <ButtonToolbar>
          <ButtonGroup>
            <Button onClick={this.showMyModal.bind(this) }>Show my modal</Button>
          </ButtonGroup>
        </ButtonToolbar>
        <h2>Table:</h2>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-12">
              <Provider store={store}>
                <SortingTable />
              </Provider>
            </div>
          </div>
        </div>
        <MyModal />
      </div>
    );
  }
}

// latest way to dispatch
Sample.contextTypes = {
    // @see https://github.com/grommet/grommet/issues/441
  router: React.PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return({
    showMyModal: function() {
      return dispatch({
        type: 'EVT_SHOW_MY_MODAL',
        showMyModal: true
      });
    }
  });
}

export default connect(
  function (storeState) {
    // store state to props
    return {
    };
  },
  mapDispatchToProps
)(Sample);