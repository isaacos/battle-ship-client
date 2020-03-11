import React, { useState, useContext, useEffect } from 'react';
import Row from '../component/Row';
import {Context} from '../Store';


function Grid(){

  const [state, dispatch] = useContext(Context);

  function includedCoordinate(playerBoats){
      let coordinateArray = []
      playerBoats.forEach(function(boatObj){
        const coordinates = Object.values(boatObj)[0].filter(coordinate => coordinate !== 0)
        coordinateArray = [...coordinateArray, ...coordinates]
      })
      return coordinateArray
  }

  function displayOrUpdateGridStyle(filledCoordinates, color){
    filledCoordinates.forEach(coor => document.getElementById(coor).style.backgroundColor = color)
  }



  useEffect(() => {
    const filledCoordinates = includedCoordinate(state.playerOneBoats)
    const filledCoordinatesP2 = includedCoordinate(state.playerTwoBoats)
    if(state.turn === 1){
      displayOrUpdateGridStyle(filledCoordinates, 'grey')
    } else if (state.turn === 2){
      displayOrUpdateGridStyle(filledCoordinates, 'white')

      displayOrUpdateGridStyle(filledCoordinatesP2, 'grey')
    } else if (state.turn % 2 === 1){
      displayOrUpdateGridStyle(filledCoordinatesP2, 'white')
    }


  })

  return (
    <React.Fragment >
      <div style={{display: 'flex',marginLeft: '40px' }}>
        {state.twoDArray[0].map(element => <div key={element.substring(1)} style={{width: "47px"}}>{element.substring(1)}</div>)}
      </div>
      <div onClick={e => console.log(e.target.id)}>
        {state.twoDArray.map(row => ( <Row row={row} key={row}></ Row>))}
      </div>
    </React.Fragment>
  )
}


export default Grid;
