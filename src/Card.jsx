import { useState, useEffect, useMemo, memo } from 'react'
const Card = memo(function Card({ politican }) {
    console.log(politican)
    {
        return <div className='card-container'>
            <h1 className='name-card'>{politican.name}</h1>
            <div className='img-container'>IMMAGINE</div>
            <p className='position-politican'>{politican.position}</p>
            <p className='biography-politican'>{politican.biography}</p>
        </div>
    }
})

export default Card