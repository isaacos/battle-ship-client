
const addTurnCounter = (turn, state) => {
  return {...state, turn: ++turn}
}

 export const battleshipReducer = (state, action) => {
  switch(action.type) {
    case 'TURN_COUNTER':
      return addTurnCounter(state.turn,  state)
    default:
      return state;
  }
}
