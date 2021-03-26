import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import theme from "../Theme.js";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import AdEditModal from "./AdEditModal";
import AdDelete from "./AdDelete";


const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  card: {
    maxWidth: 345,
    borderRadius: 1,
    borderColor: "black",
  },
  media: {
    height: 140,
  },
});

const AdCards = () => {
  const classes = useStyles();
  const [ads, setAds] = useState([]);

  const fetchData = () => {
    fetch("http://localhost:3001/Ads")
      .then((res) => res.json())
      .then((ads) => setAds(ads.ads));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={4}>
            {ads &&
              ads.length > 0 &&
              ads.map((item) => (
                <Grid key={item._id} item>
                  <Card className={classes.card}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={item.adImage}
                        src={item.adImage}
                        title={item.mainHeader}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {item.mainHeader}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {item.subHeader}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <AdEditModal Ad={item} />
                      <AdDelete item={item} />
                    </CardActions>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
    </MuiThemeProvider>
  );
};

export default AdCards;
