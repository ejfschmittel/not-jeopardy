import React, {useState, useEffect} from 'react'
import {connect} from "react-redux"
import {addCategory} from "../redux/category/cateogry.actions"
import {addCollectionAndDocument} from "../firebase/firebase.utils"

const CreateCategoryPage = ({addedCategoryName, addCategoryPending, addCategoryError, addCategory}) => {
    const [categoryName, setCategoryName] = useState("")

    // clear input after categoryName has beed added
    useEffect(() => {addedCategoryName && setCategoryName("")}, [addedCategoryName])

    const onKeyDown = (e) => e.keyCode === 13 && onCreateCategory()   

    const onCreateCategory = () => !addCategoryPending && addCategory(categoryName)

    const onChange = (e) => setCategoryName(e.target.value)

    return (
        <div className="container">
            <div className="container__center-box">     
                <h1>Create Category</h1>
                {addCategoryError && <p style={{color: "red"}}>{addCategoryError}</p>}
                {addedCategoryName && <p style={{color: "green"}}>{addedCategoryName} has been added</p>}
                <label className="label">
                    New Category:

                    <input className="input" type="text" name="category-name" onChange={onChange} value={categoryName} onKeyDown={onKeyDown}/>
                </label>
                <button className="button" disabled={addCategoryPending ? true : false} onClick={onCreateCategory}>Submit new category</button>
            </div>
        </div>
    )
}

const mapStateToProps = ({categoryReducer: {addedCategoryName, addCategoryPending, addCategoryError}}) => ({
    addedCategoryName,
    addCategoryPending,
    addCategoryError
})

const mapDispatchToProps = (dispatch) => ({
    addCategory: (categoryName) => dispatch(addCategory(categoryName))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateCategoryPage)