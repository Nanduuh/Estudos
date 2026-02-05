// Sistema de autenticação para o Blog de Estudos

// Função para verificar se há um usuário logado
function verificarLogin() {
  const usuarioLogado = localStorage.getItem('usuarioLogado');
  return usuarioLogado ? JSON.parse(usuarioLogado) : null;
}

// Função para fazer logout
function fazerLogout() {
  localStorage.removeItem('usuarioLogado');
  window.location.href = 'index.html';
}

// Função para atualizar o menu de navegação
function atualizarMenu() {
  const menu = document.getElementById('menu-login');
  const usuario = verificarLogin();
  
  if (menu) {
      if (usuario) {
          // Usuário logado - mostra perfil e opção de logout
          menu.innerHTML = `
              <a href="perfil.html" class="menu-usuario">
                  👤 ${usuario.usuario}
              </a>
              <a href="#" onclick="fazerLogout()">Sair</a>
          `;
      } else {
          // Usuário não logado - mostra login e cadastro
          menu.innerHTML = `
              <a href="login.html">Login</a>
              <a href="cadastro.html">Cadastro</a>
          `;
      }
  }
}

// Função para proteger páginas que requerem login
function protegerPagina() {
  const usuario = verificarLogin();
  if (!usuario) {
      alert('Você precisa estar logado para acessar esta página!');
      window.location.href = 'login.html';
      return false;
  }
  return true;
}

// Função para redirecionar se já estiver logado
function redirecionarSeLogado() {
  const usuario = verificarLogin();
  if (usuario && (window.location.pathname.includes('login.html') || 
                  window.location.pathname.includes('cadastro.html'))) {
      alert('Você já está logado!');
      window.location.href = 'index.html';
  }
}

// Inicializa quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
  atualizarMenu();
  redirecionarSeLogado();
  
  // Adiciona evento de logout a todos os links "Sair"
  document.addEventListener('click', function(e) {
      if (e.target.textContent === 'Sair' || e.target.textContent.includes('Sair')) {
          e.preventDefault();
          fazerLogout();
      }
  });
});

// Exporta funções para uso global
window.verificarLogin = verificarLogin;
window.fazerLogout = fazerLogout;
window.atualizarMenu = atualizarMenu;
window.protegerPagina = protegerPagina;