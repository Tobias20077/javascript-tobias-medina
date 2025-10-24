let usuarios = [];

// Carga de datos simulados
fetch("usuarios.json")
  .then((res) => res.json())
  .then((data) => {
    usuarios = data;
    mostrarLogin();
  })
  .catch(() => {
    usuarios = [];
    mostrarLogin();
  });

// Mostrar Login
function mostrarLogin() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="container">
      <h2>Inicio de Sesión</h2>
      <input type="text" id="user" placeholder="Usuario">
      <input type="password" id="pass" placeholder="Contraseña">
      <button id="btnLogin">Entrar</button>
      <p>¿No tienes cuenta? <a id="linkRegister">Regístrate</a></p>
      <p id="msgLogin" class="message"></p>
    </div>
  `;

  document.getElementById("btnLogin").addEventListener("click", login);
  document
    .getElementById("linkRegister")
    .addEventListener("click", mostrarRegistro);
}

// Mostrar Registro
function mostrarRegistro() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="container">
      <h2>Registro</h2>
      <input type="text" id="newUser" placeholder="Nuevo usuario">
      <input type="password" id="newPass" placeholder="Nueva contraseña">
      <button id="btnRegister">Registrar</button>
      <p>¿Ya tienes cuenta? <a id="linkLogin">Inicia sesión</a></p>
      <p id="msgRegister" class="message"></p>
    </div>
  `;

  document.getElementById("btnRegister").addEventListener("click", registrar);
  document.getElementById("linkLogin").addEventListener("click", mostrarLogin);
}

// Registrar usuario
function registrar() {
  const user = document.getElementById("newUser").value.trim();
  const pass = document.getElementById("newPass").value.trim();
  const msg = document.getElementById("msgRegister");

  msg.textContent = "";
  msg.className = "message";

  if (!user || !pass) {
    msg.textContent = "Completa todos los campos.";
    msg.classList.add("error");
    return;
  }

  const existe = usuarios.some((u) => u.usuario === user);
  if (existe) {
    msg.textContent = "Ese usuario ya existe.";
    msg.classList.add("error");
    return;
  }

  const nuevo = { usuario: user, password: pass };
  usuarios.push(nuevo);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  msg.textContent = "Registro exitoso. Ahora puedes iniciar sesión.";
  msg.classList.add("success");

  setTimeout(() => mostrarLogin(), 1500);
}

// Iniciar sesión
function login() {
  const user = document.getElementById("user").value.trim();
  const pass = document.getElementById("pass").value.trim();
  const msg = document.getElementById("msgLogin");

  msg.textContent = "";
  msg.className = "message";

  const listaLocal = JSON.parse(localStorage.getItem("usuarios")) || [];
  const listaTotal = [...usuarios, ...listaLocal];
  const encontrado = listaTotal.find(
    (u) => u.usuario === user && u.password === pass
  );

  if (!encontrado) {
    msg.textContent = "Usuario o contraseña incorrectos.";
    msg.classList.add("error");
    return;
  }

  localStorage.setItem("usuarioActivo", user);
  mostrarPanel(user);
}

// Panel de usuario
function mostrarPanel(user) {
  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="container">
      <h2>Bienvenido, ${user} 👋</h2>
      <p>Has iniciado sesión correctamente.</p>
      <button id="logout">Cerrar sesión</button>
    </div>
  `;
  document.getElementById("logout").addEventListener("click", cerrarSesion);
}

// Cerrar sesión
function cerrarSesion() {
  localStorage.removeItem("usuarioActivo");
  mostrarLogin();
}
