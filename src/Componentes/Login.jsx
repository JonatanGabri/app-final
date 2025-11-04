import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PaginaLogin({ iniciarSesion }) {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [mensajeError, setMensajeError] = useState("");
  const navigate = useNavigate();
  const manejarEnvio = (evento) => {
    evento.preventDefault();
    setMensajeError("");

    console.log("🔐 Intentando iniciar sesión...");
    console.log("  Usuario:", nombreUsuario);
    const exitoso = iniciarSesion(nombreUsuario, contraseña);

    if (exitoso) {
      console.log("✅ Login exitoso - Redirigiendo a /gestor");
      navigate("/gestor");
    } else {
      console.log("❌ Login fallido - Credenciales incorrectas");
      setMensajeError(
        'Usuario o contraseña incorrectos. Intenta con "admin" y "1234"'
      );
    }
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-lg-5 col-md-8">
        <form onSubmit={manejarEnvio} className="card tarjeta-login p-4 p-sm-5">
          <h2 className="text-center fw-bold fs-3 mb-3">🔐 Iniciar Sesión</h2>

          <div className="alert alert-info mb-4">
            <small>
            • Token de sesión para validar acceso
            </small>
          </div>

          {mensajeError && (
            <div className="alert alert-danger">{mensajeError}</div>
          )}

          <div className="form-floating mb-3">
            <input
              type="text"
              id="usuario"
              value={nombreUsuario}
              onChange={(e) => setNombreUsuario(e.target.value)}
              className="form-control"
              placeholder="Usuario"
              required
            />
            <label htmlFor="usuario">👤 Usuario</label>
          </div>

          <div className="form-floating mb-4">
            <input
              type="password"
              id="contraseña"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              className="form-control"
              placeholder="Contraseña"
              required
            />
            <label htmlFor="contraseña">🔑 Contraseña</label>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg w-100 py-3 fw-bold"
          >
            ➡️ Entrar
          </button>

          <p className="text-center text-muted mt-3 mb-0">
            <small>
              💡 Usa: <strong>admin</strong> / <strong>1234</strong>
            </small>
          </p>
        </form>
      </div>
    </div>
  );
}
