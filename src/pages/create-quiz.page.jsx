import React from 'react'
import QuizEditor from "../components/edit-quiz.component"


const CreateQuizPage = () => {
    return (
        <div className="container">
            <QuizEditor quizID={null}/>
        </div>
    )
}

export default CreateQuizPage


// headlien navigation 

// edit component => for edit and create
// Gamegrid => display // gamegrid context

/*

Edit Component
    Edit Title Component
    Edit Categories Component
    Edit GameGridComponent


GameGridProvider    
    GameGrid => render fiting overlay onClick
        GameGridColumn
            GameGridField => OnClick(category, value)



*/