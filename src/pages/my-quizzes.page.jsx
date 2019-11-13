import React, {useState, useEffect} from 'react'
import {connect} from "react-redux"
import {Link} from "react-router-dom"

import {fetchUserQuizzes} from "../redux/quiz/quiz.actions"

const MyQuizzesPage = ({fetchUserQuizzes, currentUser, userQuizzes}) => {
    
    useEffect(() => {
        // load my quizzes
        if(currentUser && currentUser.id){
            fetchUserQuizzes(currentUser.id)
        }
        
    }, [currentUser])

    console.log(userQuizzes)
    return (
        <div className="container">
            <Link to="/quiz/create" className="button">Create New Quiz</Link>
            {userQuizzes && userQuizzes.length > 0?
                <div>
                    {userQuizzes.map(quiz => 
                        <div key={quiz.id}>
                            {quiz.title}
                        </div>    
                    )}
                </div>
            :
                <div>
                    You didn't create any Quiz yet.

                   

                </div>
            }
        </div>
    )
}

const mapStateToProps = ({userReducer: {currentUser}, quizReducer: {userQuizzes}}) => ({
    currentUser,
    userQuizzes,
})

const mapDispatchToProps = (dispatch) => ({
    fetchUserQuizzes: (userId) => dispatch(fetchUserQuizzes(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(MyQuizzesPage)