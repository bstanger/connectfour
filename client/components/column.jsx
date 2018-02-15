import React from 'react';
import ReactDOM from 'react-dom';
import { Space } from './space.jsx';

// let column = (props) => {
//   <div className="board__col"></div>
// };
//
// export default column;


// export Column = (props) => (
//   <div className="board__col"></div>
// );

export class Column extends React.Component {
  constructor(props){
    super(props);
  }
  render(props){
    return (
      <div className="board__col" onClick={() => this.props.onClick(event, this.props.idx)}>
        {this.props.column.map( (space, index) =>
            <Space space={space} key={index}/>
        )}
      </div>
    );
  }
}
