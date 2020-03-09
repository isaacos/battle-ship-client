import React, { useState, useContext } from 'react';
import './App.css';
import PlayerContainer from './component/PlayersContainer';
import Store from './Store';

function App() {


  return (
    <Store>
      <div className="App">
        <PlayerContainer />
      </div>
    </Store>
  );
}

export default App;
