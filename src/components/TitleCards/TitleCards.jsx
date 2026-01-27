import React, { useEffect, useRef } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data.js'




const TitleCards = () => {
  const cardsRef = useRef();

  const handleWheel = (event) => {
    event.preventDefault(); 
    cardsRef.current.scrollLeft += event.deltaY;
    console.log("this ran")
  }

  useEffect(() => {
    cardsRef.current.addEventListener('wheel', handleWheel)
  },[])

  return (
    <div className='title-cards' ref={cardsRef}>
      <h2>Popular on Netflix</h2>
      <div className="card-list">
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