import React, { Component , useState } from "react";

import fire from "./fire";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { FaPlay,FaTrashAlt,FaEdit,FaSearch } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import './formSearch.css';
import "./Sidebar.css";
import "./Footer.css";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import RepeatIcon from "@material-ui/icons/Repeat";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import "./Footer.css";
import "./App.css";
import { Grid, Slide, Slider } from "@material-ui/core";
import { VolumeDown, VolumeMute, VolumeUp } from "@material-ui/icons";

class Crud extends React.Component {
  

  constructor(){
    super();

    this.togglePlay = this.togglePlay.bind(this);
    this.muteMusic = this.muteMusic.bind(this);
    this.upMusic = this.upMusic.bind(this);
    this.downMusic = this.downMusic.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleUpload2 = this.handleUpload2.bind(this);
    this.audio = new Audio();
    this.oldurl = "";
    
  };

  state = {
    uploadValue:0,
    picture:null,
    data: [],
    cola: "",
    modalInsertar: false,
    modalCola:false,
    modalEditar: false,
    uploadValue2:0,
    picture:null,
    song:null,
    play: false,
    prueba:false,
    nombreSong:"",
    nombreArtist:"",
    nombrePortada:"",
    volumen:1,
    cancionError:"",
    duracionError:"",
    autorError:"",
    generoError:"",
    portadaError:"",
    audioError:"",
    showMe:true,
    searchTerm:"",
    form: {
      cancion: "",
      duracion: "",
      autor: "",
      genero: "",
      portada:"",
      audio:""
    },
    id: 0,
  };



  

  peticionGet = () => {
    // fire.database().ref().child("canciones").on("value", (cancion) => {
    //   if (cancion.val() !== null) {
    //     this.setState({ ...this.state.data, data: cancion.val() });
    //   } else {
    //     this.setState({ data: [] });
    //   }
    // });
    fire.database().ref().child("canciones").on("value", snapshot=>{
      let songList = [];
      snapshot.forEach(snap=>{
        songList.push(snap.val());
      });
      this.setState({data:songList});
    })
  };

  peticionPost = () => {
    const isValid=this.validate();
   if(isValid){
    fire.database().ref().child("canciones").push(this.state.form, (error) => {
      if (error) console.log(error);
    });
    this.setState({ modalInsertar: false });
  }
  };

  // peticionPut = () => {
  //   fire.database().ref().child(`canciones/${this.state.id}`).set(this.state.form, (error) => {
  //     if (error) console.log(error);
  //   });
  //   this.setState({ modalEditar: false });
  // };

  // peticionDelete = () => {
  //   if (
  //     window.confirm(
  //       `Estás seguro que deseas eliminar la cancion ${
  //         this.state.form && this.state.form.cancion
  //       }?`
  //     )
  //   ) {
  //       fire.database().ref().child(`canciones/${this.state.id}`).remove((error) => {
  //       if (error) console.log(error);
  //     });
  //   }
  // };

  handleChange = (e) => {
  
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
    console.log(this.state.form);
    //clear form
 
  };

  

  seleccionarCanal = async (cancion, id, caso) => {
    await this.setState({ form: cancion, id: id });

    caso === "Editar"
      ? this.setState({ modalEditar: true })
      : this.peticionDelete();
  };

  componentDidMount() {
    this.peticionGet();
  };


  handleUpload(event){
    const file = event.target.files[0];
    const storageRef = fire.storage().ref(`/fotos/${file.name}`);
    const task = storageRef.put(file);

    task.on('state-changed', snapshot =>{
        let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) *100;
        this.setState({
            uploadValue:percentage
        })
    },error=>{
        console.log(error.message)
    },()=>{
        storageRef.getDownloadURL().then(url=>{
            this.setState({
                uploadValue:100,
                picture:url
            })
        })
        })
    
}

handleUpload2(event){
  const file2 = event.target.files[0];
  const storageRef2 = fire.storage().ref(`/musica/${file2.name}`);
  const task2 = storageRef2.put(file2);

  task2.on('state-changed', snapshot =>{
      let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) *100;
      this.setState({
          uploadValue2:percentage
      })
  },error=>{
      console.log(error.message)
  },()=>{
      storageRef2.getDownloadURL().then(url1=>{
          this.setState({
              uploadValue2:100,
              song:url1
          })
      })
      })
  
}

