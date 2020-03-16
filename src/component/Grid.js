import React, { useState, useContext, useEffect } from 'react';
import Row from '../component/Row';
import {Context} from '../Store';


function Grid(props){

  const [state, dispatch] = useContext(Context);
  const [playersBoatLocation, setPlayersBoatLocation] = useState(includedCoordinate([]));
  const [shots, setShots] = useState(1)

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
      const opponentsBoatLocations = includedCoordinate(state[props.opponentBoats])
      if(opponentsBoatLocations.length === 0){
        alert('You Won')
        window.location.reload(false)
      }
    }
  }, [state.turn, state.playerOneBoats, state.playerTwoBoats])

  function displayOrUpdateGridStyle(filledCoordinates, color){
    filledCoordinates.forEach(coor => document.getElementById(coor).style.backgroundColor = color)
  }

  useEffect(() => {
    const playerBoats = state[props.playerBoats]
    setPlayersBoatLocation(includedCoordinate(playerBoats))
  }, [state.turn, state.playerOneBoats, state.playerTwoBoats])

  useEffect(() => {
    const playerBoatsCoordinates = includedCoordinate(state[props.playerBoats])
    const opponentBoatsCoordinates = includedCoordinate(state[props.opponentBoats])

    if(state.turn < 3){
      displayOrUpdateGridStyle(opponentBoatsCoordinates, 'white')
      displayOrUpdateGridStyle(playerBoatsCoordinates, 'grey')
    } else {
      if(state.turn === 3){
        displayOrUpdateGridStyle(opponentBoatsCoordinates, 'white')
      }
      const playerShots = props.playerBoats.replace('Boats', 'Shots')
      const opponentShots = props.opponentBoats.replace('Boats', 'Shots')
      displayOrUpdateGridStyle(state[opponentShots][0], 'white')
      displayOrUpdateGridStyle(state[opponentShots][1], 'white')
      displayOrUpdateGridStyle(state[playerShots][1], 'red')
      displayOrUpdateGridStyle(state[playerShots][0], 'blue')
    }
  }, [state.turn, state.playerOneBoats, state.playerTwoBoats, props.playerBoats, props.opponentBoats])

  useEffect(() => {
      const selectedBoatCoordinates = state.selectedBoat.filter(element => element !==0)
      selectedBoatCoordinates.forEach(function(coor){
        document.getElementById(coor).classList.add("selected")
      })
  }, [state.selectedBoat])

  function clickHandler(event){
    if(state.turn > 2 && event.target.id && shots === 1){
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
    document.getElementById(coordinate).style.backgroundColor = 'blue'
    dispatch({type: 'LOG_MISS', coordinate: coordinate})
    nextTurnDelay(1000)
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
    nextTurnDelay(1000)
  }

  function nextTurnDelay(time){
    setShots(0) //prevents player from hitting two ships in one turn
    setTimeout(function(){
      dispatch({type: 'TURN_COUNTER'})
    }, time)
  }

  useEffect(() => {
    if(state.turn > 2){
      setShots(1)
    }
  }, [state.turn])

  return (
    <React.Fragment >
      <div style={{display: 'flex',marginLeft: '40px' }}>
        {state.twoDArray[0].map(element => <div key={element.substring(1)} style={{width: "47px"}}>{element.substring(1)}</div>)}
      </div>
      <div onClick={e => clickHandler(e)} >
        {state.twoDArray.map(row => ( <Row playersBoatLocation={playersBoatLocation} row={row} key={row}></ Row>))}
      </div>
    </React.Fragment>
  )
}


export default Grid;
