import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Feedback from './components/Feedback'



const App = () => {
    const [countries, setCountries] = useState([])
    const [newFilter, setNewFilter] = useState('')
    
    useEffect(() => {
        axios   
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data)
                
            })
    }, [])

    
    const handleFilter = (event) => {
       
        setNewFilter(event.target.value)
            
    }

   const countryMatches = countries.filter(country => country.name.toLowerCase().includes(newFilter.toLowerCase()))

    //console.log(countryMatches);

    //console.log(countryMatches.length)

    return (
        <div>
            <Filter
                value={newFilter}
                onChange={handleFilter}
            /> 
                
            <Feedback 
                matches={countryMatches}
                 
            />            
                  
        </div>


    )


}
  

export default App;