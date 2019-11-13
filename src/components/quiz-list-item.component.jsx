import React from 'react'

const QuizListItem = (quizObj) => {
    return (
        <div>
            <div>{quizObj.title}</div>
            <div>{quizObj.createdAt}</div>
            <button>edit</button>
            <button>delete</button>
        </div>
    )
}

export default QuizListItem