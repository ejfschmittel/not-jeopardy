import React, {useState} from 'react'
import {Link} from "react-router-dom"
import {auth, createUserProfileDocument} from "../firebase/firebase.utils"


const INITIAL_VALUES = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignupUser = () => {
    const [values, setValues] = useState(INITIAL_VALUES)
    
    const onChange = (e) => {
        const {name, value} = e.target
        setValues({...values, [name]: value})
    }

    const {displayName, email, password, confirmPassword} = values

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("passwords don't match");
            return;
          }
      
          try {
            const { user } = await auth.createUserWithEmailAndPassword(
              email,
              password
            );
      
            await createUserProfileDocument(user, { displayName });
      
            setValues(INITIAL_VALUES)
          } catch (error) {
            console.error(error);
          }
    }

    return (
        <div className="container">
            <div className="container__center-box">
                <div className="form">
                    <h3 className="form__title">Signup User</h3>
                    <p className="form__subtitle">Already got an account? <Link to="/users/login">Login</Link> to not jeopardy.</p>
                    <label className="label">
                        email
                        <input className="input" type="email" name="email" value={email} onChange={onChange}/>
                    </label>
                    <label className="label">
                        display name
                        <input className="input" type="text" name="displayName" value={displayName} onChange={onChange}/>
                    </label>
                    <label className="label">
                        password
                        <input className="input" type="password" name="password" value={password} onChange={onChange}/>
                    </label>
                    <label className="label">
                        repeat password
                        <input className="input" type="password" name="confirmPassword" value={confirmPassword} onChange={onChange}/>
                    </label>
                    <button className="button" onClick={onSubmit}>Signup</button>
                </div>
            </div>
        </div>
    )
}

export default SignupUser