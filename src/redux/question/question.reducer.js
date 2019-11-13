import questionTypes from "./question.types"

const INITIAL_STATE = {
    addQuestionPending: false,
    addQuestionError: null,
    addedQuestion: null,

    defaultQuestions: null,
    fetchDefaultQuestionsPending: false,
    fetchDefaultQuestionsError: null,
}

const questionReducer = (state=INITIAL_STATE, action) => {
    switch(action.type){
        case questionTypes.ADD_QUESTION_PENDING:
            return {...state, addQuestionPending: true}
        case questionTypes.ADD_QUESTION_SUCCESS:
            return {
                ...state, 
                addQuestionPending: false, 
                addedQuestion: action.payload,
                addQuestionError: null
            }
        case questionTypes.ADD_QUESTION_ERROR:      
            return {...state, addQuestionPending: false, addQuestionError: action.payload}

        //  FETCH DEFAULT QUESTIONS  
        case questionTypes.FETCH_DEFAULT_QUESTIONS_PENDING:
            return {...state, fetchDefaultQuestionsPending: true}
        case questionTypes.FETCH_DEFAULT_QUESTIONS_SUCCESS:
            return {
                ...state, 
                fetchDefaultQuestionsPending: false, 
                defaultQuestions: action.payload,
                fetchDefaultQuestionsError: null
            }
        case questionTypes.FETCH_DEFAULT_QUESTIONS_ERROR:            
            return {...state, fetchDefaultQuestionsPending: false, fetchDefaultQuestionsError: action.payload}

        default: return state
    }
}

export default questionReducer