function criarCard(post) {
    return `
      <div class="post-card">
        <span class="categoria">${post.categoria}</span>
        <h3>${post.titulo}</h3>
        <p>${post.conteudo.substring(0, 120)}...</p>
        <small>Por ${post.autor} - ${post.data}</small>
      </div>
    `;
  }
  
  function carregarPosts() {
    const container = document.getElementById("posts-container");
    if (!container) return;
  
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    container.innerHTML = "";
  
    posts.forEach(post => {
      container.innerHTML += criarCard(post);
    });
  }
  
  function filtrarCategoria(categoria) {
    const container = document.getElementById("posts-container");
    if (!container) return;
  
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const filtrados = posts.filter(p => p.categoria === categoria);
  
    container.innerHTML = "";
  
    filtrados.forEach(post => {
      container.innerHTML += criarCard(post);
    });
  }  