import React from 'react'

function singlePhotos(props){
   return(
       <div className="single-photos">
            <img src={props.url} />
            <h4>{props.title}</h4>
       </div>
   )
}

export default singlePhotos;