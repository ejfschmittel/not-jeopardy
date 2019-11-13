import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import {auth, signInWithGoogle} from "../firebase/firebase.utils"

const INITIAL_VALUES = {
    email: '',
    password: '',
}

const LoginComponent = ({currentUser, location, history}) => {
    console.log(location)
    const [values, setValues] = useState(INITIAL_VALUES)


    useEffect(() => {
        if(currentUser){
            if(location.state && location.state.from){
                history.push(location.state.from.pathname)
            }else{
                history.push("/")
            }
        }
    }, [currentUser])
    
    const onChange = (e) => {
        const {name, value} = e.target
        setValues({...values, [name]: value})
    }

    const {email, password} = values

    const onClick = async (e) => {
        e.preventDefault();
    
        try {
          await auth.signInWithEmailAndPassword(email, password);
          setValues(INITIAL_VALUES)       
        } catch (error) {
          console.log(error);
        }
    };

    

    return (
        <div className="container">

            <div className="container__center-box">
            <div className="form">
                <h3 className="form__title">Login User</h3>
                <p className="form__subtitle">if you haven't gotten an account already <Link to="/users/signup">signup</Link> to not jeopardy.</p>
                <label className="label">
                    email
                    <input className="input" type="email" name="email" value={email} onChange={onChange}/>
                </label>
                <label className="label">
                    password
                    <input className="input" type="password" name="password" value={password} onChange={onChange}/>
                </label>
                <div className="row"> 
                    <button className="button" onClick={onClick}>Login</button>
                    <button className="button" onClick={signInWithGoogle}>Signin with google</button>
                </div> 
            </div>
            </div>
            
        </div>
    )
}

const mapStateToProps = ({userReducer: {currentUser}}) => ({
    currentUser
})

export default connect(mapStateToProps)(LoginComponent)