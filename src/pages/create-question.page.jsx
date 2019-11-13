import React, {useState, useEffect} from 'react'
import {connect} from "react-redux"
import {createQuestion} from "../redux/question/question.actions"
import CategoryInput from "../components/category-input.component"
import ValueInput from "../components/value-input.component"

const emptyQuestion = {
    question: "",
    answer: "",
    category: "",
    value: "200",
    userId: null
}


const CreateQuestionPage = ({addedQuestion, addQuestionPending, addQuestionError, createQuestion, currentUser}) => {
    const [question, setQuestion] = useState(emptyQuestion)
    
    // clear input after categoryName has beed added
    useEffect(() => {addedQuestion && setQuestion(emptyQuestion)}, [addedQuestion])

    // submit on enter
    const onKeyDown = (e) => e.keyCode === 13 && onCreateQuestion()   

    const onCreateQuestion = () =>{
        if(!addQuestionPending){
            createQuestion({...question, userId: currentUser.id})
        }
    } 

    const onChange = (e) => {
        const {name, value} = e.target
        setQuestion({...question, [name]: value})
    }

    const onCategoryChange = (name, category) => {
        setQuestion({...question, [name]: category})
    }



    return (
        <div className="container">
            <div className="container__center-box">     
                <h1>Create Question</h1>
                {addQuestionError && <p style={{color: "red"}}>{addQuestionError}</p>}
                {addedQuestion && <p style={{color: "green"}}>Question "{addedQuestion.question}" has been added</p>}
                <label className="label">
                    Question:
                    <input className="input" type="text" name="question" onChange={onChange} value={question.question} onKeyDown={onKeyDown}/>
                </label>
                <label className="label">
                    Answer:
                    <input className="input" type="text" name="answer" onChange={onChange} value={question.answer} onKeyDown={onKeyDown}/>
                </label>

                <div className="row">
                    <label className="label">
                        Category:
                        <CategoryInput name="category" onChange={onCategoryChange} value={question.category} />
                    </label>
                    <label className="label">
                        Value:
                        <ValueInput name="value" value={question.value} onChange={onChange}/>
                    </label>                   
                </div>

                <button className="button" disabled={addQuestionPending ? true : false} onClick={onCreateQuestion}>Submit new Question</button>
            </div>
        </div>
    )
}

const mapStateToProps = ({questionReducer: {addedQuestion, addQuestionPending, addQuestionError}, userReducer: {currentUser}}) => ({
    addedQuestion,
    addQuestionPending,
    addQuestionError,
    currentUser
})

const mapDispatchToProps = (dispatch) => ({
    createQuestion: (question) => dispatch(createQuestion(question))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateQuestionPage)