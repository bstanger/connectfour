import React from 'react';
import ReactDOM from 'react-dom';
import { Column } from './column.jsx';

export class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      columns: [
        ["R",0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0]
      ],
      activePlayer: "Y"
    }
  }

  /// On Click /////////////////////////

  onColumnClick(event, idx){
    this.toggleLowestSpace(event, idx);
    this.toggleActivePlayer();
  }

  toggleLowestSpace(event, idx){
    let allCols = this.state.columns.slice();
    let clickedCol = allCols[idx].slice();
    for (var i = 0; i < clickedCol.length; i++){
      let spaceValue = clickedCol[i];
      if(spaceValue === 0){
        clickedCol[i] = this.state.activePlayer;
        break;
      };
    }
    allCols[idx] = clickedCol;
    this.setState({
      columns: allCols
    })
  }

  toggleActivePlayer(){
    if(this.state.activePlayer === "R"){
      this.setState({ activePlayer: "Y"});
    } else if(this.state.activePlayer === "Y"){
      this.setState({ activePlayer: "R"});
    }
  }

  render(){
    return (
      <div className="board">
        {this.state.columns.map( (column, index) =>
          <Column column={column} onClick={this.onColumnClick.bind(this)} key={index} idx={index}/>
        )}
      </div>
    );
  }
}
