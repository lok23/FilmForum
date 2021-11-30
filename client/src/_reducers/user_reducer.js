// reducers are where the state is modified
const user = (state={},action) => {
    switch(action.type){
        case 'register_user':
            return {...state, register: action.payload }
        case 'login_user':
            return { ...state, loginSuccess: action.payload }
        case 'auth_user':
            return {...state, userData: action.payload }
        case 'profile_user':
            return {...state, userData: action.payload }
        case 'logout_user':
            return {...state }
        default:
            return state;
    }
}

export default user;