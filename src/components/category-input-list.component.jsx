import React from 'react'
import CategoryInput from "./category-input.component"

const CategoryInputList = ({categorySlots, onChange, premadeCategories}) => (
    <div className="category-input-list">
        {Object.keys(categorySlots).map((key) => (
            <CategoryInput 
                key={key} 
                id={key} 
                categories={premadeCategories} 
                onChange={onChange}
                value={categorySlots[key]}
            />
        ))}
    </div>
)


export default CategoryInputList