import React, { useState, useContext } from 'react';
import {Context} from '../Store';
import Grid from '../component/Grid';
import BoatContainer from '../component/BoatContainer';

function Player(props) {

  const [state, dispatch] = useContext(Context);
  return(
    <div>
      <h1>{props.player}'s Turn</h1>
      <button onClick={() => dispatch({type: 'TURN_COUNTER'})}>
        Click me
      </button>
      <Grid />
      <BoatContainer  />
    </div>
  )
}

export default Player;
