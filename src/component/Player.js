import React, { useState, useContext } from 'react';
import { battleshipReducer } from '../reducers';
import {Context} from '../Store';
import Grid from '../component/Grid'

function Player(props) {

  const [state, dispatch] = useContext(Context);
  return(
    <div>
      <h1>{props.player}'s Turn</h1>
      <button onClick={() => dispatch({type: 'TURN_COUNTER'})}>
        Click me
      </button>
      <Grid />
    </div>
  )
}

export default Player;
