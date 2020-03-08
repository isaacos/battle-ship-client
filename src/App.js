import React, {useContext} from 'react';
import logo from './logo.svg';
import './App.css';
import { battleshipReducer } from './reducers'
import PlayerContainer from './component/PlayersContainer';
import Store from './Store'
import Context from './Store'

function App() {
  //const [battleshipState, dispatch] = useReducer(battleshipReducer, {turn: 1});
  //const [state, dispatch] = useContext(Context);

  return (
    <Store>
      <div className="App">
        <PlayerContainer />
      </div>
    </Store>
  );
}

export default App;
