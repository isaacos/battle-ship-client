import React, { useContext, useState, useEffect} from 'react';
import {Context} from '../Store';
import Grid from '../component/Grid';
import BoatContainer from '../component/BoatContainer';

function Player(props) {

  const [state, dispatch] = useContext(Context);
  //functions as a key to the global state
  const [playerBoats, setPlayerBoats] = useState('playerOneBoats')

  useEffect(() => {
    if(state.turn % 2 === 0){
      setPlayerBoats('playerTwoBoats')
    } else {
      setPlayerBoats('playerOneBoats')
     }
}, [state.turn])

  function checkAllBoatCoordinatesFilled(state, player){
    if(state.turn < 3){
      let array = []
      state[playerBoats].forEach(function(boat){
          array = [...array, ...Object.values(boat)[0]]
      })
      return !array.includes(0)
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
          <Grid playerBoats={state.turn % 2 === 1 ? 'playerOneBoats' : 'playerTwoBoats'} opponentBoats={state.turn % 2 === 0 ? 'playerOneBoats' : 'playerTwoBoats'}/>
        </div>
        <BoatContainer  />
      </div>
    </div>
  )
}

export default Player;
