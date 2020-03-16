import React, { useContext, useEffect } from 'react';
import {Context} from '../Store';



function Square(props){

  const [state, dispatch] = useContext(Context);


  function handleMouseDown(coordinate){
    if(state.selectedBoat){
      dispatch({type: 'INPUT_BOAT_COORDINATE', coordinate: coordinate, index: 0})
    }
  }

  function handleMouseEnter(coordinate){
    let boatCoordinates;
    //prevents error from coordinate being undefined
    if(state.selectedBoat[0] && state.selectedBoat[0] !== 0 && coordinate){
      //get selectedBoat coordinate array
      boatCoordinates = [...state.selectedBoat]
      //checks if it is in the same row
      if(boatCoordinates[0][0] === coordinate[0]){
        boatCoordinates = updateBoatCoordinatesSharedRow(coordinate, boatCoordinates)
      } else {
        boatCoordinates = updateBoatCoordinatesSharedColumn(coordinate, boatCoordinates)
      }
      if(boatCoordinates !== undefined && arraysElementsOverlap(props.playersBoatLocation, boatCoordinates)){
        state.selectedBoat.filter(coor => coor !== 0).forEach(coor => document.getElementById(coor).classList.remove('selected'))
        dispatch({type: 'UPDATE_SELECTED_BOAT', selectedCoordinates: boatCoordinates })
      }
    }
  }

  function handleMouseUp(){
    if(!state.selectedBoat.includes(0)){
      state.selectedBoat.filter(coor => coor !== 0).forEach(coor => document.getElementById(coor).classList.remove('selected'))
      dispatch({type: 'UPDATE_PLAYER_BOATS', coordinateArray: state.selectedBoat})
    }
  }

  function arraysElementsOverlap(arrayOne, arrayTwo){
    const sharedElements = arrayOne.filter(element => arrayTwo.includes(element))
    if(sharedElements.length === 0){
      return true
    } else {
      return false
    }
  }

  function updateBoatCoordinatesSharedColumn(coordinate, boatCoordinates){
    const firstCoordinateLetter = boatCoordinates[0][0]
    const secondCoordinateLetter = coordinate[0]
    const firstCoordinateNum = boatCoordinates[0].substring(1)
    const firstLetterIndex = state.letters.indexOf(firstCoordinateLetter)
    //return undefined if selected boat would go out of the boundaries of the grid
    if(firstCoordinateLetter < secondCoordinateLetter && firstLetterIndex + state.selectedBoat.length > state.letters.length){
      return
    } else if(firstCoordinateLetter > secondCoordinateLetter && firstLetterIndex - state.selectedBoat.length < 0){
      return
    }  else {
        boatCoordinates =  boatCoordinates.map(function(coor, index){
          if(firstCoordinateLetter < secondCoordinateLetter){
            coor = state.letters[firstLetterIndex + index] + firstCoordinateNum
          } else {
            coor = state.letters[firstLetterIndex - index] + firstCoordinateNum
          }
          return coor
        })
      return boatCoordinates
    }
  }

  function updateBoatCoordinatesSharedRow(coordinate, boatCoordinates){
    //gets shared letter
    const firstLetter = coordinate[0]
    let num = parseInt(boatCoordinates[0].substring(1)) + 1
    //accounts for numbers depricating
    if(num > parseInt(coordinate.substring(1))){
      if((num - boatCoordinates.length) <= 0 ){return }
      boatCoordinates = boatCoordinates.map(function(element){
        num = num - 1
        return firstLetter + num
      })
    } else {
      num = num - 2
      if((num + boatCoordinates.length) > state.twoDArray[0].length){return }
      boatCoordinates = boatCoordinates.map(function(element){
        num = num + 1
        return firstLetter + num
      })
    }
    return boatCoordinates
  }


  return(
    <div id={props.coordinate} onMouseDown={() => handleMouseDown(props.coordinate) } onMouseUp={() => handleMouseUp()} onMouseEnter={() => handleMouseEnter(props.coordinate)} className="square">
    </div>
  )
}


export default Square;
