import React, { useState, useContext } from 'react';
import Player from '../component/Player';
import {Context} from '../Store'

function PlayersContainer(){

  const [state, dispatch] = useContext(Context);
  return(
    <>
      <div style={ (state.turn % 2) === 1 ? {display:'block'} :  {display:'none'}}>
        <Player player={'Player 1'}/>
      </div>
      <div style={ (state.turn % 2) === 0 ? {display:'block'} :  {display:'none'}}>
        <Player player={'Player 2'}/>
      </div>
    </>
  )
}

export default PlayersContainer;
