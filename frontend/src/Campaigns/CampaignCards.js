import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import theme from "../Theme";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import img1 from "../testPhotos/campaignImageHolder.png";
import EditModal from "./EditModal";
import ViewCampaign from "./ViewCampaign";

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

const CampaignCard = () => {
  const classes = useStyles();
  const [campaigns, setCampaigns] = useState([]);

  const handleDelete = (campaignID) => {
    // console.log(campaignID);
    fetch("http://localhost:3001/Campaigns/" + campaignID, {
      method: "DELETE",
      headers: {},
    }).then((res) => console.log(res));
    window.location.reload();
  };

  const fetchData = () => {
    fetch("http://localhost:3001/Campaigns")
      .then((res) => res.json())
      .then((camps) => setCampaigns(camps.campaigns));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={4}>
            {console.log("campaigns length", campaigns)}
            {campaigns &&
              campaigns.length > 0 &&
              campaigns.map((item) => (
                <Grid key={item._id} item>
                  <Card className={classes.card}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={img1}
                        title={item.campaignTitle}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {item.campaignTitle}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {item.startTime} to {item.endTime}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {item.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <ViewCampaign Campaign={item} />
                      <EditModal Campaign={item} />
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </Button>
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

export default CampaignCard;
