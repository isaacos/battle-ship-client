import React, { useState, useContext } from 'react';
import Row from '../component/Row';
import {Context} from '../Store';


function Grid(){

  const [state, dispatch] = useContext(Context);

  return (
    <React.Fragment >
      <div style={{display: 'flex',marginLeft: '40px' }}>
        {state.twoDArray[0].map(element => <div key={element.substring(1)} style={{width: "47px"}}>{element.substring(1)}</div>)}
      </div>
        {state.twoDArray.map(row => ( <Row row={row} key={row}></ Row>))}
    </React.Fragment>
  )
}


export default Grid;
