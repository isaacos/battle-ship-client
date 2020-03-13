import React, { useContext } from 'react';
import {Context} from '../Store';

function BoatContainer(){

  const [state, dispatch] = useContext(Context)

  function displayBoats(playerBoats){
    const boats = playerBoats.map(function(boat){
      if(Object.values(boat)[0].includes(0)){
        return <div onClick={() => dispatch({type: 'SELECT_BOAT', selectedBoat: boat})} key={Object.keys(boat)[0]}>{Object.keys(boat)[0]} length {Object.values(boat)[0].length}</div>
      }
    })
    return boats
  }

  return(
    <div>
      <ol style={{textAlign: 'left'}}>
        <li>Select Boat from list below</li>
        <li>Click on initial coordinate and move mouse to place boat facing the remaing coordinates</li>
        <li>Repeat first two steps until all boats are placed then push button to submit</li>
        <li style={state.turn > 2 ? {color: 'green', fontSize: 'large'} : {color: 'black'}}>Click coordinate to fire on that location</li>
      </ol>
      {state.turn === 1 ?
        displayBoats(state.playerOneBoats)
      :
        displayBoats(state.playerTwoBoats)
      }
    </div>
  )
}

export default BoatContainer;
