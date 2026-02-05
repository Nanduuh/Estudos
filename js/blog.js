// Sistema de Blog - Blog de Estudos

// Função para carregar posts
function carregarPosts() {
    const postsContainer = document.getElementById('postsContainer');
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    
    if (posts.length === 0) {
        postsContainer.innerHTML = `
            <div class="post-vazio">
                <i class="fas fa-comment-alt"></i>
                <h4>Nenhum post ainda</h4>
                <p>Seja o primeiro a compartilhar conhecimento!</p>
            </div>
        `;
        return;
    }
    
    // Ordena posts por data (mais recente primeiro)
    posts.sort((a, b) => new Date(b.data) - new Date(a.data));
    
    // Limita a 20 posts na página inicial
    const postsParaExibir = posts.slice(0, 20);
    
    let html = '';
    
    postsParaExibir.forEach((post, index) => {
        // Formata a data
        const dataPost = new Date(post.data);
        const dataFormatada = dataPost.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        // Conta comentários
        const comentarios = post.comentarios || [];
        const numComentarios = comentarios.length;
        
        html += `
            <div class="post-card" data-post-id="${post.id}">
                <div class="post-header">
                    <div class="post-autor">
                        <div class="autor-avatar">${post.autor.charAt(0).toUpperCase()}</div>
                        <div class="autor-info">
                            <strong>${post.autor}</strong>
                            <span class="post-data">${dataFormatada}</span>
                        </div>
                    </div>
                    <span class="post-categoria">${obterNomeMateria(post.materia)}</span>
                </div>
                
                <div class="post-conteudo">
                    <h4 class="post-titulo">${post.titulo}</h4>
                    <p class="post-texto">${post.conteudo}</p>
                    
                    ${post.tags ? `
                        <div class="post-tags">
                            ${post.tags.split(',').map(tag => `
                                <span class="tag">${tag.trim()}</span>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
                
                <div class="post-footer">
                    <button class="btn-acao" onclick="curtirPost('${post.id}')">
                        <i class="fas fa-heart ${post.curtidas && post.curtidas.includes(obterUsuarioLogado()?.usuario) ? 'curtido' : ''}"></i>
                        <span id="curtidas-${post.id}">${post.curtidas ? post.curtidas.length : 0}</span>
                    </button>
                    
                    <button class="btn-acao" onclick="mostrarComentarios('${post.id}')">
                        <i class="fas fa-comment"></i>
                        <span>${numComentarios}</span>
                    </button>
                    
                    <button class="btn-acao" onclick="compartilharPost('${post.id}')">
                        <i class="fas fa-share"></i>
                    </button>
                </div>
                
                <!-- Área de comentários (inicialmente oculta) -->
                <div class="comentarios-container" id="comentarios-${post.id}" style="display: none;">
                    <div class="comentarios-lista" id="lista-comentarios-${post.id}">
                        ${carregarComentarios(post.id)}
                    </div>
                    
                    <div class="novo-comentario">
                        <textarea id="texto-comentario-${post.id}" placeholder="Adicione um comentário..." rows="2"></textarea>
                        <button class="btn-comentar" onclick="adicionarComentario('${post.id}')">
                            Comentar
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    postsContainer.innerHTML = html;
}

// Função para obter o usuário logado
function obterUsuarioLogado() {
    const usuario = localStorage.getItem('usuarioLogado');
    return usuario ? JSON.parse(usuario) : null;
}

// Função para obter nome da matéria
function obterNomeMateria(codigo) {
    const materias = {
        'portugues': '📘 Português',
        'matematica': '📐 Matemática',
        'ciencias': '🧪 Ciências',
        'historia': '📜 História',
        'geografia': '🌍 Geografia',
        'ingles': '🇬🇧 Inglês',
        'fisica': '⚙️ Física',
        'quimica': '⚗️ Química',
        'biologia': '🧬 Biologia',
        'outros': '📚 Outros'
    };
    
    return materias[codigo] || '📚 Outros';
}

// Função para carregar comentários
function carregarComentarios(postId) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const post = posts.find(p => p.id === postId);
    
    if (!post || !post.comentarios || post.comentarios.length === 0) {
        return '<p class="sem-comentarios">Nenhum comentário ainda. Seja o primeiro!</p>';
    }
    
    let html = '';
    
    post.comentarios.forEach(comentario => {
        const dataComentario = new Date(comentario.data);
        const dataFormatada = dataComentario.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        html += `
            <div class="comentario">
                <div class="comentario-autor">
                    <span class="comentario-avatar">${comentario.autor.charAt(0).toUpperCase()}</span>
                    <div class="comentario-info">
                        <strong>${comentario.autor}</strong>
                        <span class="comentario-data">${dataFormatada}</span>
                    </div>
                </div>
                <p class="comentario-texto">${comentario.texto}</p>
            </div>
        `;
    });
    
    return html;
}

// Adiciona funcionalidade ao formulário de novo post
document.addEventListener('DOMContentLoaded', function() {
    const formNovoPost = document.getElementById('formNovoPost');
    
    if (formNovoPost) {
        formNovoPost.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const usuario = obterUsuarioLogado();
            
            if (!usuario) {
                alert('Você precisa estar logado para criar um post!');
                window.location.href = 'login.html';
                return;
            }
            
            const titulo = document.getElementById('postTitulo').value;
            const materia = document.getElementById('postMateria').value;
            const conteudo = document.getElementById('postConteudo').value;
            const tags = document.getElementById('postTags').value;
            
            if (!materia) {
                alert('Selecione uma matéria!');
                return;
            }
            
            // Obtém posts existentes
            const posts = JSON.parse(localStorage.getItem('posts')) || [];
            
            // Cria novo post
            const novoPost = {
                id: Date.now().toString(),
                titulo: titulo,
                materia: materia,
                conteudo: conteudo,
                tags: tags,
                autor: usuario.usuario,
                autorId: usuario.id,
                data: new Date().toISOString(),
                curtidas: [],
                comentarios: []
            };
            
            // Adiciona ao array
            posts.unshift(novoPost); // Adiciona no início
            
            // Salva no localStorage
            localStorage.setItem('posts', JSON.stringify(posts));
            
            // Limpa formulário
            formNovoPost.reset();
            
            // Esconde formulário
            esconderFormularioPost();
            
            // Recarrega posts
            carregarPosts();
            
            // Atualiza estatísticas
            carregarEstatisticas();
            
            alert('Post publicado com sucesso!');
        });
    }
});

// Funções para interações
function curtirPost(postId) {
    const usuario = obterUsuarioLogado();
    
    if (!usuario) {
        alert('Você precisa estar logado para curtir!');
        return;
    }
    
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const postIndex = posts.findIndex(p => p.id === postId);
    
    if (postIndex === -1) return;
    
    if (!posts[postIndex].curtidas) {
        posts[postIndex].curtidas = [];
    }
    
    const usuarioIndex = posts[postIndex].curtidas.indexOf(usuario.usuario);
    
    if (usuarioIndex === -1) {
        // Adiciona curtida
        posts[postIndex].curtidas.push(usuario.usuario);
    } else {
        // Remove curtida
        posts[postIndex].curtidas.splice(usuarioIndex, 1);
    }
    
    // Atualiza localStorage
    localStorage.setItem('posts', JSON.stringify(posts));
    
    // Atualiza visualização
    const curtidasElement = document.getElementById(`curtidas-${postId}`);
    if (curtidasElement) {
        curtidasElement.textContent = posts[postIndex].curtidas.length;
    }
    
    // Atualiza ícone
    const heartIcon = document.querySelector(`[data-post-id="${postId}"] .fa-heart`);
    if (heartIcon) {
        if (usuarioIndex === -1) {
            heartIcon.classList.add('curtido');
        } else {
            heartIcon.classList.remove('curtido');
        }
    }
}

function mostrarComentarios(postId) {
    const container = document.getElementById(`comentarios-${postId}`);
    
    if (container.style.display === 'none') {
        container.style.display = 'block';
        carregarComentarios(postId);
    } else {
        container.style.display = 'none';
    }
}

function adicionarComentario(postId) {
    const usuario = obterUsuarioLogado();
    
    if (!usuario) {
        alert('Você precisa estar logado para comentar!');
        return;
    }
    
    const textoComentario = document.getElementById(`texto-comentario-${postId}`).value;
    
    if (!textoComentario.trim()) {
        alert('Digite um comentário!');
        return;
    }
    
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const postIndex = posts.findIndex(p => p.id === postId);
    
    if (postIndex === -1) return;
    
    if (!posts[postIndex].comentarios) {
        posts[postIndex].comentarios = [];
    }
    
    // Adiciona comentário
    posts[postIndex].comentarios.push({
        id: Date.now().toString(),
        autor: usuario.usuario,
        autorId: usuario.id,
        texto: textoComentario,
        data: new Date().toISOString()
    });
    
    // Atualiza localStorage
    localStorage.setItem('posts', JSON.stringify(posts));
    
    // Limpa campo
    document.getElementById(`texto-comentario-${postId}`).value = '';
    
    // Atualiza visualização
    const listaComentarios = document.getElementById(`lista-comentarios-${postId}`);
    if (listaComentarios) {
        listaComentarios.innerHTML = carregarComentarios(postId);
    }
    
    // Atualiza contador de comentários
    const comentarioBtn = document.querySelector(`[data-post-id="${postId}"] .btn-acao:nth-child(2) span`);
    if (comentarioBtn) {
        comentarioBtn.textContent = posts[postIndex].comentarios.length;
    }
    
    // Atualiza estatísticas
    carregarEstatisticas();
}

function compartilharPost(postId) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const post = posts.find(p => p.id === postId);
    
    if (!post) return;
    
    const url = window.location.origin + window.location.pathname;
    const texto = `Confira este post sobre ${obterNomeMateria(post.materia)} no Blog de Estudos: "${post.titulo}"`;
    
    if (navigator.share) {
        navigator.share({
            title: post.titulo,
            text: texto,
            url: url
        });
    } else {
        // Fallback: copiar para área de transferência
        navigator.clipboard.writeText(texto + '\n' + url);
        alert('Link copiado para a área de transferência!');
    }
}

// Função para carregar estatísticas
function carregarEstatisticas() {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    
    // Conta posts por matéria
    const contagemMaterias = {};
    posts.forEach(post => {
        contagemMaterias[post.materia] = (contagemMaterias[post.materia] || 0) + 1;
    });
    
    // Atualiza contadores de categorias
    Object.keys(contagemMaterias).forEach(materia => {
        const elemento = document.getElementById(`count-${materia}`);
        if (elemento) {
            elemento.textContent = contagemMaterias[materia];
        }
    });
    
    // Atualiza estatísticas gerais
    const totalComentarios = posts.reduce((total, post) => {
        return total + (post.comentarios ? post.comentarios.length : 0);
    }, 0);
    
    document.getElementById('totalPosts').textContent = posts.length;
    document.getElementById('totalUsuarios').textContent = usuarios.length;
    document.getElementById('totalComentarios').textContent = totalComentarios;
}

// Dicas do dia
const dicas = [
    "Estude em períodos curtos (25-30 minutos) com intervalos de 5 minutos. Isso melhora a retenção do conteúdo!",
    "Faça resumos com suas próprias palavras. Isso ajuda a fixar o conteúdo.",
    "Ensine o que você aprendeu para alguém. A melhor forma de aprender é ensinando.",
    "Use mapas mentais para visualizar conexões entre conceitos.",
    "Revise o conteúdo 24 horas depois de estudar para melhorar a memória de longo prazo.",
    "Estude em diferentes ambientes. Isso ajuda o cérebro a criar mais associações.",
    "Pratique exercícios de forma ativa, não apenas leia a teoria.",
    "Estabeleça metas claras e realistas para cada sessão de estudo.",
    "Use flashcards para memorizar vocabulários e fórmulas.",
    "Durma bem! O sono é essencial para consolidar a memória."
];

// Atualiza dica do dia
document.addEventListener('DOMContentLoaded', function() {
    const hoje = new Date().getDate();
    const indiceDica = hoje % dicas.length;
    const elementoDica = document.getElementById('dicaDoDia');
    
    if (elementoDica) {
        elementoDica.textContent = dicas[indiceDica];
    }
});

// Exporta funções para uso global
window.carregarPosts = carregarPosts;
window.carregarEstatisticas = carregarEstatisticas;
window.mostrarComentarios = mostrarComentarios;
window.adicionarComentario = adicionarComentario;
window.curtirPost = curtirPost;
window.compartilharPost = compartilharPost;