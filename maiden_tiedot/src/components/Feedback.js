import React, {useState} from 'react'
import Match from './Match'
import Country from './Country'


const Feedback = ({ matches }) => {

    const [clicked, setClicked] = useState(false)
    const [newMatches, setNewMatches] = useState([])

       
    //jos clicked=true, suoritetaan metodi, joka näyttää maan tiedot
    const countryToShow = clicked
    ? newMatches.map(country => 
    <Country key={country.numericCode} country={country} />)
    : null
    
    //funktio, joka määrää, mitä klikkaus saa aikaan =>
    //päivitetään tila
    //jätetään matches-listalle vain se maa, jota klikattiin   
    const clickEffect = (name) => {

        setClicked(true)

        setNewMatches(matches.filter(country => country.name === name))

        
    }            


    //ehdollinen renderöinti
    if(matches.length > 10) {

        return (
            <div>
                <p>No filter or too many matches, spesify another filter</p>
            </div>
        )
    }

    if(matches.length > 1) {

         
        return (
            <div>

                {matches.map(country =>
                    <Match 
                        key={country.numericCode} 
                        country={country}
                        clickEffect={() => clickEffect(country.name)} 
                    />
                
                    
                )}

                {countryToShow}

            </div>

        )

    }
    
    return (
        <div>
        {matches.map(country => 
            <Country key={country.numericCode} country={country} />
        )}
    
        </div>
    )
    
}    

export default Feedback
