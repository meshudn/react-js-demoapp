import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

/* 
 * A react component for rendering Albums 
 * I also use Card here..
*/
const useStyles = makeStyles({
      root: {
        maxWidth: 284,
        paddingRight: 8,
        paddingLeft: 8,
        paddingBottom: 15
  
      }
    });

function Album(props){
      const classes = useStyles();
      return(
            <Card className={classes.root} onClick={(e) => {props.onClick(e,props.albumId)}}>
                  <CardActionArea>
                        <CardMedia
                        component="img"
                        width="50%"
                        image={props.url}
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                         <h5>Album id: {props.albumId}</h5>
                        </Typography>
                        </CardContent>
                  </CardActionArea>
             </Card>

            // <div className="single-photos" onClick={(e) => {this.props.onClick(e,this.props.albumId)}}>
            //       <img src={this.props.url} />
            //       <h4>Album {this.props.albumId}</h4>
            //  </div>
       )
}
export default Album;