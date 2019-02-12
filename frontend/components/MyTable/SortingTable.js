import React from 'react';
import { connect } from 'react-redux';

class SortingHeader extends React.Component {

  render() {

    const ulStyle = { listStyle: 'none', display: 'inline', paddingLeft: 0 };
    let arrows;
    if (!this.props.direction) {
      arrows = (
        <ul style={ulStyle}>
          <li>▵</li><li>▿</li>
        </ul>);
    } else if (this.props.direction > 0) {
      arrows = (<ul style={ulStyle}>
        <li>▴</li><li>▿</li>
      </ul>)
    } else {
      arrows = (<ul style={ulStyle}>
        <li>▵</li><li>▾</li>
      </ul>)
    }


    return (<th id={this.props.prop} style={{ 'width': '70px', verticalAlign: 'top', height: '10px', border: '1px solid black' }}
      onClick={(event) => {
        this.props.sortRow(this.props.prop, event.ctrlKey, this.props.direction);
      }}>

      <span>{this.props.label}</span>{arrows}

    </th>);
  }
}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {

  function sortRow(prop, ctrlPressed, direction) {
    let newDirection;
    if (direction === 0) {
      newDirection = 1;
    } else if (direction === 1) {
      newDirection = -1;
    } else {
      newDirection = 0;
    }

    if (newDirection === 0) {
      if (ctrlPressed) {
        dispatch({ type: 'RESET_COLUMN', prop, newDirection });
      } else {
        dispatch({ type: 'RESET', prop, newDirection });
      }
    } else {
      if (ctrlPressed) {
        dispatch({ type: 'ADD_NEW_DIRECTION', prop, newDirection });
      } else {
        dispatch({ type: 'SET_NEW_DIRECTION', prop, newDirection });
      }
    }
  }

  return { sortRow };
}

class SortingTableOrig extends React.Component {

  render() {
    return (
      <table cellPadding="10">
        <thead>
          <tr>
            <SortingHeader label="ID" prop="id" sortRow={this.props.sortRow} direction={this.props.sortDirections['id']}></SortingHeader>
            <SortingHeader label="Name" prop="name" sortRow={this.props.sortRow} direction={this.props.sortDirections['name']}></SortingHeader>
            <SortingHeader label="Family" prop="family" sortRow={this.props.sortRow} direction={this.props.sortDirections['family']}></SortingHeader>
            <SortingHeader label="Score" prop="score" sortRow={this.props.sortRow} direction={this.props.sortDirections['score']}></SortingHeader>
          </tr>
        </thead>
        <tbody>
          {this.props.rows.map(r => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.name}</td>
              <td>{r.family}</td>
              <td>{r.score}</td>
            </tr>
          ))}

        </tbody>
      </table>
    );
  }
}

const SortingTable = connect(mapStateToProps, mapDispatchToProps)(SortingTableOrig);
export default SortingTable;