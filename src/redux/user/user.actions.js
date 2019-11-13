import userTypes from "./user.types"

export const setCurrentUser = (user) => ({
    type: userTypes.SET_CURRENT_USER,
    payload: user
})

export const signOut = (auth) => dispatch => {
    auth.signOut()
    dispatch(setCurrentUser(null))
}