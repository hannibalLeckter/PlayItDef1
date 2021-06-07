import React, { useState } from "react";
import fire from "./fire";
import Music from "./Music";
import Crud from "./crud";
import Side from "./Sidebar";
import {
  FaPlay,
  FaTrashAlt,
  FaEdit,
  FaUserAlt,
  FaUserEdit,
  FaLock,
  FaHome,
} from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { MdSettings } from "react-icons/md";
import { ImExit } from "react-icons/im";
import "./hero.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";

import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  Switch,
} from "react-router-dom";
import Admin from "./admin";
import User from "./user";
import App from "./App";
import Login from "./Login";
import Prueba from "./prueba";
import Sidebar from "./Sidebar";

const Hero = (props) => {
  const CurrentUser = fire.auth().currentUser;

  const [showMe, setShowMe] = useState(true);
  const [modelPerfil, setModelPerfil] = useState(false);
  const [uploadValue, setUploadValue] = useState(0);

  const [picture, setPicture] = useState(CurrentUser.photoURL);
  const [nombreUsuario, setDisplayName] = useState(CurrentUser.displayName);

  var profileImg = CurrentUser.photoURL;
  const showHide = () => {
    const CurrentUser1 = fire.auth().currentUser.email;

    console.log(CurrentUser1);

    if (CurrentUser1 == "admin@gmail.com") {
      console.log("yes");
      setShowMe(true);
    } else {
      console.log("no");
      setShowMe(false);
    }
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    console.log(file);
    const storageRef = fire.storage().ref(`/fotos/${file.name}`);
    const task = storageRef.put(file);

    task.on(
      "state-changed",
      (snapshot) => {
        let percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // this.setState({
        //     uploadValue:percentage
        // })
        setUploadValue(percentage);
      },
      (error) => {
        console.log(error.message);
      },
      () => {
        storageRef.getDownloadURL().then((url) => {
          // this.setState({
          //     uploadValue:100,
          //     picture:url
          // })
          setUploadValue(100);
          setPicture(url);
          console.log(url);
        });
      }
    );
  };

  // handleChangeName = (e) =>{

  // }

  const updateProfileUser = () => {
    const update = {
      displayName: nombreUsuario,
      photoURL: picture,
    };

    console.log(nombreUsuario);

    CurrentUser.updateProfile(update);
    console.log(CurrentUser.displayName);
    setModelPerfil(false);
    window.location.reload(false);
  };

  var Component = showMe ? Admin : User;

  return (
    <Router>
      <section className="hero" onLoad={showHide}>
        <nav className="nav">

        {profileImg == null ? (
          <img
            className="nav_img"
            src="https://firebasestorage.googleapis.com/v0/b/playit-db.appspot.com/o/fotos%2Fno%20user.jpg?alt=media&token=97e4f992-708a-454a-9967-6c0e890a7865"
          />
          ) : (
            <img
            className="nav_img"
            src={CurrentUser.photoURL}
          />
          )}
          {/* <img src={
                     
                        ? "https://firebasestorage.googleapis.com/v0/b/playit-db.appspot.com/o/fotos%2Fno%20user.jpg?alt=media&token=80991683-7be7-42c3-abd2-bf3408cbed03"
                        : CurrentUser.photoURL
                    } alt="" className="nav_img" /> */}

          <h2 className="h2navbar">
            Bienvenido, <br/> <b>{CurrentUser.displayName}</b>
          </h2>


          <div className="containerdor">
            <a
              onClick={props.handleLogout}
              class="btn1 effect01"
              target="_blank"
            >
              <NavLink
                exact
                activeClassName="active"
                to="/"
                style={{ color: "white" }}
              >
                <span>
                  <ImExit style={{ width: "30px", height: "30px" }} />
                </span>
              </NavLink>
            </a>

            <a
              class="btn1 effect01"
              target="_blank"
              onClick={() => setModelPerfil(true)}
            >
              <span>
                <FaUserEdit style={{ width: "35px", height: "35px" }} />
              </span>
            </a>
          </div>
        </nav>

        <Sidebar />
        {/* <Carousel/> */}
        <Component />

        <Modal isOpen={modelPerfil} className="modal-lg">
          <ModalHeader>Perfil de usuario </ModalHeader>
          <ModalBody>
            <div className="form-group">
              <div className="cont_img">
                <div className="img_user">
                  <p>Foto actual</p>
                  <img
                    className="input_img"
                    src={
                      profileImg == null
                        ? "https://firebasestorage.googleapis.com/v0/b/playit-db.appspot.com/o/fotos%2Fno%20user.jpg?alt=media&token=80991683-7be7-42c3-abd2-bf3408cbed03"
                        : CurrentUser.photoURL
                    }
                    alt=""
                  />
                  <br />
                </div>

                <div className="img_new">
                <p>Nueva foto</p>
                  <img className="input_img" src={picture} alt="" />
                  
                </div>

              </div>
              <br />
                  <progress value={uploadValue} max="100"></progress>
                  <br />
                  <input type="file" onChange={handleUpload} />
                  <br />

              <label className="input-name">Nombre de usuario: </label>
              <br />
              <input
                placeholder={CurrentUser.displayName}
                type="text"
                className="form-control"
                onChange={(e) => setDisplayName(e.target.value)}
              />
              <br />
              <label>Email: </label>
              <br />
              <input
                disabled
                value={CurrentUser.email}
                type="text"
                className="form-control"
                name="duracion"
              />
              <br />
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="containerdor2">
              <a className="btn2 effect01" onClick={updateProfileUser}>
                <span><FaEdit style={{ width: "35px", height: "35px" }}/></span>
              </a>
              {"   "}
              <a
                className="btn2 effect01"
                onClick={() => setModelPerfil(false)}
              >
                <span>
                  <ImCross style={{ width: "35px", height: "35px" }} />
                </span>
              </a>
            </div>
          </ModalFooter>
        </Modal>
      </section>
    </Router>
  );
};

export default Hero;
