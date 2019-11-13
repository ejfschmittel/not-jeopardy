import { combineReducers } from "redux"

import userReducer from "./user/user.reducer"
import categoryReducer from "./category/category.reducer"
import quizReducer from "./quiz/quiz.reducer"
import questionReducer from "./question/question.reducer"

export default combineReducers({
    userReducer, 
    categoryReducer,
    questionReducer,
    quizReducer
})