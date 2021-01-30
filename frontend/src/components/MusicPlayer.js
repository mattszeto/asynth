import React, { Component } from "react";
import {
  Grid,
  Typography,
  Card,
  LinearProgress,
  IconButton,
} from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import SkipNextIcon from "@material-ui/icons/SkipNext";

export default class MusicPlayer extends Component {
  constructor(props) {
    super(props);
  }

  skipSong() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "applications/json" },
    };
    fetch("/spotify/skip", requestOptions);
  }

  pauseSong() {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "applications/json" },
    };
    fetch("/spotify/pause", requestOptions);
  }

  playSong() {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "applications/json" },
    };
    fetch("/spotify/play", requestOptions);
  }

  render() {
    const songProgress = (this.props.time / this.props.duration) * 100;
    return (
      <Card>
        <Grid container alignItems="center">
          <Grid item xs={4} align="center">
            <img src={this.props.image_url} height="100%" width="100%" />
          </Grid>
          <Grid item xs={8} align="center">
            <Typography component="h5" variant="h5">
              {this.props.title}
            </Typography>
            <Typography color="textSecondary" variant="subtitle1">
              {this.props.artist}
            </Typography>
            <Grid item xs={0}>
              <IconButton
                onClick={() => {
                  this.props.is_playing ? this.pauseSong() : this.playSong();
                }}
              >
                <Grid item align="center">
                  {this.props.is_playing ? <PauseIcon /> : <PlayArrowIcon />}
                  <Typography color="textSecondary" variant="subtitle1">
                    Skips
                  </Typography>
                </Grid>
              </IconButton>
              <IconButton onClick={() => this.skipSong()}>
                <Grid item align="center">
                  <SkipNextIcon />
                  <Typography color="textSecondary" variant="subtitle1">
                    {this.props.votes} / {this.props.votes_required}
                  </Typography>
                </Grid>
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <LinearProgress variant="determinate" value={songProgress} />
      </Card>
    );
  }
}
