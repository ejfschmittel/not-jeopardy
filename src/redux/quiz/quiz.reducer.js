import quizTypes, {quizStates} from "./quiz.types"

const edit = {
    id: "vLPHLZCQ9U9wRykIjMQ6",
   title: "My Title",
   userId: "YpQVSfYICQgyKkBXwbC0nmVePRx2",
   categories: [
       "geography",
       "sports",
       "film",
       "science",
       "gaming",
       "history",
   ]
   /*categories: [
    {default: true, name: "geography", id: "hCdNteNLhJBPbuMSOidw"},
    {default: true, name: "sports", id: "rkXxs2HiMiY0uO2MZJmO"},
    {default: true, name: "film", id: "vlE5FtrjD490zx5X1sr0"},
    {default: true, name: "science", id: "2r0cYSHz4Qjz18AvXwXe"},
    {default: true, name: "gaming", id: "lG3AbHLcsvX3yi6OjKe3"},
    {default: true, name: "history", id: "2rDnLE7itRBh3nSUJQqc"}
   ]*/
}

const INITAL_STATE = {
    userQuizzes: [],
    userQuizzesPending: false,
    userQuizzesError: null,


    editQuizState: quizStates.EDIT_QUESTIONS,
    
    editQuiz: edit,
    editQuizPending: false,
    editQuizError: null
}



const quizReducer = (state = INITAL_STATE, action) => {
    switch(action.type){
        case quizTypes.CREATE_QUIZ_START:
        case quizTypes.SET_QUIZ_CATEGORIES_START:
        case quizTypes.SET_QUIZ_QUESTION_START:
            return { ...state, editQuizPending: true }
        case quizTypes.CREATE_QUIZ_SUCCESS:
        case quizTypes.SET_QUIZ_CATEGORIES_STUCCESS:
        case quizTypes.SET_QUIZ_QUESTION_SUCCESS:
            return {
                ...state, 
                editQuizPending: false, 
                editQuizError: null, 
                editQuiz: action.payload
            }
        case quizTypes.CREATE_QUIZ_ERROR:
        case quizTypes.SET_QUIZ_CATEGORIES_ERROR:
        case quizTypes.SET_QUIZ_QUESTION_ERROR:
            return {
                ...state,
                editQuizPending: false,
                editQuizError: action.payload
            }

        case quizTypes.SET_EDIT_QUIZ_STATE:
            return {...state, editQuizState: action.payload}

        /* FETCH USER QUIZZES  */

        case quizTypes.FETCH_USER_QUIZZES_START:
            return {...state, userQuizzesPending: true }

        case quizTypes.FETCH_USER_QUIZZES_SUCCESS:
            return {
                ...state, 
                userQuizzesPending: false,
                userQuizzesError: null,
                userQuizzes: action.payload
            }

        case quizTypes.FETCH_USER_QUIZZES_ERROR:
            return {
                ...state, 
                userQuizzesPending: false,
                userQuizzesError: action.payload,
            }
        default: return state
    }
}

export default quizReducer