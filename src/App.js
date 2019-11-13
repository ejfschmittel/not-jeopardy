import React, {useEffect} from 'react'
import {HashRouter, Switch, Route} from "react-router-dom"
import {connect} from "react-redux"

import {auth, createUserProfileDocument} from "./firebase/firebase.setup"
import {setCurrentUser, signOut} from "./redux/user/user.actions"
import PrivateRoute from "./utils/AuthRoute"


import Header from "./components/header.component"

import StartPage from "./pages/start.page"
import LoginPage from "./pages/login.page"
import SignupPage from "./pages/signup.page"
import CreateQuizPage from "./pages/create-quiz.page"
import CreateCategoryPage from "./pages/create-category.page"
import CreateQuestionPage from "./pages/create-question.page"
import MyQuizzesPage from "./pages/my-quizzes.page"

import 'style/main.scss'

const Placeholder = () => <div>Placholder Page</div>

const App = ({setCurrentUser, currentUser}) => {

    // firebase handling login state changes
   let unsubsribeFromAuth = null
    useEffect(() => {
        unsubsribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);   
                userRef.onSnapshot(snapShot => {
                    setCurrentUser({
                        id: snapShot.id,
                        ...snapShot.data()
                    });
                });
            }
        
            setCurrentUser(userAuth);
        })

        return () => {unsubsribeFromAuth()};
    }, [])

    return (
        <HashRouter>
            <Header />
            <main className="main-container">
                {currentUser != false && (           
                    <Switch>
                        <Route path="/" component={StartPage} exact={true}/>
                        <Route path="/users/login" component={LoginPage} />
                        <Route path="/users/signup" component={SignupPage} />
        
                        <PrivateRoute path="/quiz/me" component={MyQuizzesPage} />
                        <PrivateRoute path="/question/create" component={CreateQuestionPage} />
                        <PrivateRoute path="/category/create" component={CreateCategoryPage} />
                        <PrivateRoute path="/quiz/create" component={CreateQuizPage} />
                        <PrivateRoute path="/quiz/:gameId/edit" component={Placeholder} />
                        <PrivateRoute path="/quiz/:gameId/" component={Placeholder} />
                    </Switch>
                )}
            </main>  
        </HashRouter>
    )


}

const mapDispatchToProps = (dispatch) => ({
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
})

const mapStateToProps = ({userReducer: {currentUser}}) => ({
    currentUser
}) 

export default connect(mapStateToProps, mapDispatchToProps)(App)

