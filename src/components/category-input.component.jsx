import React, {useEffect} from 'react'
import DefaultCategoryDataList from "./default-category-data-list.component"
import {connect} from "react-redux"

import DataListInput from "./datalistinput.component"

import {fetchDefaultCategories} from "../redux/category/cateogry.actions"

const CategoryInput = ({ value, name, onChange, defaultCategories, fetchDefaultCategories}) => {

    // load default categories if not existant on load
    useEffect(() => {
        // fetch default categories
        console.log(value)
        if(!defaultCategories){
            fetchDefaultCategories()
        }
        // fetch user categories
    }, [])

    const onInputChange = (e, category, name) => {
        // gets either objects formed {default: true, name: "history", id: "2rDnLE7itRBh3nSUJQqc"} or {name: "film"}
        onChange(e, {default: false, id: null, ...category}, name)
    }
    
    return (
        <DataListInput 
            className="input"
            name={name}
            data={defaultCategories}
            value={value}
            onChange={onInputChange}
            displayKey="name"
        />
    )
}


const mapStateToProps = ({categoryReducer: {defaultCategories}}) => ({
    defaultCategories
})

const mapDispatchToProps = (dispatch) => ({
    fetchDefaultCategories: () => dispatch(fetchDefaultCategories())
})


export default connect(mapStateToProps, mapDispatchToProps)(CategoryInput)