 import React from 'react';
 import fire from './fire';
 import Music from './Music';
 import Crud from './crud';

 const Hero = (props) =>{

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
             <nav>
                 
                 <h2>Bienvenido {res2}</h2>
                 <button onClick={props.handleLogout}>Cerrar Sesion</button>
             </nav>

             <Music/>
             <Crud/> 
             
         </section>

         
     )
 };


 export default Hero;
 