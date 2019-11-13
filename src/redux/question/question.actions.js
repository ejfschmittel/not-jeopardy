import questionTypes from "./question.types"
import {faGetOrCreateQuestion, faGetDefaultQuestions} from "../../firebase/firebase.actions"

const addQuestionStart = () => ({
    type: questionTypes.ADD_QUESTION_PENDING
})

const addQuestionSuccess = (question) => ({
    type: questionTypes.ADD_QUESTION_SUCCESS,
    payload: question
})

const addQuestionError = (error) => ({
    type: questionTypes.ADD_QUESTION_ERROR,
    payload: error
})

export const createQuestion = (question) =>  async (dispatch) => {
    dispatch(addQuestionStart())
    console.log("addQuestion")

    if(!question.question || !question.answer){
        dispatch(addQuestionError("All Questions must consist of question and Answer"))
        return
    } 
    
    faGetOrCreateQuestion(question)
        .then(question => dispatch(addQuestionSuccess(question)))
        .catch(error => console.log(error))
    
}

const fetchDefaultQuestionsStart = () => ({
    type: questionTypes.FETCH_DEFAULT_CATEGORIES_PENDING
})

const fetchDefaultQuestionsSuccess = (categories) => ({
    type: questionTypes.FETCH_DEFAULT_CATEGORIES_SUCCESS,
    payload: categories
})

const fetchDefaultQuestionsError = (error) => ({
    type: questionTypes.FETCH_DEFAULT_CATEGORIES_ERROR,
    payload: error
})

export const fetchDefaultQuestions = () => async (dispatch) => {
    dispatch(fetchDefaultQuestionsStart())

    faGetDefaultQuestions()
        .then(questions => dispatch(fetchDefaultQuestionsSuccess(questions)))
        .catch(error => dispatch(fetchDefaultQuestionsError(error)))
}