import React, {useState, useEffect} from 'react'
import {connect} from "react-redux"
import {quizStates} from "../redux/quiz/quiz.types"


import QuizEditorNavigation from "./edit-quiz-navigation.component"
import EditQuizTitle from "./edit-quiz-title.component"
import EditQuizCategories from "./edit-quiz-categories.component"
import EditQuizQuestions from "./edit-quiz-questions.component"

const QuizEditor = ({editQuizState, quizId, editQuiz}) => {


    useEffect(() => {
        if(quizId){
            // try load quiz => getQuiz
        }
    }, [])


    useEffect(() => {
        // check for quiz state
     
    }, [editQuiz])

    const renderActiveState = () => {
        switch(editQuizState){
            case quizStates.EDIT_TITLE:
                return () => <EditQuizTitle />
            case quizStates.EDIT_CATEGORIES:
                return () => <EditQuizCategories />
            case quizStates.EDIT_QUESTIONS:
                return () => <EditQuizQuestions />

            default: return () => <div>No edit state found</div>
        }
    }

    const ActiveStatePanel = renderActiveState()

    return (
        <div className="quiz-editor">
            <QuizEditorNavigation />
            <div className="quiz-editor__body">
                <ActiveStatePanel />
            </div>
        </div>
    )
}

const mapStateToProps = ({quizReducer: {editQuizState}}) => ({
    editQuizState  
})

export default connect(mapStateToProps)(QuizEditor)