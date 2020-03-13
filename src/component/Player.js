import React, { useContext } from 'react';
import {Context} from '../Store';
import Grid from '../component/Grid';
import BoatContainer from '../component/BoatContainer';

function Player(props) {

  const [state, dispatch] = useContext(Context);

  function checkAllBoatCoordinatesFilled(state, player){
    if(state.turn < 3){
      if(player === 'Player 1'){
        let array = []
        state.playerOneBoats.forEach(function(boat){
            array = [...array, ...Object.values(boat)[0]]
        })
        return !array.includes(0)
      } else {
        let array = []
        state.playerTwoBoats.forEach(function(boat){
            array = [...array, ...Object.values(boat)[0]]
        })
        return !array.includes(0)
      }
    }
  }

  return(
    <div>
      <h1>{props.player}'s Turn</h1>
      {checkAllBoatCoordinatesFilled(state, props.player) ?
        <button onClick={() => dispatch({type: 'TURN_COUNTER'})}>
        Finalize Boat Placement
        </button>
        :
        <div></div>
      }
      <div style={{display: 'flex'}}>
        <div>
          <Grid />
        </div>
        <BoatContainer  />
      </div>
    </div>
  )
}

export default Player;
