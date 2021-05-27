import React, { Component , useState } from "react";

import fire from "./fire";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { FaPlay,FaTrashAlt,FaEdit } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import './formSearch.css';
import "./Sidebar.css";

class Crud extends React.Component {
  

  constructor(){
    super();

    this.togglePlay = this.togglePlay.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleUpload2 = this.handleUpload2.bind(this);

    
  };

  state = {
    uploadValue:0,
    picture:null,
    data: [],
    modalInsertar: false,
    modalEditar: false,
    uploadValue2:0,
    picture:null,
    song:null,
    play: false,
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

togglePlay(url) {
  console.log(url)
  this.audio = new Audio(url);
  this.setState({ play: !this.state.play });
  console.log(this.audio);
  // this.state.play ? this.audio.play() : this.audio.pause();
  this.audio.play();
 }

 showHide(){
  const CurrentUser = fire.auth().currentUser.email;
  
console.log(CurrentUser);

  if(CurrentUser=="admin@gmail.com"){
    console.log("yes");
     this.setState({showMe:true});
  }else{
    console.log("no");
    this.setState({showMe:false});
  }
    
 }

  render() {
    const {data,searchTerm} = this.state
    const filteredSongs = data.filter(song =>{
      song.cancion.toLowerCase().includes(searchTerm.toLowerCase())
    })
    return (
      
      
      <div className="App" onLoad={()=>this.showHide()}>
        <br />
            
        <div class="form__group field">
          <input class="form__field"  name="name" id='name' required type="text"  autoComplete="off" placeholder="Buscar..." onChange={event => this.setState({searchTerm:event.target.value})}/>
          <label for="name" class="form__label">Buscar...</label>
        </div>

        {/* <input type="text"  placeholder="Search..." onChange={event => this.setState({searchTerm:event.target.value})}/> */}

        <div className="col text-center" >
          <button 
          style={{visibility: this.state.showMe ? 'visible' : 'hidden' }}
          className="btn btn-success w-25 center"
          onClick={() => this.setState({ modalInsertar: true })}
        >
          Insertar
        </button>
        </div>
        <br />
        <br />
        
    
        <table className="table text-white w-100 d-flex justify-content-center ">
          <tbody>
          <tr>
            <th className="col-1">#</th>
            <th className="col-2">Portada</th>
            <th className="col-3">Titulo</th>
            <th className="col-3">Genero</th>
            <th className="col-3">Duracion</th>
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
              }else if(val.cancion.toLowerCase().includes(searchTerm.toLowerCase())){
                return val;
              }
            }).map((data,key) =>{
  return(
    <tr key={key}>
                  <td className="col-1 ">
                      <p><FaPlay onClick={() =>
                        this.togglePlay(data.audio)
                      }/></p>
                    
                  </td>
                  <td className="col-3"><img src={data.portada}></img></td>
                  <td className="col-3 ">{data.cancion}<br></br>
                  <p>{data.autor}</p></td>
                  <td className="col-3">{data.genero}</td>
                  <td className="col-3">{data.duracion}</td>

                   <td>
                  
                  {/* <div style={{visibility: this.state.showMe ? 'visible' : 'hidden' }} class="row justify-content-center">
                   
                    <p><FaEdit onClick={() =>
                        this.seleccionarCanal(data, data.uid, "Editar")
                      }/></p>
                    {" "}
                    {"   "}
                    
                    <p><FaTrashAlt onClick={() =>
                        this.seleccionarCanal(data, data.uid, "Eliminar")
                      }/></p>
                    </div> */}
                  
                  </td> 
                </tr>
  );
})}
          </tbody>
        </table>



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
