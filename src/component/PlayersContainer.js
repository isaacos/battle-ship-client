import React, { useState, useContext } from 'react';
import Player from '../component/Player';
import {Context} from '../Store';

function PlayersContainer(){

  const [state, dispatch] = useContext(Context);
  
  return(
    <React.Fragment>
      {state.turn % 2 === 1 ?
        <Player player={'Player 1'}/>
      :
        <Player player={'Player 2'}/>
      }

    </React.Fragment>
  )
}

export default PlayersContainer;
