import React, { useEffect, useRef } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data.js'




const TitleCards = ({ title, category }) => {
  const cardListRef = useRef(null);

  const handleWheel = (event) => {
    event.preventDefault(); 
    if (cardListRef.current) {
      cardListRef.current.scrollLeft += event.deltaY;
  }
}

  useEffect(() => {
    const el = cardListRef.current;
    if (!el) return;
    el.addEventListener('wheel', handleWheel, { passive : false })
    return () => {
      el.removeEventListener('wheel', handleWheel)
    }
    
  },[])

  return (
    <div className='title-cards'>
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardListRef}>
        {cards_data.map((card, index) => {
          return <div className="card" key={index}>
            <img src={card.image} alt="" />
            <p>{card.name}</p>
          </div>
        })}
      </div>
    </div>
  )
}


export default TitleCards