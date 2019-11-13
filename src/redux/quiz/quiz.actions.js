import quizTypes, {quizStates} from "./quiz.types"
import {faCreateQuiz, faSetQuizCategories, faSetQuizQuestions, faSetQuizQuestion, getUserQuizzes} from "../../firebase/firebase.actions"


const fetchUserQuizzesStart = () => ({
    type: quizTypes.FETCH_USER_QUIZZES_START
})

const fetchUserQuizzesSucces = (quizzes) => ({
    type: quizTypes.FETCH_USER_QUIZZES_SUCCESS,
    payload: quizzes
})

const fetchUserQuizzesError = (error) => ({
    type: quizTypes.FETCH_USER_QUIZZES_ERROR,
    payload: error
})

export const fetchUserQuizzes = (userId) => async dispatch => {
    dispatch(fetchUserQuizzesStart())

    getUserQuizzes(userId)
        .then(quizzes => dispatch(fetchUserQuizzesSucces(quizzes)))
        .catch(error => dispatch(fetchUserQuizzesError(error)))
}


const createQuizStart = () => ({
    type: quizTypes.CREATE_QUIZ_START
})

const createQuizSuccess = (quiz) => ({
    type: quizTypes.CREATE_QUIZ_SUCCESS,
    payload: quiz
})

const createQuizError = (error) => ({
    type: quizTypes.CREATE_QUIZ_ERROR,
    payload: error
})

export const createQuiz = (userId, title) => dispatch =>  {
    dispatch(createQuizStart())

    if(title == ""){
        dispatch(createQuizError("Quiz Title Can not be blank")); 
        return;
    }

    console.log(userId, title)
    // firebase action create Quiz => creates id, title, added_at
    faCreateQuiz({userId, title})
        .then(quiz => {
            dispatch(createQuizSuccess(quiz))
            dispatch(setEditQuizState(quizStates.EDIT_CATEGORIES))
        }).catch(error => dispatch(createQuizError(error)))
}

const setQuizCategoriesStart = () => ({
    type: quizTypes.SET_QUIZ_CATEGORIES_START
})

const setQuizCategoriesSuccess = (quiz) => ({
    type: quizTypes.SET_QUIZ_CATEGORIES_STUCCESS,
    payload: quiz
})

const setQuizCategoriesError = (error) => ({
    type: quizTypes.SET_QUIZ_CATEGORIES_ERROR,
    payload: error
})

export const setQuizCategories = (quiz, categories) => async dispatch =>  {
    dispatch(setQuizCategoriesStart())

    if(categories.length != 6){
        dispatch(setQuizCategoriesError(`A Quiz needs 6 categories ${categories.length} were given`))
        return
    } 

    faSetQuizCategories(quiz, categories)
        .then(quiz => {
            console.log(quiz)
            dispatch(setQuizCategoriesSuccess(quiz)) 
            dispatch(setEditQuizState(quizStates.EDIT_QUESTIONS))
        }).catch(error => dispatch(setQuizCategoriesError(error)))
}

export const setEditQuizState = (state) => ({
    type: quizTypes.SET_EDIT_QUIZ_STATE,
    payload: state
})


const setQuizQuestionStart = () => ({
    type: quizTypes.SET_QUIZ_QUESTION_START
})

const setQuizQuestionSuccess = (quiz) => ({
    type: quizTypes.SET_QUIZ_QUESTION_SUCCESS,
    payload: quiz
})

const setQuizQuestionError = (error) => ({
    type: quizTypes.SET_QUIZ_QUESTION_ERROR,
    payload: error
})


export const setQuizQuestion = (quiz, question) => async dispatch => {
    dispatch(setQuizQuestionError())
    // get or create question

    if(!question || !question.question || !question.answer){
        dispatch(setQuizQuestionError("Answer and Question must not be empty")); 
        return;
    }

    faSetQuizQuestion(quiz, question)
        .then(updatedQuiz => dispatch(setQuizQuestionSuccess(updatedQuiz)))
        .catch(error => dispatch(setQuizQuestionError(error)))
}

const setQuizQuestionsStart = () => ({
    type: quizTypes.SET_QUIZ_QUESTIONS_START
})

const setQuizQuestionsSuccess = (quiz) => ({
    type: quizTypes.SET_QUIZ_QUESTIONS_SUCCESS,
    payload: quiz
})

const setQuizQuestionsError = (error) => ({
    type: quizTypes.SET_QUIZ_QUESTIONS_ERROR,
    payload: error
})


export const setQuizQuestions = (quiz, questions) => async dispatch => {
    dispatch(setQuizQuestionsStart())

    const newQuestions = await createOrGetDocuments(collectionNames.QUESTIONS, questions)
        .then(questions => questions)
        .catch(error => dispatch(setQuizQuestionsError(error)))

    console.log(newQuestions)
    
    const newQuestionIds = newQuestions.map(question => question.id)
    
    /*updateDocument(collectionNames.QUIZZES, {...quiz, questions: newQuestionIds})
        .then(quiz => {
            console.log(quiz)

            const displayQuiz = {}
            newQuestions.reduce((res, question) => {
                return {
                    ...res,
                    [question.cat]
                }
            }, {})

            const newQuiz = {...quiz, questions: newQuestions}
            dispatch(setQuizQuestionsSuccess({...quiz, questions: newQuestions})) 
            //dispatch(setEditQuizState(quizStates.))
            console.log("implement redirect")
        }) .catch(error => dispatch(setQuizQuestionsError(error)))  */
}
