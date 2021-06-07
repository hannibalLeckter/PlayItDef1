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




const User = (props) =>{

  

    return(
        <Router>
        
            <Side/>  
            <Crud/>

        </Router>
    )
};


export default User;