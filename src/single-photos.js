import React from 'react'

function singlePhotos(props){
   return(
       <div className="single-photos">
            <img src={props.url} />
            <h4>{props.title}</h4>
            <h5>{props.id}</h5>
       </div>
   )
}

export default singlePhotos;