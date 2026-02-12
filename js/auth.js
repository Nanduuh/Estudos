// Atualiza menu (login / perfil)
function atualizarMenu() {
  const menu = document.getElementById("menu-login");
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

  if (!menu) return;

  if (usuario) {
    menu.innerHTML = `
      <a href="perfil.html">${usuario.nome}</a>
      <a href="#" onclick="logout()">Sair</a>
    `;
  } else {
    menu.innerHTML = `
      <a href="login.html">Login</a>
      <a href="cadastro.html">Cadastro</a>
    `;
  }
}

function logout() {
  localStorage.removeItem("usuarioLogado");
  window.location.href = "index.html";
}

// Cadastro
function cadastrar(event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const existe = usuarios.find(u => u.email === email);
  if (existe) {
    alert("Email já cadastrado!");
    return;
  }

  usuarios.push({ nome, email, senha });
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  alert("Cadastro realizado com sucesso!");
  window.location.href = "login.html";
}

// Login
function login(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const usuario = usuarios.find(
    u => u.email === email && u.senha === senha
  );

  if (!usuario) {
    alert("Email ou senha inválidos!");
    return;
  }

  localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
  window.location.href = "index.html";
}