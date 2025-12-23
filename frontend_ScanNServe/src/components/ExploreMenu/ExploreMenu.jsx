import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
      <div className='explore-menu-header'>
                <img 
                    src="/menu-title-badge.svg" 
                    alt="Special Fine Dine" 
                    className='explore-menu-badge'
                />
                <h1>Delicious Menu</h1>
      </div>
      <p className='explore-menu-text'>Browse categories, discover flavors, and place your order instantly. Experience dining reimagined with our contactless table service.</p>
      <div className="explore-menu-list">
        {menu_list.map((item,index)=>{
            return (
                <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className='explore-menu-list-item'>
                    <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
                    <p>{item.menu_name}</p>
                </div>
            )
        })}
      </div>
      <hr />
    </div>
  )
}

export default ExploreMenu
