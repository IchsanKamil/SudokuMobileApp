const initialState = {
  board: [],
  solution: [],
  validated: 'unsolved'
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_BOARD':
      return { ...state, board: action.payload.board }
  
    case 'GET_SOLVED':
      return { ...state, solution: action.payload.solution }
  
    case 'GET_VALIDATE':
      return { ...state, validated: action.payload.validated }
  
    default:
      return state
  }
}