import React from 'react'
import {Link} from "react-router-dom"
import {connect} from "react-redux"

import {auth} from "../firebase/firebase.utils"

import {setCurrentUser, signOut} from "../redux/user/user.actions"



const Header = ({currentUser, signOut}) => (
    <header className="header">
        <Link to="/" className="header__title">Not Jeopardy</Link>
        <nav className="header__nav">
            {currentUser != false && (
                <ul>
                    {currentUser ? 
                        <React.Fragment>
                            <li className="header__nav-item"><Link to="/quiz/create">Create Quiz</Link></li>
                            <li className="header__nav-item"><Link to="/quiz/me">My Quizzes</Link></li>
                            <li className="header__nav-item"><button onClick={() => signOut(auth)}>Logout</button></li>
                        </React.Fragment>
                    :
                        <React.Fragment>
                        <li className="header__nav-item"><Link to="/users/login">Login</Link></li>
                        <li className="header__nav-item"><Link to="/users/signup">Signup</Link></li>
                        </React.Fragment>
                    }
                </ul>
            )}
        </nav>
    </header>
)

const mapStateToProps = ({userReducer}) => ({
    currentUser: userReducer.currentUser
})

const mapDispatchToProps = (dispatch) => ({
    signOut: (auth) => dispatch(signOut(auth))
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)