validate = () =>{
  let cancionError="";
  let duracionError="";
  let autorError="";
  let generoError="";
  let portadaError="";
  let audioError="";
  if(!this.state.form.cancion){
    cancionError="Debes introducir el titulo de la cancion";
  }

  if(!this.state.form.duracion){
    duracionError="Debes introducir la duracion de la cancion";
  }

  if(!this.state.form.autor){
    autorError="Debes introducir el autor de la cancion";
  }

  if(!this.state.form.genero){
    generoError="Debes introducir el genero de la cancion";
  }

  if(!this.state.form.portada){
    portadaError="Debes introducir la portada de la cancion";
  }

  if(!this.state.form.audio){
    audioError="Debes introducir el audio de la cancion";
  }

  if(cancionError || duracionError || autorError || generoError || portadaError || audioError){
    this.setState({cancionError,duracionError,autorError,generoError,portadaError,audioError});
    return false;
  }
  return true;

}

muteMusic() {
    if(this.oldurl==""){
      alert("No song selected")
    }

    if(this.audio.volume!=0.0){
      this.audio.volume=0.0;
      this.setState({ volumen: 0 });
    }
    else{
      this.audio.volume=1.0;
      this.setState({ volumen: 1 });
    }
    console.log(this.audio.volume)
}

downMusic() {
    if(this.audio.volume==5.551115123125783e-17){
        console.log("No se puede bajar mas el volumen.")
    }
    else if (this.audio.volume>0){
        this.audio.volume=this.audio.volume-0.2;
        this.setState({ volumen: this.state.volumen-0.2 });
    }
    console.log(this.audio.volume);
}
upMusic() {
    if(this.audio.volume==1){
        console.log("No se puede subir mas el volumen.")
    }
    else if (this.audio.volume<1){
        this.audio.volume=this.audio.volume+0.2;
        this.setState({ volumen: this.state.volumen+0.2 });
    }
    console.log("Subiendo volumen...",this.audio.volume);
}

