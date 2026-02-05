function criarPost() {
    const titulo = document.getElementById("titulo").value;
    const categoria = document.getElementById("categoria").value;
    const conteudo = document.getElementById("conteudo").value;
  
    if (!titulo || !categoria || !conteudo) {
      alert("Preencha todos os campos");
      return;
    }
  
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
  
    posts.unshift({
      titulo,
      categoria,
      conteudo,
      autor: localStorage.getItem("usuarioLogado"),
      data: new Date().toLocaleDateString()
    });
  
    localStorage.setItem("posts", JSON.stringify(posts));
    window.location.href = "index.html";
  }
  
  function carregarPosts() {
    const lista = document.getElementById("lista-posts");
    if (!lista) return;
  
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
  
    if (posts.length === 0) {
      lista.innerHTML = "<p>Nenhum post publicado ainda.</p>";
      return;
    }
  
    lista.innerHTML = "";
  
    posts.forEach(post => {
      lista.innerHTML += `
        <div class="post">
          <h3>${post.titulo}</h3>
          <small>${post.categoria} • ${post.data}</small>
          <p>${post.conteudo}</p>
        </div>
      `;
    });
  }