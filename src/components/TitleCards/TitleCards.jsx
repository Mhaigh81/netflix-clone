import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data.js'
import { Link } from 'react-router-dom';




const TitleCards = ({ title, category }) => {

  const [apiData, setApiData] = useState ([]);
  const cardListRef = useRef(null);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4Y2E5M2I0OWY5NWJkZDI2MDdiMmQ3NGFmYzFjMDY1MCIsIm5iZiI6MTc2OTYyMDA0OC4xOTgwMDAyLCJzdWIiOiI2OTdhNDI1MDQ4N2ZiYTMzOGE3NDM2ZjQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Kw7m2zRM97H3pfJCO8IVLATxSpWrHUBfT2zPGvkwIqA",
    },
  };

  const handleWheel = (event) => {
    event.preventDefault(); 
    if (cardListRef.current) {
      cardListRef.current.scrollLeft += event.deltaY;
  }
}

  useEffect(() => {

    fetch(
    `https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`,
    options)
    .then((response) => response.json())
    .then((response) => setApiData(response.results))
    .catch((err) => console.error(err));

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
        {apiData.map((card, index) => {
          return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}


export default TitleCards