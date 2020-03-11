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
      if(state.turn === 3){
        displayOrUpdateGridStyle(filledCoordinatesP2, 'white')
      }
    }
  })

  function clickHandler(event){
    if(state.turn > 2 && event.target.id){
      const coordinate = event.target.id
      const opponentBoats = (state.turn % 2 === 1) ? state.playerTwoBoats : state.playerOneBoats
      const opponentBoatLocation = includedCoordinate(opponentBoats)
      if(!opponentBoatLocation.includes(coordinate)){
        logMiss(coordinate)
      } else {
        logHit(coordinate, opponentBoats)
      }
    }
  }

  function logMiss(coordinate){
    let element = document.getElementById(coordinate)
    dispatch({type: 'LOG_MISS', coordinate: coordinate})
    element.style.backgroundColor = "blue"
  }

  function logHit(coordinate, opponentsBoats){
    const boatsUpdated = opponentsBoats.map(function(boat){
      const objValue = Object.values(boat)[0]
      if(objValue.includes(coordinate)){
        const key = Object.keys(boat)[0]
        const newValues = objValue.filter(coor => coor !== coordinate)
        let newBoat = new Object
        newBoat[key] = newValues
        if(newValues.length === 0){
          alert(`You sunk ${key}`)
        }
        return newBoat

      } else {
        return boat
      }
    })
    dispatch({type: 'LOG_HIT', coordinate: coordinate,  boats: boatsUpdated})

  }

  return (
    <React.Fragment >
      <div style={{display: 'flex',marginLeft: '40px' }}>
        {state.twoDArray[0].map(element => <div key={element.substring(1)} style={{width: "47px"}}>{element.substring(1)}</div>)}
      </div>
      <div onClick={e => clickHandler(e)}>
        {state.twoDArray.map(row => ( <Row row={row} key={row}></ Row>))}
      </div>
    </React.Fragment>
  )
}


export default Grid;
