
const addTurnCounter = (turn, state) => {
  return {...state, turn: ++turn}
}

const selectedBoatCoordinate = (state, coordinate, index) => {
  //gets selected boat's array and maps the coordinate to the specific index
  return state.selectedBoat.map(function(element, i){
    if(i === index){
      return coordinate
    } else {
      return 0
    }
  })
}

const updatePlayerBoats = (state, coordinateArray) => {
  if(state.turn === 1){
    const playerOneBoats = state.playerOneBoats.map(function(boat){
        if(state.selectedBoat.length === Object.values(boat)[0].length){
          let obj = new Object
          const key = Object.keys(boat)[0]
          obj[key] = coordinateArray
          return obj
        } else {
          return boat
        }
      })
      console.log()
      return {...state, playerOneBoats: playerOneBoats, selectedBoat: []}
    }
    if(state.turn === 2){
      const playerTwoBoats = state.playerTwoBoats.map(function(boat){
          if(state.selectedBoat.length === Object.values(boat)[0].length){
            let obj = new Object
            const key = Object.keys(boat)[0]
            obj[key] = coordinateArray
            return obj
          } else {
            return boat
          }
        })
        console.log()
        return {...state, playerTwoBoats: playerTwoBoats, selectedBoat: []}
    }
  }


 export const battleshipReducer = (state, action) => {
  switch(action.type) {
    case 'TURN_COUNTER':
      return addTurnCounter(state.turn,  state)
    case 'SELECT_BOAT':
      return {...state, selectedBoat: Object.values(action.selectedBoat)[0]}
    case 'INPUT_BOAT_COORDINATE':
      return {...state, selectedBoat: selectedBoatCoordinate(state, action.coordinate, action.index)}
    case 'UPDATE_PLAYER_BOATS':
      return updatePlayerBoats(state, action.coordinateArray)
    default:
      return state;
  }
}
