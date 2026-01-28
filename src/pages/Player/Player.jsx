import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  const { id } = useParams();
  const navigate = useNavigate()

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    typeof: ""
  })

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4Y2E5M2I0OWY5NWJkZDI2MDdiMmQ3NGFmYzFjMDY1MCIsIm5iZiI6MTc2OTYyMDA0OC4xOTgwMDAyLCJzdWIiOiI2OTdhNDI1MDQ4N2ZiYTMzOGE3NDM2ZjQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Kw7m2zRM97H3pfJCO8IVLATxSpWrHUBfT2zPGvkwIqA'
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results[0]))
    .catch(err => console.error(err));
  },[])




  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={() => {navigate(-1)}} />  
      <iframe width='90%' height='90%' s
        src={`https://www.youtube.com/embed/${apiData.key}`}
        title='trailer'
        frameBorder='0' allowFullScreen>
      </iframe> 
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>  
    </div>
  )
}

export default Player