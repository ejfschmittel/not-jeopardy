import React from 'react'


const ChoseQuizTitle = () => {
    return (
        <div className="container">
        <div className="container__center-box">
            <form className="form">
                <h1 className="form__title">Create New Quiz</h1>
                <label className="label">
                    Title
                    <input className="input" type="text"/>
                </label>
                <button className="button">Create New Quiz</button>
            </form>
        </div>
        </div>
    )
}

export default ChoseQuizTitle