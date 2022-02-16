
export const createEvent = ({ name, atendees, color, time, notes }) => async (dispatch) => {
  dispatch({
    type: 'event/CREATE_EVENT',
    payload: { name, atendees, color, time, notes }
  })
}
