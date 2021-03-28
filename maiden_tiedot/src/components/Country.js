import React from 'react'

const Country = ({ country }) => {

    return (

        <div>
            <h2>{country.name}</h2>

            <p>capital {country.capital}</p>
            <p>population {country.population}</p>

            <b>languages</b>

            <ul>
               {country.languages.map(language =>
                    <li key={language.iso639_1}>{language.name}</li>               
               )}
           </ul>

           <img src={country.flag} alt="lippu" width="20%" height="20%"/>
        </div>

    )
}

export default Country