import React, {useState} from 'react'
import {connect} from "react-redux"
import {createQuiz} from "../redux/quiz/quiz.actions"


const EditQuizTitle = ({currentUser, editQuiz, createQuiz, editQuizError}) => {
    const [title, setTitle] = useState(editQuiz ? editQuiz.title || "" : "")
    const onChangeTitle = (e) => setTitle(e.target.value) 

    const onSubmit = (e) => {
        e.preventDefault();
        createQuiz(currentUser.id, title)
    }
    
    return (
        <div className="container">
            <div className="container__center-box">
                <form className="form">
                    <h3 className="form__title">Edit Quiz Title</h3>
                    {editQuizError && <p style={{color: "red"}}>{editQuizError}</p>}
                    <label className="label">
                        Quiz Title
                        <input className="input" value={title} onChange={onChangeTitle}/>
                    </label>
                    <button className="button" onClick={onSubmit}>Set Title</button>
                </form>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    createQuiz: (userId, title) => dispatch(createQuiz(userId, title))
})

const mapStateToProps = ({userReducer: {currentUser}, quizReducer: {editQuiz, editQuizPending, editQuizError}}) => ({
    currentUser,
    editQuiz,
    editQuizPending,
    editQuizError
})
export default connect(mapStateToProps, mapDispatchToProps)(EditQuizTitle)