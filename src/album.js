import React from 'react'
import AlbumComponent from './album-component';
import SinglePhotos from './single-photos';

class Album extends React.Component{
   render(){ 
      return(
            <div className="single-photos" onClick={(e) => {this.props.onClick(e,this.props.albumId)}}>
                  <img src={this.props.url} />
                  <h4>Album {this.props.albumId}</h4>
             </div>
       )
      
   }
}
export default Album;