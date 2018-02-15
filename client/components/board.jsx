import React from 'react';
import ReactDOM from 'react-dom';
import { Column } from './column.jsx';

export class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      columns: [
        ["R",0,0,0,0,0,0],
        ["R",0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        ["Y",0,0,0,0,0,0],
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
      this.checkForFourRepeats(rowToCheck);
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

  // convertColumnsDataToRows(){
  //   let columnArr = this.state.columns;
  //   let newRowsData = [];
  //   for(var row = 0; row < columnArr.length; row++){
  //     let newRow = [];
  //     for (var col = columnArr[row].length - 1; col >= 0; col--){
  //       newRow.push(columnArr[col][row]);
  //     }
  //     newRowsData.push(newRow);
  //   }
  //   return newRowsData;
  // }

  createRowToCheck(rowHtIdx){
    let currentRow = [];
    for (var col = 0; col < this.state.columns.length; col++){
      currentRow.push(this.state.columns[col][rowHtIdx]);
    }
    console.log(currentRow);
    return currentRow;
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
