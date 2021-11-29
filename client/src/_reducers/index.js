import { combineReducers } from 'redux';
import user from './user_reducer';

// useReducer better than useState for large complex objects
// How to use useReducer/combineReducers
// https://www.youtube.com/watch?v=9boMnm5X9ak&list=PLC3y8-rFHvwheJHvseC3I0HuYI2f46oAK&index=2 (part 1 of 30)
const rootReducer = combineReducers({
    user,
});

export default rootReducer;