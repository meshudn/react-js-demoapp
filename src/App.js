import React from 'react';
import './App.css';
import axios from 'axios';
import SinglePhotos from './single-photos';
import Album from './album-photo';

class App extends React.Component {
  
 constructor(){
   super();
   this.state = {
    photos: {}
   }
   this.handleAlbumClick = this.handleAlbumClick.bind(this);
 }

  componentDidMount(){
    axios.get('https://jsonplaceholder.typicode.com/photos')
      .then(response => {
        const res = response.data;
        const res2 = JSON.stringify(res);
        var convertedValue = JSON.parse(res2);
        console.log("console: "+  convertedValue[0].id)

        this.setState({ 
          photos: convertedValue
       });
       
      //  for(var i=0; i<10; i++){
      //   console.log(this.state.photos[i].id)
      //   }
      })
      
  }
  handleSubmit(event){
    event.preventDefault();
    
 }
 
  render(){
    
    try{
      var albums = [];
      var prevAlbumId = 1;
      var currentAlbumId = 1;
      var isAlbumIdChanged = false;

      var size = this.state.photos.length;
      for(var i=1; i<size; i++){
        currentAlbumId = this.state.photos[i].albumId;
      if(prevAlbumId < currentAlbumId){
        prevAlbumId = currentAlbumId;
        isAlbumIdChanged = true;
        }
       if(isAlbumIdChanged && (i % 2 == 0)){
         isAlbumIdChanged = false;
        albums.push(<Album key={i} onClick={(e) => this.handleAlbumClick(currentAlbumId, e)} url={this.state.photos[i].url} albumId={this.state.photos[i].albumId} />)
       } 
        
     }
      //console.log(this.state.photos[1].url)
    }catch(err){
      console.log(err);
    }

    return (
      <div className="main-container">
        <header>
          <h3>Gallery</h3>
        </header>
      
        <div className="album">
           {albums}
        </div>
        
      </div>
    );
  }
}

export default App;
