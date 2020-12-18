import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
      maxWidth: 284,
      paddingRight: 8,
      paddingLeft: 8,
      marginBottom: 25,
    }
  });

function SinglePhotos(props){
   const classes = useStyles();
   return(
    <Card className={classes.root}>
    <CardActionArea>
      <CardMedia
        component="img"
        width="50%"
        image={props.url}
      />
      <CardContent>
      <Typography gutterBottom variant="h5" component="h2">
            <h5>Photo id: {props.id}</h5> 
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          <p> {props.title}</p> 
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>

    //    <div className="single-photos">
    //         <img src={props.url} />
    //         <h4>{props.title}</h4>
    //         <h5>{props.id}</h5>
    //    </div>
   )
}

export default SinglePhotos;