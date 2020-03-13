
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
        if(state.selectedBoatName === Object.keys(boat)[0]){
          let obj = {}
          const key = Object.keys(boat)[0]
          obj[key] = coordinateArray
          return obj
        } else {
          return boat
        }
      })
      return {...state, playerOneBoats: playerOneBoats, selectedBoat: [], selectedBoatName: null}
    }
    if(state.turn === 2){
      const playerTwoBoats = state.playerTwoBoats.map(function(boat){
          if(state.selectedBoatName === Object.keys(boat)[0]){
            let obj = {}
            const key = Object.keys(boat)[0]
            obj[key] = coordinateArray
            return obj
          } else {
            return boat
          }
        })
        return {...state, playerTwoBoats: playerTwoBoats, selectedBoat: [], selectedBoatName: null}
    }
    else {
      return {...state}
    }
  }

  const logMiss = (state, coordinate) => {
    if(state.turn % 2 === 1){
      const missesArray = [...state.playerOneShots[0], coordinate]
      const hitsArray = [...state.playerOneShots[1]]
      const playerOneShots = [ missesArray, hitsArray ]
      return {...state, playerOneShots: playerOneShots}
    } else {
      const missesArray = [...state.playerTwoShots[0], coordinate]
      const hitsArray = [...state.playerTwoShots[1]]
      const playerTwoShots = [ missesArray, hitsArray ]
      return {...state, playerTwoShots: playerTwoShots}
    }
  }

  const logHit = (state, coordinate, boats) => {
    if(state.turn % 2 === 1){
      const hitsArray = [...state.playerOneShots[1], coordinate]
      const missesArray = [...state.playerOneShots[0]]
      const playerOneShots = [ missesArray, hitsArray ]
      return {...state, playerOneShots: playerOneShots, playerTwoBoats: boats}
    } else {
      const hitsArray = [...state.playerTwoShots[1], coordinate]
      const missesArray = [...state.playerTwoShots[0]]
      const playerTwoShots = [ missesArray, hitsArray ]

      return {...state, playerTwoShots: playerTwoShots, playerOneBoats: boats}
    }
  }


 export const battleshipReducer = (state, action) => {
  switch(action.type) {
    case 'TURN_COUNTER':
      return addTurnCounter(state.turn,  state)
    case 'SELECT_BOAT':
      return {...state, selectedBoat: Object.values(action.selectedBoat)[0], selectedBoatName: Object.keys(action.selectedBoat)[0]}
    case 'INPUT_BOAT_COORDINATE':
      return {...state, selectedBoat: selectedBoatCoordinate(state, action.coordinate, action.index)}
    case 'UPDATE_PLAYER_BOATS':
      return updatePlayerBoats(state, action.coordinateArray)
    case 'LOG_MISS':
      return logMiss(state, action.coordinate)
    case 'LOG_HIT':
      return logHit(state, action.coordinate, action.boats)
    default:
      return state;
  }
}
