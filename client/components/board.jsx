import React from 'react';
import ReactDOM from 'react-dom';
import { Column } from './column.jsx';

export class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      columns: [
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0]
      ],
      activePlayer: "Y",
      winner: ""
    }
  }

  /// On Click /////////////////////////

  onColumnClick(idx){
    this.toggleLowestSpace(idx);
    this.toggleActivePlayer();
  }

  toggleLowestSpace(idx){
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
    this.setState(
      { columns: allCols },
      () => this.checkForWinsOrTies(idx) // as callback bc setState is async
    )
    console.log('Columns updated! ', this.state.columns);
  }

  toggleActivePlayer(){
    if(this.state.activePlayer === "R"){
      this.setState({ activePlayer: "Y"});
    } else if(this.state.activePlayer === "Y"){
      this.setState({ activePlayer: "R"});
    }
  }

  // Check for Win ////////////////////////

  checkForWinsOrTies(idx){
    this.checkColumnsForWin(idx);
  }

  checkColumnsForWin(idx){
    let currentCol = this.state.columns[idx];
    let firstColor = currentCol[0];
    let streakCount = 1;
    for (var i = 1; i < currentCol.length; i++){
      if(currentCol[i] === 0){
        break;
      }
      if (currentCol[i] === firstColor){
        streakCount++;
        if (streakCount > 3){
          this.recordWinner(firstColor);
          break;
        }
      } else {
        firstColor = currentCol[i];
        streakCount = 1;
      }
    };
  }

  recordWinner(winner){
    this.setState({winner: winner});
  }


  // Render //////////////////////////////

  render(){
    let announcementClass = (this.state.winner === "") ? "announcement" : "announcement is-shown";
    return (
      <div className= "board-wrap">
        <div className="board">
          {this.state.columns.map( (column, index) =>
            <Column column={column} onClick={this.onColumnClick.bind(this)} key={index} idx={index} />
          )}
        </div>
        <div className={announcementClass}>{this.state.winner} wins!</div>
      </div>
    );
  }
}
