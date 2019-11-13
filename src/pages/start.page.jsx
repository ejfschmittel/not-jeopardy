import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom"

import DataListInput from "../components/datalistinput.component"


const data = [
    {name: "test1"},
    {name: "test2"},
    {name: "test3"},
    {name: "test4"},
    {name: "test5"},
    {name: "test6"},
    {name: "test7"},
    {name: "test8"},
    {name: "test9"},
    {name: "test10"}
]

const StartPage = () => {

    const [inp, setInp] = useState({name: ""})

    const onChangeTest = (e, value, name) => {
        // "sting" "object"
        setInp(value)
    }

    return (
        <div className="layout-container">
            <h1 className="heading">Not Jeopardy</h1>   
            <Link to="/auth">authenticate</Link>    
            <Link to="/game">Quick Game</Link>  

            <DataListInput className="input" name="name" value={inp.name} data={data} onChange={onChangeTest}/>
        </div>
    )
}

export default StartPage