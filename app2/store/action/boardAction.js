export const getBoard = (difficulty) => {
  return async (dispatch) => {
    const url = `https://sugoku.herokuapp.com/board?difficulty=${difficulty}`
    const res = await fetch(url)
    const board = await res.json()
    dispatch({
      type: 'GET_BOARD',
      payload: {
        board: board.board
      }
    })
  }
}

export const getSolved = (data) => {
  return (dispatch) => {
    const url = 'https://sugoku.herokuapp.com/solve'
    fetch(url, {
      method: 'POST',
      body: data,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then(response => response.json())
      .then(response => {
        dispatch({
          type: 'GET_SOLVED',
          payload: {
            solution: response.solution
          }
        })
        dispatch({
          type: 'GET_VALIDATE',
          payload: {
            validated: 'unsolved'
          }
        })
      })
      .catch(console.warn)
  }
}

export const getValidate = (data) => {
  console.log(data);
  return (dispatch) => {
    const url = 'https://sugoku.herokuapp.com/validate'
    fetch(url, {
      method: 'POST',
      body: data,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then(response => response.json())
      .then(response => {
        dispatch({
          type: 'GET_VALIDATE',
          payload: {
            validated: response.status
          }
        })
        // console.log(response.status, 'getValidate');
      })
      .catch(console.warn)
  }
}