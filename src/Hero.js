import React, { useState } from "react";
import fire from "./fire";
import Music from "./Music";
import Crud from "./crud";
import Side from "./Sidebar";
import { FaPlay, FaTrashAlt, FaEdit, FaUserAlt, FaLock } from "react-icons/fa";
import { MdSettings } from "react-icons/md";
import { ImExit } from "react-icons/im";
import "./hero.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  Switch,
} from "react-router-dom";
import Admin from "./admin";
import User from "./user";

const Hero = (props) => {
  const mystyle = {
    padding: "10px",
    fontFamily: "Arial",
    width: "100%",
  };

  const [showMe, setShowMe] = useState(true);
  const [dropdown, setDropdown] = useState(false);
  const abrirCerrarDropdown = () => {
    setDropdown(!dropdown);
  };

  const CurrentUser = fire.auth().currentUser;

  const cutEmail = CurrentUser.email;
  const res = cutEmail.split("");
  console.log(res);
  var res2 = " ";

  for (let i = 0; i < res.length; i++) {
    if (res[i] != "@") {
      res2 = res2 + res[i];
    } else if (res[i] == "@") {
      break;
    }
  }
  console.log(res2);
  CurrentUser.updateProfile({ displayName: res2 });

  const showHide = () => {
    const CurrentUser = fire.auth().currentUser.email;

    console.log(CurrentUser);

    if (CurrentUser == "admin@gmail.com") {
      console.log("yes");
      setShowMe(true);
    } else {
      console.log("no");
      setShowMe(false);
    }
  };

  return (
    <Router>
      <section className="hero" onLoad={showHide}>
        <nav className="nav">
          <h2>Bienvenido {res2}</h2>

          {/* <Dropdown  isOpen={dropdown} toggle={abrirCerrarDropdown} style={{ position: 'relative', zIndex: '100' }} direction="left" >
                     <DropdownToggle >
                     <FaUserAlt/>
                     </DropdownToggle>

                     <DropdownMenu >
                     <DropdownItem header style={mystyle}>Opciones</DropdownItem>
                     <DropdownItem divider style={mystyle}></DropdownItem>
                        <DropdownItem style={{visibility: showMe ? 'visible' : 'hidden' }}><NavLink exact activeClassName="active" to="/admin">Admin</NavLink></DropdownItem>
                        <DropdownItem style={mystyle}><NavLink exact activeClassName="active" to="/user">User</NavLink></DropdownItem>
                         <DropdownItem style={mystyle}><FaUserAlt/> Ver perfil</DropdownItem>
                         <DropdownItem style={mystyle} onClick={props.handleLogout}><ImExit/> Cerrar Sesion</DropdownItem>
                     </DropdownMenu>
                 </Dropdown> */}

          <div class="container">
            <a
              href="https://twitter.com/masuwa1018"
              class="btn1 effect01"
              target="_blank"
            >
              <span>
                <FaLock />
              </span>
            </a>
            <a
              href="https://twitter.com/masuwa1018"
              class="btn1 effect01"
              target="_blank"
            >
              <span>
                <FaUserAlt />
              </span>
            </a>
            <a
              href="https://twitter.com/masuwa1018"
              class="btn1 effect01"
              target="_blank"
            >
              <span>
                <ImExit />
              </span>
            </a>
          </div>
        
        </nav>

        <Switch>
          <Route exact path="/user" component={User}></Route>
          <Route exact path="/admin" component={Admin}></Route>
        </Switch>
      </section>
    </Router>
  );
};

export default Hero;
