import React from 'react'


const Match = ({ country, clickEffect }) => {
  
    

    return (

        <div>

            {country.name + " "} 

            <button onClick={clickEffect}>
                show 
            </button>

        </div>

    )   

}

export default Match