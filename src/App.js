import React from 'react';
import './App.css';
import axios from 'axios';
import SinglePhotos from './single-photos'

class App extends React.Component {
  
 constructor(){
   super();
   this.state = {
    photos: {}
   }
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
       
       for(var i=0; i<10; i++){
        console.log(this.state.photos[i].id)
        }
      })
      
  }
 
  render(){
    
    // for(var i=0; i<2; i++){
    //   var x = this.state.photos[i];
    //   console.log(x);
    // }
    
    //console.log(x);
    try{
      // let entries = Object.entries(this.state.photos);
      // entries.forEach( ([prop, val]) => {
           
      // }
      var albums = [];
      var prevAlbumId = 1;
      var currentAlbumId = 1;
      var size = this.state.photos.length;
      for(var i=0; i<size; i++){
        currentAlbumId = this.state.photos[i].albumId;
      if(prevAlbumId < currentAlbumId){
        prevAlbumId = currentAlbumId;
        }
       if() 
        
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
