import React, { useState, useContext, useEffect } from 'react';
import Row from '../component/Row';
import {Context} from '../Store';


function Grid(){

  const [state, dispatch] = useContext(Context);
  const [playersBoatLocation, setPlayersBoatLocation] = useState(includedCoordinate([]))

  function includedCoordinate(playerBoats){
      let coordinateArray = []
      playerBoats.forEach(function(boatObj){
        const coordinates = Object.values(boatObj)[0].filter(coordinate => coordinate !== 0)
        coordinateArray = [...coordinateArray, ...coordinates]
      })

      return coordinateArray
  }

  useEffect(() => {
    if(state.turn > 2){
      const opponentsBoatLocations = state.turn % 2 ===1 ? includedCoordinate(state.playerTwoBoats) : includedCoordinate(state.playerOneBoats)
      if(opponentsBoatLocations.length === 0){ alert('You Won')}
    }

  }, [state.turn, state.playerOneBoats, state.playerTwoBoats])

  function displayOrUpdateGridStyle(filledCoordinates, color){
    filledCoordinates.forEach(coor => document.getElementById(coor).style.backgroundColor = color)
  }

  useEffect(() => {
    const playerBoats = state.turn === 1 ? state.playerOneBoats : state.playerTwoBoats

    setPlayersBoatLocation(includedCoordinate(playerBoats))
  }, [state.turn, state.playerOneBoats, state.playerTwoBoats])

  useEffect(() => {
    const filledBoatCoordinates = includedCoordinate(state.playerOneBoats)
    const filledBoatCoordinatesP2 = includedCoordinate(state.playerTwoBoats)
    if(state.turn === 1){
      displayOrUpdateGridStyle(filledBoatCoordinates, 'grey')
    } else if (state.turn === 2){
      displayOrUpdateGridStyle(filledBoatCoordinates, 'white')

      displayOrUpdateGridStyle(filledBoatCoordinatesP2, 'grey')
    } else if (state.turn % 2 === 1){
      //removes the player two's boats from displaying
      if(state.turn === 3){
        displayOrUpdateGridStyle(filledBoatCoordinatesP2, 'white')
      }
      displayOrUpdateGridStyle(state.playerTwoShots[0], 'white')
      displayOrUpdateGridStyle(state.playerTwoShots[1], 'white')
      displayOrUpdateGridStyle(state.playerOneShots[0], 'blue')
      displayOrUpdateGridStyle(state.playerOneShots[1], 'red')
    }
    else if (state.turn % 2 === 0 ){
      displayOrUpdateGridStyle(state.playerOneShots[0], 'white')
      displayOrUpdateGridStyle(state.playerOneShots[1], 'white')
      displayOrUpdateGridStyle(state.playerTwoShots[0], 'blue')
      displayOrUpdateGridStyle(state.playerTwoShots[1], 'red')
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
    dispatch({type: 'LOG_MISS', coordinate: coordinate})
    nextTurnDelay(3000)
  }

  function logHit(coordinate, opponentsBoats){
    const boatsUpdated = opponentsBoats.map(function(boat){
      const objValue = Object.values(boat)[0]
      if(objValue.includes(coordinate)){
        const key = Object.keys(boat)[0]
        const newValues = objValue.filter(coor => coor !== coordinate)
        let newBoat = {}
        newBoat[key] = newValues
        //alerts that ship sunk
        if(newValues.length === 0){
          alert(`You sunk ${key}`)
        }
        return newBoat

      } else {
        return boat
      }
    })
    dispatch({type: 'LOG_HIT', coordinate: coordinate,  boats: boatsUpdated})
    nextTurnDelay(3000)
  }

  function nextTurnDelay(time){
    setTimeout(function(){
      dispatch({type: 'TURN_COUNTER'})
    }, time)
  }

  return (
    <React.Fragment >
      <div style={{display: 'flex',marginLeft: '40px' }}>
        {state.twoDArray[0].map(element => <div key={element.substring(1)} style={{width: "47px"}}>{element.substring(1)}</div>)}
      </div>
      <div onClick={e => clickHandler(e)}>
        {state.twoDArray.map(row => ( <Row playersBoatLocation={playersBoatLocation} row={row} key={row}></ Row>))}
      </div>
    </React.Fragment>
  )
}


export default Grid;
