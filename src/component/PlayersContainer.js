import React, { useContext } from 'react';
import Player from '../component/Player';
import {Context} from '../Store';

function PlayersContainer(){

  const [state] = useContext(Context);

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
