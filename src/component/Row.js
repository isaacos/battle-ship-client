import React from 'react';
import Square from '../component/Square';

function Row(props){

  return(
    <React.Fragment>
      <div style={{display: 'flex'}}>
        <div style={{width: '40px'}}>{props.row[0][0]}</div>
        {props.row.map(element => ( <Square  key={element}></ Square>))}
      </div>
    </React.Fragment>
  )
}

export default Row;
