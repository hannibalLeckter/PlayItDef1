import React, {useState} from 'react';
import fire from './fire';
import Music from './Music';
import Crud from './crud';
import CrudAdmin from './crudAdmin';
import Side from './Sidebar';
import { FaPlay,FaTrashAlt,FaEdit,FaUserAlt,FaLock } from "react-icons/fa";
import { MdSettings } from "react-icons/md";
import { ImExit } from "react-icons/im";
import "./hero.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Dropdown, DropdownItem, DropdownMenu,DropdownToggle } from 'reactstrap';
import { BrowserRouter as Router,Route,Link,NavLink, Switch } from 'react-router-dom';




const Admin = (props) =>{

    return(
        <Router>
        {/* <section className="hero">
            <nav className="nav">
                
       

                <h2>Bienvenido {res2}</h2>

                <Dropdown  isOpen={dropdown} toggle={abrirCerrarDropdown} style={{ position: 'relative', zIndex: '100' }} direction="left" >
                    <DropdownToggle >
                    <FaUserAlt/>
                    </DropdownToggle>

                    <DropdownMenu >
                    <DropdownItem header style={mystyle}>Opciones</DropdownItem>
                    <DropdownItem divider style={mystyle}></DropdownItem>
                       <DropdownItem style={mystyle}><NavLink activeClassName="active" to="/admin">Home</NavLink></DropdownItem>
                       <DropdownItem style={mystyle}><NavLink exact activeClassName="active" to="/admin">Home</NavLink></DropdownItem>
                        <DropdownItem style={mystyle}><FaUserAlt/> Ver perfil</DropdownItem>
                        <DropdownItem style={mystyle} onClick={props.handleLogout}><ImExit/> Cerrar Sesion</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                
                
               
                
            </nav>
            
            
           <Side/> 
            <Music/>
            <Crud/>
            
            
            
        </section> */}
        

            <Side/> 
            <Music/>
            <CrudAdmin/>

        </Router>

        
    )
};


export default Admin;
