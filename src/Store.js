import React, {createContext, useReducer} from 'react';
import { battleshipReducer } from './reducers';

const initialState = {
  turn: 1
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
