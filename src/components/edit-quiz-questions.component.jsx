import React from 'react'
import GameGrid from "./game-grid.component"
import {connect} from "react-redux"

const EditQuizQuestions = ({editQuiz}) => {
    return (
        <div className="container">
            <div className="container__box-full">
                <GameGrid categories={editQuiz.categories}/>
            </div>
        </div>
    )
}

const mapStateToProps = ({quizReducer: {editQuiz}}) => ({
    editQuiz
})

export default connect(mapStateToProps)(EditQuizQuestions)