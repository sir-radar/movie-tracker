export const resetErrorStatus = () => ({
  type: 'RESET_ERROR_STATUS'
});

//resets favouriteAction and watchlistAction errors
export function resetStatus() {
  return (dispatch) => {
    dispatch(resetErrorStatus())
  }
}