import React, {useState} from 'react';
import fire from './fire';
import Music from './Music';
import Crud from './crud';
import Side from './Sidebar';
import { FaPlay,FaTrashAlt,FaEdit,FaUserAlt,FaLock } from "react-icons/fa";
import { MdSettings } from "react-icons/md";
import { ImExit } from "react-icons/im";
import "./hero.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Dropdown, DropdownItem, DropdownMenu,DropdownToggle } from 'reactstrap';
import { BrowserRouter as Router,Route,Link,NavLink, Switch } from 'react-router-dom';
import Admin from './admin';




const Prueba = (props) =>{

//    const mystyle = {
//        padding: "10px",
//        fontFamily: "Arial",
//        width:"100%"
//      };

//    const [dropdown, setDropdown]= useState(false);
//    const abrirCerrarDropdown=()=>{
//        setDropdown(!dropdown);
//    }

//    const CurrentUser = fire.auth().currentUser;

//    const cutEmail = CurrentUser.email;
//    const res = cutEmail.split("");
//    console.log(res);
//    var res2=" ";

//    for (let i = 0; i < res.length; i++) {
//        if(res[i]!="@"){
//            res2=res2+res[i];
//        }else if(res[i]=="@"){
//            break;
//        }
//    }
// console.log(res2);
//    CurrentUser.updateProfile({displayName:res2})

    return(
        <Router>
        
            <h1>Bienvenido</h1>

            <Side/> 
            <Crud/>

        </Router>
    )
};


export default Prueba;