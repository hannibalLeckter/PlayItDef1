import React, { useState } from "react";
import fire from "./fire";
import Music from "./Music";
import Crud from "./crud";
import Side from "./Sidebar";
import { FaPlay, FaTrashAlt, FaEdit, FaUserAlt, FaLock,FaHome } from "react-icons/fa";
import { MdSettings } from "react-icons/md";
import { ImExit } from "react-icons/im";
import "./hero.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Carousel,
  
} from 'reactstrap';


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

  const [showMe, setShowMe] = useState(true);
 

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


  var Component = showMe  ? Admin : User;

  return (
    <Router>
      <section className="hero" onLoad={showHide}>
        <nav className="nav">
          <h2>Bienvenido <b>{res2}</b></h2>


          <div className="containerdor">

          <a
              onClick={props.handleLogout}
              class="btn1 effect01"
              target="_blank"
            ><NavLink exact activeClassName="active" to="/" style={{color:"white"}}>
              <span>
                <ImExit style={{width:"30px", height:"30px"}}/>
              </span></NavLink>
            </a>

            <a
              class="btn1 effect01"
              target="_blank"
            >
              <span>
                <FaUserAlt style={{width:"35px", height:"35px"}}/>
              </span>
            </a>

            


          </div>
        
        </nav>

        
        <Sidebar/>
        {/* <Carousel/> */}
        <Component/>
        

         
      </section>
    </Router>


    

  );
};

export default Hero;
