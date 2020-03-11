import React, {createContext, useReducer} from 'react';
import { battleshipReducer } from './reducers';

//10 letter length
const letters = 'ABCDEFGHIJ'.split('')

//creates letter 2D array
const twoDArray = letters.map(function(letter){
  let i = 1
  let row = []
  while(i < letters.length + 1){
    row.push(letter + i)
    i++
  }
  return row
})

const initialState = {
  twoDArray: twoDArray,
  letters: letters,
  turn: 1,
  playerOneBoats: [{"Carrier": [0, 0, 0, 0, 0]}, {"Patrol Boat": [0, 0]}],
  playerTwoBoats: [{"Carrier": [0, 0, 0, 0, 0]}, {"Patrol Boat": [0, 0]}],
  selectedBoat: []
}


const Store = ({children}) => {
  const [state, dispatch] = useReducer(battleshipReducer, initialState);

  return (
    <Context.Provider value={[state, dispatch]} >
      {children}
    </Context.Provider>
  )
}

export const Context = createContext(initialState);
export default Store;
