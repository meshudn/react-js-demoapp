import React from 'react';
import './App.css';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SinglePhotos from './single-photos';
import Album from './album';


class App extends React.Component {
 constructor(){
   super();
   this.state = {
    photos: {},
    clicked: false,
    backButton: false,
    addMore: false
   }
  this.handleAlbumClick = this.handleAlbumClick.bind(this);
  this.handleBackButton = this.handleBackButton.bind(this);
  this.handleAddMore = this.handleAddMore.bind(this);
 }

  componentDidMount(){
    /* 
     Here I am fetching the data from the apis.
     converting the response data into Json string
     then again parse it because I could not get the 
     object here.
    */
    axios.get('https://jsonplaceholder.typicode.com/photos')
      .then(response => {
        const res = response.data;
        const res2 = JSON.stringify(res);
        var convertedValue = JSON.parse(res2);
        console.log("console: "+  convertedValue[0].id)
       
       /* Saving the json object to the State variable called photos */
        this.setState({ 
          photos: convertedValue
       });
      })
  }
  

  /* 
   Click event handle for Album folder
   @handleAlbumClick()
   * it takes two param, event and album id
   * Firstly, I store all the 50 photos in a
   * class variable called @albumchuk[] 
   * 
   * 
  */
  albumPhotos = [];
  albumChunk = [];
  lastAlbumChunkIndex=10;
  currentAlbumIndex=1;

  handleAlbumClick(e,id){
    //console.log("album component clicked: " + id);
    var size = this.state.photos.length;
    var count = 0;
    this.albumChunk = [];
    this.currentAlbumIndex = id; //this var will need in the render section to show the album id.
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
       
     /* 
      * Initially, to show only 10 photos from an album
      * I just take 10 photos from the variable @albumChunk[]
      * and to maintain sequence I store the last index in a variable called
      * @lastAlbumChunkIndex
      * this.albumPhotos[] is an array object for rendering the album section
      * <SinglePhotos> a sub-layout component where I created a layout for showing photo and title
      * 
      * After storing 10 photos I change the state variable called "clicked" to true.
      * It's a state variable to track the click event for album and add more button.
      * Initial value is false for the @this.state.clicked
      * 
     */
     for(var i=0; i < this.lastAlbumChunkIndex; i++){
      this.albumPhotos.push(<SinglePhotos key={i+Math.floor(Date.now() / 1000)} url={this.albumChunk[i].url} title={this.albumChunk[i].title} id={this.albumChunk[i].id} />)
     }
     this.lastAlbumChunkIndex = this.lastAlbumChunkIndex + 10;
     
      this.setState({
       clicked: true
    });
  }

  /* 
   * @handleBackButton is used to track click event for Back button
   * I just maintain a state variable here to change the render()
  */
  handleBackButton(e){
    console.log('back button');
    this.setState({backButton: true});
  }

  /* 
   * @handleAddMore() function is going to add 10 more photos 
   * after the album component rendered. 
   * before storing in albumPhotos[] I clean the variable first. 
   * then check the lastAlbumChunkIndex whether it's exceed the upper limit 50 or not. 
   * In that case 60 means, I just make it 10 times then before. 
   * 
  */
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
     
     //console.log(this.albumPhotos);
     
     this.setState({
      clicked: true
   });
  }


  render(){
    
    /* 
     * While rendering for the first time my axios api updated the variable 
     * after DOM loading because the JSON response takes some time
     * that's why to avoid the JSON conversion error or variable undefined error
     * I used a try-catch block here and make 100 album from the response object.
     * 
    */
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

      /* Storing the photos only when the album has a id with even number (according to the requirement) */
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
   
    /* 
    * Here I am going to render() conditionally so that I can replace 
    * the album component when the child component clicked. 
    * In the first if block I check whether any click event occured or not. 
    * if occured then either it's from Album click or from the add more button.
    * 
    */
    if(this.state.clicked == true){
      this.state.clicked=false;
      return (
        <Container maxWidth="md">
          <Typography variant="h4" component="h4" align="center">
            <h3>Album {this.currentAlbumIndex}</h3>
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
      /* 
       * This render section is for the album 
       * showing 100 albums here.
       * 
       * I checked also if @this.state.backButton is true or not 
       * I just set everything with initial value.
      */
      if(this.state.backButton){
        this.state.backButton = false;
        this.albumPhotos=[];
        this.lastAlbumChunkIndex=10;
        this.currentAlbumIndex=1;
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
