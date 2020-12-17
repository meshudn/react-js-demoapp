import React from 'react'
import AlbumComponent from './album-component';
import SinglePhotos from './single-photos';

class Album extends React.Component{
   albumPhotos = [];
   constructor(){
      super();
      this.state = {
         clicked: false
      }
   
   }
   handleAlbumClick(e,id){

    this.setState({
       clicked: true
    });
 
    var x = parseInt(id);
    console.log("album component clicked " +id);
    for(var i=0; i<10; i++){
       
      //  if(this.props.data[i].albumId != id){
      //    break;
      //  }
       this.albumPhotos.push(<SinglePhotos key={i} url={this.props.data[i].url} title={this.props.data[i].title} />)
     }
  }
   render(){ 
      const isClicked = this.state.clicked;
    
      if(isClicked == true){
            return (
               <div>
                   {this.albumPhotos}

                   <button className="add more">Add More</button>
               </div>
            )
      }else{
      return(
              <div className="single-photos" onClick={this.handleAlbumClick.bind(this, this.props.albumId)}>
                  <img src={this.props.url} />
                  <h4>Album {this.props.albumId}</h4>
             </div>
            // <AlbumComponent onClick={this.handleAlbumClick.bind(this, this.props.albumId)} url={this.props.url} title={this.props.title} />    
       )
      }
   }
}
export default Album;