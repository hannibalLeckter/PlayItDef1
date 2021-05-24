import React from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { FaUserAlt ,FaUnlock} from "react-icons/fa";

const Login = (props) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    handleRegister,
    handleLogout,
    hasAccount,
    setHasAccount,
    emailError,
    passwordError,
  } = props;

  return (
    <section className="login">

        
      <div className="loginContainer-left">
     

          {hasAccount ? (
            <>
              <h1 className="text-white center mb-5">Registrate aqui!</h1>
              <label>Email  <FaUserAlt width="40px" height="40px" /></label>
              <input
                type="text"
                autoFocus
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="errorMsg">{emailError}</p>

              <label>Contraseña  <FaUnlock width="40px" height="40px" /></label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="errorMsg">{passwordError}</p>
              <div className="btnContainer">
                <button onClick={handleRegister}>Registrar</button>
                <p>
                  Ya tienes cuenta?{" "}
                  <span onClick={() => setHasAccount(!hasAccount)}>
                    Logeate
                  </span>
                </p>
              </div>
            </>
          ) : (
            <>
            <h1 className="text-white center mb-5">Inicia Sesion!</h1>
              <label>Email  <FaUserAlt width="40px" height="40px" /></label>
              <input
                type="text"
                autoFocus
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="errorMsg">{emailError}</p>

              <label>Contraseña  <FaUnlock width="40px" height="40px" /></label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="errorMsg">{passwordError}</p>
              <div className="btnContainer">
                <button onClick={handleLogin}>Iniciar Sesion</button>
                <p>
                  No tienes cuenta ?{" "}
                  <span onClick={() => setHasAccount(!hasAccount)}>
                    Registrate
                  </span>
                </p>
              </div>
            </>
          )}
        </div>
        
      
    </section>

    
  )
};
export default Login;
