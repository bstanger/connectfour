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
    let rowHtIdx;
    for (var i = 0; i < clickedCol.length; i++){
      let spaceValue = clickedCol[i];
      if(spaceValue === 0){
        rowHtIdx = i;
        clickedCol[i] = this.state.activePlayer;
        break;
      };
    }
    allCols[idx] = clickedCol;
    this.setState(
      { columns: allCols },
      () => this.checkForWinsOrTies(idx, rowHtIdx) // as callback bc setState is async
    )
    console.log('Columns updated! ');
  }

  toggleActivePlayer(){
    if(this.state.activePlayer === "R"){
      this.setState({ activePlayer: "Y"});
    } else if(this.state.activePlayer === "Y"){
      this.setState({ activePlayer: "R"});
    }
  }

  // Check for Win ////////////////////////

  checkForWinsOrTies(colIdx, rowHtIdx){
    let columnToCheck = this.state.columns[colIdx];
    let rowToCheck = this.createRowToCheck(rowHtIdx);
    if(!this.checkForFourRepeats(columnToCheck)){
      if(!this.checkForFourRepeats(rowToCheck)){
        let upDiagonalToCheck = this.createUpwardsDiagonalToCheck(colIdx, rowHtIdx);
        let downDiagonalToCheck = this.createDownwardsDiagonalToCheck(colIdx, rowHtIdx);
        if(!this.checkForFourRepeats(upDiagonalToCheck)){
          this.checkForFourRepeats(downDiagonalToCheck);
        }
      }
    };
  }

  checkForFourRepeats(rowOrCol){
    let firstColor = rowOrCol[0];
    let streakCount = 1;
    for (var i = 1; i < rowOrCol.length; i++){
      if(rowOrCol[i] === 0){
        break;
      }
      if (rowOrCol[i] === firstColor){
        streakCount++;
        if (streakCount > 3){
          this.recordWinner(firstColor);
          return true;
        }
      } else {
        firstColor = rowOrCol[i];
        streakCount = 1;
      }
    };
    return false;
  }

  createUpwardsDiagonalToCheck(colIdx, rowHtIdx){
    let diagonalArr = [];
    let currentRowHt = rowHtIdx - colIdx;
    let currentCol = 0;
    let highestRow = this.state.columns[0].length - 1;
    while(currentCol < this.state.columns.length){
      if(currentRowHt >= 0){
        diagonalArr.push(this.state.columns[currentCol][currentRowHt]);
      }
      ++currentCol;
      ++currentRowHt;
    }
    return diagonalArr;
  }

  createDownwardsDiagonalToCheck(colIdx, rowHtIdx){
    let diagonalArr = [];
    let currentRowHt = rowHtIdx + colIdx;
    let currentCol = 0;
    let highestRow = this.state.columns[0].length - 1;
    while(currentCol < this.state.columns.length){
      if(currentRowHt <= highestRow && currentRowHt >= 0){
        diagonalArr.push(this.state.columns[currentCol][currentRowHt]);
      }
      ++currentCol;
      --currentRowHt;
    }
    return diagonalArr;
  }

  createRowToCheck(rowHtIdx){
    let currentRow = [];
    for (var col = 0; col < this.state.columns.length; col++){
      currentRow.push(this.state.columns[col][rowHtIdx]);
    }
    return currentRow;
  }

  recordWinner(winner){
    this.setState({winner: winner});
  }


  // Render //////////////////////////////

  render(){
    let announcementClass = (this.state.winner === "") ? "announcement" : "announcement is-shown";
    let winnerName = (this.state.winner === "R") ? "Red" : "Yellow";
    if(this.state.winner === "R"){
      announcementClass += " is-red";
    } else if (this.state.winner === "Y"){
      announcementClass += " is-yellow";
    }
    return (
      <div className= "board-wrap">
        <div className="board">
          {this.state.columns.map( (column, index) =>
            <Column column={column} onClick={this.onColumnClick.bind(this)} key={index} idx={index} />
          )}
        </div>
        <div className={announcementClass}>{winnerName} wins!</div>
      </div>
    );
  }
}
