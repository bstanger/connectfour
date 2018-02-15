import React from 'react';
import ReactDOM from 'react-dom';

export class Space extends React.Component {
  constructor(props){
    super(props);
    // this.selectedClass = (props.space === "R") ? "board__space is-red" : "board__space";

  }
  render(){
    let selectedClass = "board__space";
    if(this.props.space === "R"){
      selectedClass += " is-red";
    } else if (this.props.space === "Y"){
      selectedClass += " is-yellow";
    }
    return (
      <div className={selectedClass}></div>
    );
  }
}
