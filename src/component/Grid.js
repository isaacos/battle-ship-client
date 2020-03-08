import React, { useState, useContext } from 'react';
import Row from '../component/Row';

function Grid(){

  const letters = 'ABCDEFGHIJ'.split('')

  const array = letters.map(function(letter){
    let i = 1
    let row = []
    while(i < letters.length + 1){
      row.push(letter + i)
      i++
    }
    return row
  })

  return (
    <React.Fragment >
      <div style={{display: 'flex',marginLeft: '40px' }}>
        {array[0].map(element => <div key={element.substring(1)} style={{width: "47px"}}>{element.substring(1)}</div>)}
      </div>
        {array.map(row => ( <Row row={row} key={row}></ Row>))}
    </React.Fragment>
  )
}


export default Grid;