addCola(song){
  this.setState({cola: this.state.cola+song+", "})
  alert("Se ha añadido "+song+" a la cola.");
}

 togglePlay(url,nombre,artista, portada) {
  this.setState({nombreSong:nombre});
  this.setState({nombreArtist:artista});
  this.setState({nombrePortada:portada});

  if(this.oldurl==""){
    this.oldurl=url;
    this.audio.src=this.oldurl;
    if(this.audio.paused){
      this.audio.play();
      this.setState({ prueba: this.state.prueba=true });
    }
    else{
      this.audio.pause();
       this.setState({ prueba: this.state.prueba=false });
    }
   }
  else{
     if(this.oldurl==url){
        if(this.audio.paused){
          this.audio.play();
           this.setState({ prueba: this.state.prueba=true });
        }
        else{
          this.audio.pause();
           this.setState({ prueba: this.state.prueba=false });
        }
     }
     else{
        this.audio.src=url;
        this.oldurl=url;
        if(this.audio.paused){
          this.audio.play();
           this.setState({ prueba: this.state.prueba=true });
        }
        else{
          this.audio.pause();
           this.setState({ prueba: this.state.prueba=false });
        }
     }
   }
}





  render() {
    const {data,searchTerm} = this.state
    
    return (
      
      
      <div className="App crud" >
        <br />
        <div className="footer">
          <div className="footer__left">
          {this.state.nombrePortada!="" ? (
          <img
            className="footer__albumLogo"
            src={this.state.nombrePortada}
          />
          ) : (
            <img
            className="footer__albumLogo"
            src="https://firebasestorage.googleapis.com/v0/b/playit-db.appspot.com/o/fotos%2Falbum.jpg?alt=media&token=3daa07fa-eabc-4a20-82f6-aed5ec999f98"
          />
          )}
          {this.state.prueba ? (
          <div className="footer__songInfo">
              <h4>{this.state.nombreSong}</h4>
              <p>{this.state.nombreArtist}</p>
            </div>
          ) : (
          <div className="footer__songInfo">
              <h4>PlayIt!</h4>
              <p>Reproduce una canción</p>
            </div>
          )}
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
            <Slider aria-labelledby="continuous-slider" max={1} min={0} defaultValue={this.state.volumen} value={this.state.volumen}/>
          </Grid>
        </Grid>
      </div>
    </div>
            
        <div class="form__group field">
          <input class="form__field"  name="name" id='name' required type="text"  autoComplete="off" placeholder="Buscar..." onChange={event => this.setState({searchTerm:event.target.value})}/>
          <label for="name" class="form__label"><FaSearch/> Cancion o Artista</label>
        </div>

        {/* <input type="text"  placeholder="Search..." onChange={event => this.setState({searchTerm:event.target.value})}/> */}

        <div className="containerdor2" >
        
        {/* <button 
          style={{visibility: this.state.showMe ? 'visible' : 'hidden' }}
          className="btn btn-success w-25 center"
          onClick={() => this.setState({ modalCola: true })}
        >
          Ver Cola
        </button> */}

        <a 
          className="btn3 effect01"
          onClick={() => this.setState({ modalCola: true })}
        >
          <span>Ver Cola</span>
        </a>

        </div>
        <br />
        <br />
        
        <div className="d-flex justify-content-center">
        <table className="table text-white w-50 ">
          <tbody>
          <tr>
            <th className="col-1">#</th>
            <th className="col-2">Portada</th>
            <th className="col-3">Titulo</th>
            <th className="col-3">Genero</th>
            <th className="col-3">Duracion</th>
            <th className="col-3">Añadir cola</th>
          </tr>
             {/* {
             
             Object.keys(this.state.data).map((i) => {
              // console.log(i);
              return (
                <tr key={i}>
                  <td className="col-1 ">
                      <p><FaPlay onClick={() =>
                        this.togglePlay(this.state.data[i].audio)
                      }/></p>
                    
                  </td>
                  <td className="col-3"><img src={this.state.data[i].portada}></img></td>
                  <td className="col-3 ">{this.state.data[i].cancion}<br></br>
                  <p>{this.state.data[i].autor}</p></td>
                  <td className="col-3">{this.state.data[i].genero}</td>
                  <td className="col-3">{this.state.data[i].duracion}</td>

                  
                  
                   <td>
                  <div style={{visibility: this.state.showMe ? 'visible' : 'hidden' }} class="row justify-content-center">
                   
                    <p><FaEdit onClick={() =>
                        this.seleccionarCanal(this.state.data[i], i, "Editar")
                      }/></p>
                    {" "}
                    {"   "}
                    
                    <p><FaTrashAlt onClick={() =>
                        this.seleccionarCanal(this.state.data[i], i, "Eliminar")
                      }/></p>
                    </div>
                  </td> 
                </tr>
              );
            })}  */}
            {data.filter((val)=>{
              if(searchTerm==""){
                return val;
              }else if(val.cancion.toLowerCase().includes(searchTerm.toLowerCase()) || val.autor.toLowerCase().includes(searchTerm.toLowerCase())){
                return val;
              }
            }).map((data,key) =>{
  return(
    <tr key={key}>
                  <td className="col-1 ">
                      {this.state.prueba ? (
                        <PauseCircleOutlineIcon
                        onClick={() =>
                          this.togglePlay(data.audio, data.cancion, data.autor, data.portada)
                        }
                        fontSize="large"
                        className="footer__icon"
                      />
                        ) : (
                        <PlayCircleOutlineIcon
                        onClick={() =>
                          this.togglePlay(data.audio, data.cancion, data.autor)
                        }
                        fontSize="large"
                        className="footer__icon"
                      />
                        )}
                    
                  </td>
                  <td className="col-3"><img src={data.portada}></img></td>
                  <td className="col-3 ">{data.cancion}<br></br>
                  <p>{data.autor}</p></td>
                  <td className="col-3">{data.genero}</td>
                  <td className="col-3">{data.duracion}</td>
                  <td className="col-1 ">
                        <PlaylistPlayIcon
                        onClick={() =>
                          this.addCola(data.cancion)
                        }
                        fontSize="large"
                        className="footer__icon"
                      />
                  </td>

                   <td>                 
                  </td> 
                </tr>
  );
})}
          </tbody>
        </table>
      </div>
        

        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>Insertar Registro</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label>Cancion: </label>
              <br />
              <input 
        
                type="text"
                className="form-control"
                name="cancion"
                onChange={this.handleChange}
              />
              <div className="text-danger">{this.state.cancionError}</div>
              <br />
              <label>Duracion: </label>
              <br />
              <input
                
                type="text"
                className="form-control"
                name="duracion"
                onChange={this.handleChange}
              />
              <div className="text-danger">{this.state.duracionError}</div>
              <br />
              <label>Autor: </label>
              <br />
              <input
                reqired
                type="text"
                className="form-control"
                name="autor"
                onChange={this.handleChange}
              />
              <div className="text-danger">{this.state.autorError}</div>
              <br />
              <label>Genero: </label>
              <br />
              <input
                
                type="text"
                className="form-control"
                name="genero"
                onChange={this.handleChange}
              />
              <div className="text-danger">{this.state.generoError}</div>
              <div>
                <progress value={this.state.uploadValue} max="100"></progress>
                <br />
                <input  type="file" name="portada" onChange={this.handleUpload}/>
                <br />
                <img width="320" src={this.state.picture} alt="" />
                <div className="text-danger">{this.state.portadaError}</div>
            </div>
              
              <label>Url imagen: </label>
              <br />
              <input
                value={this.state.picture}
                type="text"
                className="form-control"
                name="portada"
                // onBlur={this.handleChange}
                onMouseMove={this.handleChange}
              />
              <div>
                <progress value={this.state.uploadValue2} max="100"></progress>
                <br />
                <input type="file" name="audio" onChange={this.handleUpload2}/>
                <div className="text-danger">{this.state.audioError}</div>
            </div>
              
              <label>Url cancion: </label>
              <br />
              <input
                value={this.state.song}
                type="text"
                className="form-control"
                name="audio"
                // onBlur={this.handleChange}
                onMouseMove={this.handleChange}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-primary"
              onClick={() => this.peticionPost()}
            >
              Insertar
            </button>
            {"   "}
            <button
              className="btn btn-danger"
              onClick={() => this.setState({ modalInsertar: false })}
            >
              Cancelar
            </button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalCola}>
          <ModalHeader>Cola de canciones</ModalHeader>
          <ModalBody>
            <div className="form-group">
              {this.state.cola}
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-danger"
              onClick={() => this.setState({ modalCola: false })}
            >
              Cancelar
            </button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalEditar}>
          <ModalHeader>Editar Registro</ModalHeader>
          <ModalBody>
          
            <div className="form-group">
              <label>Cancion: </label>
              <br />
              <input 
                value={this.state.form && this.state.form.cancion}
                type="text"
                className="form-control"
                name="cancion"
                onChange={this.handleChange}
              />
              <div className="text-danger">{this.state.cancionError}</div>
              <br />
              <label>Duracion: </label>
              <br />
              <input
                value={this.state.form && this.state.form.duracion}
                type="text"
                className="form-control"
                name="duracion"
                onChange={this.handleChange}
              />
              <div className="text-danger">{this.state.duracionError}</div>
              <br />
              <label>Autor: </label>
              <br />
              <input
                value={this.state.form && this.state.form.autor}
                type="text"
                className="form-control"
                name="autor"
                onChange={this.handleChange}
              />
              <div className="text-danger">{this.state.autorError}</div>
              <br />
              <label>Genero: </label>
              <br />
              <input
                value={this.state.form && this.state.form.genero}
                type="text"
                className="form-control"
                name="genero"
                onChange={this.handleChange}
              />
              
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-primary"
              onClick={() => this.peticionPut()}
            >
              Editar
            </button>
            {"   "}
            <button
              className="btn btn-danger"
              onClick={() => this.setState({ modalEditar: false })}
            >
              Cancelar
            </button>
          </ModalFooter>
        </Modal>
      </div>
      
    );
  }
}

export default Crud;
