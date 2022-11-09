import React from 'react'
import "./Category.css"
const colors = [1,0,1,0,1,1,1,1,0];
function Category() {
  return (
    <div className='category-container'>
      <div className='category-h2'>
        <p className='category'>Categories</p>
      </div>
      <div className='category-section'>
        <div className='grid-container'>
          {colors.map((z,i)=>(<img key={i} src={z?'img/red-circlered-circle.svg':'img/orange-circlecircle.svg'}/>))}
        </div>
      </div>
    </div>
  )
}

export default Category
