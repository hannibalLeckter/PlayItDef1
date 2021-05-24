import React, { Component } from "react";

import fire from "./fire";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { FaPlay,FaClock } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";

class Crud extends React.Component {
  

  constructor(){
    super();

    this.togglePlay = this.togglePlay.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  };

  state = {
    uploadValue:0,
    picture:null,
    data: [],
    modalInsertar: false,
    modalEditar: false,
    uploadValue:0,
    picture:null,
    play: false,
    form: {
      cancion: "",
      duracion: "",
      audio: "",
      autor: "",
      genero: "",
      portada:""
    },
    id: 0,
  };



  

  peticionGet = () => {
    fire.database().ref().child("canciones").on("value", (cancion) => {
      if (cancion.val() !== null) {
        this.setState({ ...this.state.data, data: cancion.val() });
      } else {
        this.setState({ data: [] });
      }
    });
  };

  peticionPost = () => {
    fire.database().ref().child("canciones").push(this.state.form, (error) => {
      if (error) console.log(error);
    });
    this.setState({ modalInsertar: false });
  };

  peticionPut = () => {
    fire.database().ref().child(`canciones/${this.state.id}`).set(this.state.form, (error) => {
      if (error) console.log(error);
    });
    this.setState({ modalEditar: false });
  };

  peticionDelete = () => {
    if (
      window.confirm(
        `Estás seguro que deseas eliminar el canal ${
          this.state.form && this.state.form.cancion
        }?`
      )
    ) {
        fire.database().ref().child(`canciones/${this.state.id}`).remove((error) => {
        if (error) console.log(error);
      });
    }
  };

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
    console.log(this.state.form);
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

togglePlay(url) {
  console.log(url)
  this.audio = new Audio(url);
  this.setState({ play: !this.state.play });
  console.log(this.audio);
  // this.state.play ? this.audio.play() : this.audio.pause();
  this.audio.play();
 }


  render() {

  
    
    return (
      <div className="App">
        <br />
        <div className="col text-center" >
        <button 
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
            {Object.keys(this.state.data).map((i) => {
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

                  {/* <td className="col-3">{this.state.data[i].audio}</td> */}
                  
                   {/* <td>
                  <div class="row justify-content-center">
                    <button
                      className="btn btn-primary w-25"
                      onClick={() =>
                        this.seleccionarCanal(this.state.data[i], i, "Editar")
                      }
                    >
                      Editar
                    </button>{" "}
                    {"   "}
                    <button
                      className="btn btn-danger w-25"
                      onClick={() =>
                        this.seleccionarCanal(this.state.data[i], i, "Eliminar")
                      }
                    >
                      Eliminar
                    </button>
                    </div>
                  </td>  */}
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
              <br />
              <label>Duracion: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="duracion"
                onChange={this.handleChange}
              />
              <br />
              <label>Pista de audio: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="audio"
                onChange={this.handleChange}
              />
              <br />
              <label>Autor: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="autor"
                onChange={this.handleChange}
              />
              <br />
              <label>Genero: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="genero"
                onChange={this.handleChange}
              />
              <div>
                <progress value={this.state.uploadValue} max="100"></progress>
                <br />
                <input type="file" name="portada" onChange={this.handleUpload}/>
                <br />
                <img width="320" src={this.state.picture} alt="" />
            </div>
              
              <label>Genero: </label>
              <br />
              <input
                value={this.state.picture}
                type="text"
                className="form-control"
                name="portada"
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
              <label>Canal: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="canal"
                onChange={this.handleChange}
                value={this.state.form && this.state.form.cancion}
              />
              <br />
              <label>País: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="pais"
                onChange={this.handleChange}
                value={this.state.form && this.state.form.pais}
              />
              <br />
              <label>Idioma: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="idioma"
                onChange={this.handleChange}
                value={this.state.form && this.state.form.idioma}
              />
              <br />
              <label>Cantidad de Suscriptores (millones): </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="suscriptores"
                onChange={this.handleChange}
                value={this.state.form && this.state.form.suscriptores}
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
