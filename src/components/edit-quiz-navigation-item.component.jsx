import React, {useMemo} from 'react'
import {connect} from "react-redux"
import {quizStates} from "../redux/quiz/quiz.types"
import {setEditQuizState} from "../redux/quiz/quiz.actions"


const EditQuizNavigationItem = ({editQuizState, editQuiz, itemState, children, setEditQuizState}) => {
    const active = editQuizState == itemState
    
    // check where it should be accessible
    const disabled = useMemo(() => {
        switch(itemState){
            case quizStates.EDIT_TITLE: return false
            case quizStates.EDIT_CATEGORIES: return editQuiz ? !editQuiz.title : true
            case quizStates.EDIT_QUESTIONS: return editQuiz ? !editQuiz.categories : true
            default: return false; 
        }
    }, [editQuiz, editQuizState])

    

    const className = useMemo(() => `
        editor-nav__control
        ${active ? ' editor-nav__control--active' : ''}
        ${disabled ? ' editor-nav__control--disabled' : ''}
    `, [disabled, active])

    const onNavItemClick = (e) => {
        if(!disabled){
            setEditQuizState(itemState)
        }
    }


    return (
        <button className={className} onClick={onNavItemClick}>
            {children}
        </button>
    )
}

//<EditQuizNavigationItem />

const mapStateToProps = ({quizReducer: {editQuizState, editQuiz}}) => ({
    editQuizState,
    editQuiz
})

const mapDispatchToProps = (dispatch) => ({
    setEditQuizState: (editState) => dispatch(setEditQuizState(editState))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditQuizNavigationItem)