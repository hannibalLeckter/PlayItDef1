 import React, {useState} from 'react';
 import fire from './fire';
 import Music from './Music';
 import Crud from './crud';
 import Side from './Sidebar';
 import { FaPlay,FaTrashAlt,FaEdit,FaUserAlt } from "react-icons/fa";
 import { MdSettings } from "react-icons/md";
 import { ImExit } from "react-icons/im";
 import "./hero.css";
 import 'bootstrap/dist/css/bootstrap.min.css';
 import {Dropdown, DropdownItem, DropdownMenu,DropdownToggle } from 'reactstrap';




 const Hero = (props) =>{

    const mystyle = {
        padding: "10px",
        fontFamily: "Arial",
        width:"100%"
      };

    const [dropdown, setDropdown]= useState(false);
    const abrirCerrarDropdown=()=>{
        setDropdown(!dropdown);
    }

    const CurrentUser = fire.auth().currentUser;

    const cutEmail = CurrentUser.email;
    const res = cutEmail.split("");
    console.log(res);
    var res2=" ";

    for (let i = 0; i < res.length; i++) {
        if(res[i]!="@"){
            res2=res2+res[i];
        }else if(res[i]=="@"){
            break;
        }
    }
console.log(res2);
    CurrentUser.updateProfile({displayName:res2})

     return(
         <section className="hero">
             <nav className="nav">
                 
        

                 <h2>Bienvenido {res2}</h2>

                 <Dropdown isOpen={dropdown} toggle={abrirCerrarDropdown} style={{ position: 'relative', zIndex: '100' }} direction="left" >
                     <DropdownToggle >
                        <MdSettings/>
                     </DropdownToggle>

                     <DropdownMenu >
                     <DropdownItem header style={mystyle}>Opciones</DropdownItem>
                     <DropdownItem divider style={mystyle}></DropdownItem>
                         <DropdownItem style={mystyle}><FaUserAlt/> Ver perfil</DropdownItem>
                         <DropdownItem style={mystyle} onClick={props.handleLogout}><ImExit/> Cerrar Sesion</DropdownItem>
                     </DropdownMenu>
                 </Dropdown>
                 
                
                 
             </nav>
             
             
            <Side/> 
             <Music/>
             <Crud/>
             
             
             
         </section>

         
     )
 };


 export default Hero;
 