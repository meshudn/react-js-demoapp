import React from 'react';
import './App.css';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import SinglePhotos from './single-photos';
import Album from './album';

class App extends React.Component {

 albumPhotos = [];
 constructor(){
   super();
   this.state = {
    photos: {},
    clicked: false,
    backButton: false,
    addMore: false,
    albumfile: {}
   }
  this.handleAlbumClick = this.handleAlbumClick.bind(this);
  this.handleBackButton = this.handleBackButton.bind(this);
  this.handleAddMore = this.handleAddMore.bind(this);
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
  
  albumChunk = [];
  lastAlbumChunkIndex=10;
  isAlbumChunkEmpty = true;
  loadTarget = 10;

  handleAlbumClick(e,id){

    console.log("album component clicked: " + id);
    var size = this.state.photos.length;
    var count = 0;
    this.albumChunk = [];
    for(var i=0; i<size; i++){
        if(this.state.photos[i].albumId == id && count <= 50){
          this.albumChunk.push(this.state.photos[i]);
          count = count + 1;
        }
        if(count > 50){
            break;
        }
    }
     //console.log(this.albumChunk)
       
     for(var i=0; i < this.lastAlbumChunkIndex; i++){
      this.albumPhotos.push(<SinglePhotos key={i+Math.floor(Date.now() / 1000)} url={this.albumChunk[i].url} title={this.albumChunk[i].title} id={this.albumChunk[i].id} />)
     }
     this.lastAlbumChunkIndex = this.lastAlbumChunkIndex + 10;
     
      this.setState({
       clicked: true
    });
  }

  handleBackButton(e){
    console.log('back button');
    this.setState({backButton: true});
  }
  handleAddMore(e){
    console.log('add more '+this.lastAlbumChunkIndex);
    this.albumPhotos = [];
    if(this.lastAlbumChunkIndex == 60){
      return false;
    }
    for(var i=0; i < this.lastAlbumChunkIndex; i++){
      this.albumPhotos.push(<SinglePhotos key={i+Math.floor(Date.now() / 1000)} url={this.albumChunk[i].url} title={this.albumChunk[i].title} id={this.albumChunk[i].id} />)
     }
     this.lastAlbumChunkIndex = this.lastAlbumChunkIndex + 10;
     console.log(this.albumPhotos);
     this.setState({
      clicked: true
   });
  }


  render(){
    
    try{
      var albums = [];
      var prevAlbumId = 0;
      var currentAlbumId = 0;
      var isAlbumIdChanged = false;

      var size = this.state.photos.length;
      for(var i=0; i<size; i++){
        currentAlbumId = this.state.photos[i].albumId;
      if(prevAlbumId < currentAlbumId){
        prevAlbumId = currentAlbumId;
        isAlbumIdChanged = true;
        }
       if(isAlbumIdChanged && (i % 2 == 0)){
         isAlbumIdChanged = false;
        albums.push(<Album key={i + Math.floor(Date.now() / 1000)} onClick={(e, currentAlbumId) => {this.handleAlbumClick(e, currentAlbumId)}} data={this.state.photos}  url={this.state.photos[i].url} albumId={this.state.photos[i].albumId} />)
      
      } 
       
     }
      //console.log(this.state.photos[1].url)
    }catch(err){
      console.log(err);
      this.albumPhotos = [];
    }
   
    
    if(this.state.clicked == true){
      this.state.clicked=false;
      return (
        <Container maxWidth="md">
          <Typography variant="h4" component="h4" align="center">
            <h3>Album</h3>
            <Button variant="contained" color="secondary" onClick={(e) => {this.handleBackButton(e)}}>Back</Button>
          </Typography>
          <br/>
        
           <Grid 
              container
              direction="row"
              justify="left"
              alignItems="flex-start"
            > 
            {this.albumPhotos}
            </Grid>

            <div>
                <br/>
                <br/>
                <Button variant="contained" color="primary" onClick={(e) => {this.handleAddMore(e)}}>Add more</Button>
                <br/>
                <br/>
            </div>
        </Container>
      );
    } 
    else{
      if(this.state.backButton){
        this.state.backButton = false;
        this.albumPhotos=[];
        this.lastAlbumChunkIndex=10;
      }
      return (
        <Container maxWidth="md">
          <Typography variant="h4" component="h4" align="center">
            <h3>Gallery</h3>
          </Typography>
        
          <Grid 
          container
          direction="row"
          justify="center"
          alignItems="center"

          > 
              {albums}
          </Grid>
        </Container>
      );
    }
  }
}

export default App;
