import React from 'react'

function Album(props){
   return(
       <div className="single-photos">
            <img src={props.url} />
            <h4>Album {props.title}</h4>
       </div>
   )
}

export default singlePhotos;