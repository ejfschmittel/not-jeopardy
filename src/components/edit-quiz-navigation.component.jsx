import React from 'react'
import EditQuizNavigationItem from "./edit-quiz-navigation-item.component"
import {quizStates} from "../redux/quiz/quiz.types"

// move edit quiz to redux state
// create Edit Quiz Navigation Item


const EditQuizNavigation = () => (
    <nav className="editor-nav">
        <h1 className="editor-nav__title">Create Quiz</h1>
        <EditQuizNavigationItem itemState={quizStates.EDIT_TITLE}>
            Edit Title 
        </EditQuizNavigationItem>
        >>
        <EditQuizNavigationItem itemState={quizStates.EDIT_CATEGORIES}>
            Edit Categories 
        </EditQuizNavigationItem>
        >>
        <EditQuizNavigationItem itemState={quizStates.EDIT_QUESTIONS}>
            Edit Questions 
        </EditQuizNavigationItem>
    </nav>
)


export default EditQuizNavigation