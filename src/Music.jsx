import React, { Component } from "react"
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import RepeatIcon from "@material-ui/icons/Repeat";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import "./Footer.css";
import { Grid, Slide, Slider } from "@material-ui/core";
import { VolumeDown, VolumeMute, VolumeUp } from "@material-ui/icons";




class Music extends React.Component {
constructor(props) {
super(props);
this.state = { play: false };
this.url = "http://streaming.tdiradio.com:8000/house.mp3";
//this.url = "./music/Monster - Meg&Dia.mp3";
this.audio = new Audio(this.url);
this.togglePlay = this.togglePlay.bind(this);
this.downMusic = this.downMusic.bind(this);
this.upMusic = this.upMusic.bind(this);
this.muteMusic = this.muteMusic.bind(this);

this.sound = document.querySelectorAll('audio');
}

togglePlay() {
    this.setState({ play: !this.state.play });
    console.log(this.audio);
    this.state.play ? this.audio.play() : this.audio.pause();
}
downMusic() {
    if(this.audio.volume==5.551115123125783e-17){
        console.log("No se puede bajar mas el volumen.")
        this.setState({ play: !this.state.play });
    }
    else if (this.audio.volume>0){
        this.audio.volume=this.audio.volume-0.2;
        this.setState({ play: !this.state.play });
    }
    console.log(this.audio.volume);
}
upMusic() {
    if(this.audio.volume==1){
        console.log("No se puede subir mas el volumen.")
        this.setState({ play: !this.state.play });
    }
    else if (this.audio.volume<1){
        this.audio.volume=this.audio.volume+0.2;
        this.setState({ play: !this.state.play });
    }
    console.log("Subiendo volumen...",this.audio.volume);
}
muteMusic() {
  let audios = [...document.getElementsByTagName('audio')];
  audios.forEach(audio => audio.volume = 0.5) // lower volume 50%.

    console.log(this.sound);
    if(this.sound.volume!=0){
        console.log("Quitando volumen...");
        //this.audio.volume=0.0;
        this.sound.volume=0.0;
        this.setState({ play: !this.state.play });
    }
    else{
        console.log("Poniendo volumen...");
        this.sound.volume=1;
        this.setState({ play: !this.state.play });
    }
}


render() {
return (
    <div className="footer">
      <div className="footer__left">
        <img
          className="footer__albumLogo"
          src="https://cdn.themedizine.com/2018/07/Anuel-AA-Real-Hasta-La-Muerte-Album.jpg"
        />
        {this.state.play ? (
        <div className="footer__songInfo">
            <h4>{this.audio.localName}</h4>
            <p>Anuel AA</p>
          </div>
        ) : (
        <div className="footer__songInfo">
            <h4>{this.audio.localName}</h4>
            <p>Anuel AA</p>
          </div>
        )}
      </div>

      <div className="footer__center">
        <ShuffleIcon className="footer__green" />
        <SkipPreviousIcon className="footer__icon" />
        {this.state.play ? (
        <PlayCircleOutlineIcon
            onClick={this.togglePlay}
            fontSize="large"
            className="footer__icon"
          />
        ) : (
        <PauseCircleOutlineIcon
            onClick={this.togglePlay}
            fontSize="large"
            className="footer__icon"
          />
        )}
        <SkipNextIcon className="footer__icon" />
        <RepeatIcon className="footer__green" />
      </div>
      <div className="footer__right">
        <Grid container spacing={2}>
          <Grid item>
            <PlaylistPlayIcon />
          </Grid>
          <Grid item>
            <VolumeDownIcon className="footer__icon" onClick={this.downMusic}/>
          </Grid>
          <Grid item>
            <VolumeUp className="footer__icon" onClick={this.upMusic}/>
          </Grid>
          <Grid item>
            <VolumeMute className="footer__icon" onClick={this.muteMusic}/>
          </Grid>
          <Grid item xs>
            <Slider aria-labelledby="continuous-slider" max={1} min={0} defaultValue={this.audio.volume} value={this.audio.volume}/>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
}

export default Music;