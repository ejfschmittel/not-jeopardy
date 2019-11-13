import React from 'react'
import {connect} from "react-redux"

const DefaultCategoryDataList = ({id, defaultCategories, onDataOptionClick}) => {
    return (
        <datalist id={id}>
            {defaultCategories && defaultCategories.map(
                category => <option onClick={onDataOptionClick} key={`choose-category-${category.name}`} value={category.name} />
            )}
        </datalist>
    )
}

const mapStateToProps = ({categoryReducer: {defaultCategories}}) => ({
    defaultCategories
})

export default connect(mapStateToProps)(DefaultCategoryDataList)