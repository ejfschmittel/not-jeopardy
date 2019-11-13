import React, {useState, useEffect, useRef} from 'react'
import {connect} from "react-redux"
import {setQuizQuestions, setQuizQuestion} from "../redux/quiz/quiz.actions"
import {faGetQuestionSuggestions} from "../firebase/firebase.actions"


import DataListInput from "./datalistinput.component"

const EditQuestionOverlay = ({category, value, question: initQuestion, hideOverlay, editQuiz, setQuizQuestion, currentUser, editQuizError, editQuizPending}) => {

    const [suggestedQuestions, setSuggestedQuestions] = useState([])
    const [isPending, setIsPending] = useState(false)


    const [question, setQuestion] = useState({
        id: null,
        default: false, 
        question: "",
        answer: "",
        value, 
        category,
    })

    useEffect(() => {
        if(!suggestedQuestions || suggestedQuestions.length == 0){
            console.log("load")
            faGetQuestionSuggestions(category, value, currentUser.id)
                .then(questions => {
                    setSuggestedQuestions(questions)
                }).catch(error => console.log(error))
        }
    }, [])

    useEffect(() => {
        if(initQuestion){
            const {id, question: questionText, answer} = initQuestion
            setQuestion({
                ...question,
                id,
                question: questionText,
                answer
            })
        }
    },[initQuestion])

    const onSetQuestion = (e) => {
       // set question on editQuiz
       // save question on firebase
       setQuizQuestion(editQuiz,{...question, userId: currentUser.id})
       setIsPending(true)
       setTimeout(() => {
           setIsPending(false);
           hideOverlay(e);
       },500)
    }

    const onChange = (e) =>  setQuestion({...question, [e.target.name]: e.target.value})

    const onChangeNew = (e, value) => {  
 
        const {id, question: questionText, answer} = value
        setQuestion({
            ...question,
            id,
            question: questionText,
            answer: answer || "", 
        })
    }

    console.log(question)

    return (
        <div className="overlay">
            <div className="overlay__box-center">
                <span className="overlay__exit" onClick={hideOverlay}>X</span>
                <h3>Edit Question: {category} | {value}</h3>
                {editQuizError && <p style={{color: "red"}}>{editQuizError}</p>}
                <label>
                    Question
                    <DataListInput className="input" name="question" data={suggestedQuestions} value={question.question} onChange={onChangeNew} />
                </label>
                <label className="label">
                    Answer
                    <input type="text" className="input" name="answer"  value={question.answer} onChange={onChange}/>
                </label>
                <button className="button" onClick={onSetQuestion} disabled={isPending ? true : false}>SetQuestion</button>
            </div>
        </div>
    )
}

const mapStateToProps = ({quizReducer: {editQuiz, editQuizError, editQuizPending}, userReducer: {currentUser}}) => ({
    editQuiz,
    editQuizError,
    editQuizPending,
    currentUser
})

const mapDispatchToProps = (dispatch) => ({
    setQuizQuestions: (quiz, questions) => dispatch(setQuizQuestions(quiz, questions)),
    setQuizQuestion: (quiz, question) => dispatch(setQuizQuestion(quiz, question))
})

export default connect(mapStateToProps,mapDispatchToProps)(EditQuestionOverlay)