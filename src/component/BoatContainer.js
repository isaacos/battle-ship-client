import React, { useState, useContext } from 'react';
import {Context} from '../Store';

function BoatContainer(){

  const [state, dispatch] = useContext(Context)

  function displayBoats(playerBoats){
    return playerBoats.map(function(boat){
      if(Object.values(boat)[0].includes(0)){
        return <div onClick={() => dispatch({type: 'SELECT_BOAT', selectedBoat: boat})} key={Object.keys(boat)[0]}>{Object.keys(boat)[0]} length {Object.values(boat)[0].length}</div>
      }
    })
  }

  console.log(state)
  return(
    <div>
      {state.turn === 1 ?
        displayBoats(state.playerOneBoats)
      :
        displayBoats(state.playerTwoBoats)
      }
    </div>
  )
}

export default BoatContainer;
