// Sistema de Perfil - Blog de Estudos

document.addEventListener('DOMContentLoaded', function() {
    // Verifica se usuário está logado
    const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
    
    if (!usuario) {
        // Redireciona para login se não estiver logado
        alert('Você precisa estar logado para acessar o perfil!');
        window.location.href = 'login.html';
        return;
    }
    
    // Carrega dados do usuário
    carregarDadosUsuario(usuario);
    
    // Carrega seções do perfil
    carregarPostsUsuario(usuario.usuario);
    carregarComentariosUsuario(usuario.usuario);
    carregarEstatisticasUsuario(usuario);
    
    // Configura navegação do perfil
    configurarNavegacaoPerfil();
    
    // Carrega configurações salvas
    carregarConfiguracoes(usuario.id);
});

function carregarDadosUsuario(usuario) {
    // Preenche dados do usuário
    document.getElementById('avatarUsuario').textContent = usuario.nome.charAt(0).toUpperCase();
    document.getElementById('nomeUsuario').textContent = usuario.nome;
    document.getElementById('perfilNome').value = usuario.nome;
    document.getElementById('perfilUsuario').value = usuario.usuario;
    document.getElementById('perfilEmail').value = usuario.email;
    
    // Formata data de cadastro
    if (usuario.dataCadastro) {
        const dataCadastro = new Date(usuario.dataCadastro);
        const dataFormatada = dataCadastro.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        document.getElementById('perfilDataCadastro').value = dataFormatada;
    }
    
    // Carrega bio
    if (usuario.bio) {
        document.getElementById('perfilBio').value = usuario.bio;
        document.getElementById('bioUsuario').textContent = usuario.bio;
    }
}

function carregarPostsUsuario(username) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const postsUsuario = posts.filter(post => post.autor === username);
    const container = document.getElementById('postsUsuario');
    
    if (postsUsuario.length === 0) {
        return;
    }
    
    let html = '<div class="lista-posts-perfil">';
    
    postsUsuario.slice(0, 10).forEach(post => {
        const dataPost = new Date(post.data);
        const dataFormatada = dataPost.toLocaleDateString('pt-BR');
        
        html += `
            <div class="post-perfil-card">
                <div class="post-perfil-header">
                    <h4>${post.titulo}</h4>
                    <span class="post-perfil-data">${dataFormatada}</span>
                </div>
                <p class="post-perfil-conteudo">${post.conteudo.substring(0, 150)}${post.conteudo.length > 150 ? '...' : ''}</p>
                <div class="post-perfil-stats">
                    <span><i class="fas fa-heart"></i> ${post.curtidas ? post.curtidas.length : 0}</span>
                    <span><i class="fas fa-comment"></i> ${post.comentarios ? post.comentarios.length : 0}</span>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    
    if (postsUsuario.length > 10) {
        html += `<p class="ver-mais">+ ${postsUsuario.length - 10} posts adicionais</p>`;
    }
    
    container.innerHTML = html;
}

function carregarComentariosUsuario(username) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const container = document.getElementById('comentariosUsuario');
    let todosComentarios = [];
    
    // Coleta todos os comentários do usuário
    posts.forEach(post => {
        if (post.comentarios) {
            post.comentarios.forEach(comentario => {
                if (comentario.autor === username) {
                    comentario.postTitulo = post.titulo;
                    comentario.postId = post.id;
                    todosComentarios.push(comentario);
                }
            });
        }
    });
    
    if (todosComentarios.length === 0) {
        return;
    }
    
    // Ordena por data (mais recente primeiro)
    todosComentarios.sort((a, b) => new Date(b.data) - new Date(a.data));
    
    let html = '<div class="lista-comentarios-perfil">';
    
    todosComentarios.slice(0, 10).forEach(comentario => {
        const dataComentario = new Date(comentario.data);
        const dataFormatada = dataComentario.toLocaleDateString('pt-BR');
        
        html += `
            <div class="comentario-perfil-card">
                <div class="comentario-perfil-header">
                    <h4>No post: ${comentario.postTitulo}</h4>
                    <span class="comentario-perfil-data">${dataFormatada}</span>
                </div>
                <p class="comentario-perfil-texto">${comentario.texto}</p>
            </div>
        `;
    });
    
    html += '</div>';
    
    if (todosComentarios.length > 10) {
        html += `<p class="ver-mais">+ ${todosComentarios.length - 10} comentários adicionais</p>`;
    }
    
    container.innerHTML = html;
}

function carregarEstatisticasUsuario(usuario) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    
    // Posts do usuário
    const postsUsuario = posts.filter(post => post.autor === usuario.usuario);
    
    // Comentários do usuário
    let totalComentarios = 0;
    posts.forEach(post => {
        if (post.comentarios) {
            totalComentarios += post.comentarios.filter(c => c.autor === usuario.usuario).length;
        }
    });
    
    // Curtidas recebidas
    let totalCurtidas = 0;
    postsUsuario.forEach(post => {
        totalCurtidas += post.curtidas ? post.curtidas.length : 0;
    });
    
    // Dias desde cadastro
    let diasCadastro = 0;
    if (usuario.dataCadastro) {
        const dataCadastro = new Date(usuario.dataCadastro);
        const hoje = new Date();
        const diferenca = hoje.getTime() - dataCadastro.getTime();
        diasCadastro = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    }
    
    // Atualiza estatísticas
    document.getElementById('estatPosts').textContent = postsUsuario.length;
    document.getElementById('estatComentarios').textContent = totalComentarios;
    document.getElementById('estatCurtidas').textContent = totalCurtidas;
    document.getElementById('estatDias').textContent = diasCadastro;
    
    // Gera gráfico de atividade
    gerarGraficoAtividade(postsUsuario);
}

function gerarGraficoAtividade(postsUsuario) {
    // Agrupa posts por mês
    const postsPorMes = {};
    
    postsUsuario.forEach(post => {
        const data = new Date(post.data);
        const mesAno = `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}`;
        
        if (!postsPorMes[mesAno]) {
            postsPorMes[mesAno] = 0;
        }
        postsPorMes[mesAno]++;
    });
    
    // Ordena por mês
    const meses = Object.keys(postsPorMes).sort();
    
    // Limita a últimos 6 meses
    const ultimosMeses = meses.slice(-6);
    
    // Gera HTML do gráfico
    const graficoContainer = document.getElementById('graficoAtividade');
    
    if (ultimosMeses.length === 0) {
        graficoContainer.innerHTML = `
            <div class="grafico-placeholder">
                <p>Você ainda não tem atividade suficiente para gerar um gráfico.</p>
                <p>Comece a postar para ver seu progresso!</p>
            </div>
        `;
        return;
    }
    
    // Encontra valor máximo para escala
    const maxPosts = Math.max(...ultimosMeses.map(mes => postsPorMes[mes]));
    
    let html = '<div class="grafico-barras-container">';
    
    ultimosMeses.forEach(mes => {
        const count = postsPorMes[mes];
        const altura = maxPosts > 0 ? (count / maxPosts * 100) : 0;
        
        // Formata nome do mês
        const [ano, mesNum] = mes.split('-');
        const nomeMes = new Date(ano, mesNum - 1).toLocaleDateString('pt-BR', { month: 'short' });
        
        html += `
            <div class="barra-container">
                <div class="barra" style="height: ${altura}%">
                    <span class="barra-valor">${count}</span>
                </div>
                <span class="barra-mes">${nomeMes}</span>
            </div>
        `;
    });
    
    html += '</div>';
    graficoContainer.innerHTML = html;
}

function configurarNavegacaoPerfil() {
    // Navegação entre seções
    const menuItens = document.querySelectorAll('.perfil-menu-item');
    const secoes = document.querySelectorAll('.perfil-secao');
    
    menuItens.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove classe active de todos
            menuItens.forEach(i => i.classList.remove('active'));
            secoes.forEach(s => s.classList.remove('active'));
            
            // Adiciona classe active ao item clicado
            this.classList.add('active');
            
            // Mostra seção correspondente
            const targetId = this.getAttribute('href').substring(1);
            const targetSecao = document.getElementById(targetId);
            if (targetSecao) {
                targetSecao.classList.add('active');
            }
        });
    });
    
    // Tema claro/escuro
    const temaBotoes = document.querySelectorAll('.btn-tema');
    temaBotoes.forEach(btn => {
        btn.addEventListener('click', function() {
            temaBotoes.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const tema = this.getAttribute('data-tema');
            localStorage.setItem('tema', tema);
            
            if (tema === 'escuro') {
                document.body.classList.add('tema-escuro');
            } else {
                document.body.classList.remove('tema-escuro');
            }
        });
    });
    
    // Carrega tema salvo
    const temaSalvo = localStorage.getItem('tema') || 'claro';
    const temaBtn = document.querySelector(`.btn-tema[data-tema="${temaSalvo}"]`);
    if (temaBtn) {
        temaBtn.classList.add('active');
        if (temaSalvo === 'escuro') {
            document.body.classList.add('tema-escuro');
        }
    }
}

function carregarConfiguracoes(usuarioId) {
    const configuracoes = JSON.parse(localStorage.getItem('configuracoes')) || {};
    const usuarioConfig = configuracoes[usuarioId] || {};
    
    // Notificações
    if (usuarioConfig.notificacoesEmail !== undefined) {
        document.getElementById('notificacoesEmail').checked = usuarioConfig.notificacoesEmail;
    }
    if (usuarioConfig.notificacoesNovosPosts !== undefined) {
        document.getElementById('notificacoesNovosPosts').checked = usuarioConfig.notificacoesNovosPosts;
    }
    
    // Salva configurações quando alteradas
    const checkboxes = document.querySelectorAll('.config-opcoes input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            salvarConfiguracoes(usuarioId);
        });
    });
}

function salvarConfiguracoes(usuarioId) {
    const configuracoes = JSON.parse(localStorage.getItem('configuracoes')) || {};
    
    configuracoes[usuarioId] = {
        notificacoesEmail: document.getElementById('notificacoesEmail').checked,
        notificacoesNovosPosts: document.getElementById('notificacoesNovosPosts').checked
    };
    
    localStorage.setItem('configuracoes', JSON.stringify(configuracoes));
}

// Funções de edição de perfil
function habilitarEdicao() {
    document.getElementById('perfilNome').readOnly = false;
    document.getElementById('perfilUsuario').readOnly = false;
    document.getElementById('perfilBio').readOnly = false;
    
    document.querySelector('.btn-editar').style.display = 'none';
    document.getElementById('btnSalvar').style.display = 'inline-block';
    document.getElementById('btnCancelar').style.display = 'inline-block';
}

function cancelarEdicao() {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
    
    // Restaura valores originais
    document.getElementById('perfilNome').value = usuario.nome;
    document.getElementById('perfilUsuario').value = usuario.usuario;
    document.getElementById('perfilBio').value = usuario.bio || '';
    
    document.getElementById('perfilNome').readOnly = true;
    document.getElementById('perfilUsuario').readOnly = true;
    document.getElementById('perfilBio').readOnly = true;
    
    document.querySelector('.btn-editar').style.display = 'inline-block';
    document.getElementById('btnSalvar').style.display = 'none';
    document.getElementById('btnCancelar').style.display = 'none';
}

function salvarPerfil() {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    
    const novoNome = document.getElementById('perfilNome').value;
    const novoUsuario = document.getElementById('perfilUsuario').value;
    const novaBio = document.getElementById('perfilBio').value;
    
    // Verifica se o novo nome de usuário já existe (exceto para o próprio usuário)
    if (novoUsuario !== usuario.usuario) {
        const usuarioExistente = usuarios.find(u => u.usuario === novoUsuario && u.id !== usuario.id);
        if (usuarioExistente) {
            alert('Este nome de usuário já está em uso!');
            return;
        }
    }
    
    // Atualiza usuário no array
    const usuarioIndex = usuarios.findIndex(u => u.id === usuario.id);
    if (usuarioIndex !== -1) {
        usuarios[usuarioIndex].nome = novoNome;
        usuarios[usuarioIndex].usuario = novoUsuario;
        usuarios[usuarioIndex].bio = novaBio;
        
        // Atualiza localStorage
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        
        // Atualiza usuário logado
        usuario.nome = novoNome;
        usuario.usuario = novoUsuario;
        usuario.bio = novaBio;
        localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
        
        // Atualiza posts do usuário
        atualizarAutorPosts(usuario.id, novoUsuario);
        
        // Atualiza visualização
        document.getElementById('nomeUsuario').textContent = novoNome;
        document.getElementById('bioUsuario').textContent = novaBio || 'Estudante dedicado 💪';
        document.getElementById('avatarUsuario').textContent = novoNome.charAt(0).toUpperCase();
        
        alert('Perfil atualizado com sucesso!');
    }
    
    cancelarEdicao();
}

function atualizarAutorPosts(usuarioId, novoUsuario) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    
    posts.forEach(post => {
        if (post.autorId === usuarioId) {
            post.autor = novoUsuario;
        }
        
        // Atualiza comentários do usuário
        if (post.comentarios) {
            post.comentarios.forEach(comentario => {
                if (comentario.autorId === usuarioId) {
                    comentario.autor = novoUsuario;
                }
            });
        }
    });
    
    localStorage.setItem('posts', JSON.stringify(posts));
}

function atualizarBio(novaBio) {
    if (novaBio.length > 200) {
        alert('A bio deve ter no máximo 200 caracteres!');
        return;
    }
}

// Funções dos modais
function mostrarModalAlterarSenha() {
    document.getElementById('modalAlterarSenha').style.display = 'flex';
}

function mostrarModalExcluirConta() {
    document.getElementById('modalExcluirConta').style.display = 'flex';
}

function fecharModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function alterarSenha() {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    
    const senhaAtual = document.getElementById('senhaAtual').value;
    const novaSenha = document.getElementById('novaSenha').value;
    const confirmarNovaSenha = document.getElementById('confirmarNovaSenha').value;
    
    // Validações
    if (senhaAtual !== usuario.senha) {
        alert('Senha atual incorreta!');
        return;
    }
    
    if (novaSenha !== confirmarNovaSenha) {
        alert('As novas senhas não coincidem!');
        return;
    }
    
    if (novaSenha.length < 6) {
        alert('A nova senha deve ter pelo menos 6 caracteres!');
        return;
    }
    
    // Atualiza senha
    const usuarioIndex = usuarios.findIndex(u => u.id === usuario.id);
    if (usuarioIndex !== -1) {
        usuarios[usuarioIndex].senha = novaSenha;
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        
        // Atualiza usuário logado
        usuario.senha = novaSenha;
        localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
        
        alert('Senha alterada com sucesso!');
        fecharModal('modalAlterarSenha');
    }
}

function excluirConta() {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    
    // Remove usuário do array
    const usuariosAtualizados = usuarios.filter(u => u.id !== usuario.id);
    localStorage.setItem('usuarios', JSON.stringify(usuariosAtualizados));
    
    // Remove posts do usuário
    const postsAtualizados = posts.filter(post => post.autorId !== usuario.id);
    localStorage.setItem('posts', JSON.stringify(postsAtualizados));
    
    // Remove usuário logado
    localStorage.removeItem('usuarioLogado');
    
    alert('Sua conta foi excluída com sucesso.');
    window.location.href = 'index.html';
}

// Adiciona estilos para tema escuro dinamicamente
function adicionarEstilosTemaEscuro() {
    const style = document.createElement('style');
    style.textContent = `
        .tema-escuro {
            background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
            color: #e2e8f0;
        }
        
        .tema-escuro .card,
        .tema-escuro .materia-header,
        .tema-escuro .materia-conteudo,
        .tema-escuro .auth-container,
        .tema-escuro .feed-posts,
        .tema-escuro .sidebar-box,
        .tema-escuro .perfil-container,
        .tema-escuro .post-card {
            background: #2d3748;
            color: #e2e8f0;
            border-color: #4a5568;
        }
        
        .tema-escuro h1, .tema-escuro h2, .tema-escuro h3, .tema-escuro h4 {
            color: #e2e8f0;
        }
        
        .tema-escuro p, .tema-escuro li {
            color: #cbd5e0;
        }
        
        .tema-escuro input, .tema-escuro textarea, .tema-escuro select {
            background: #4a5568;
            color: #e2e8f0;
            border-color: #718096;
        }
        
        .tema-escuro input::placeholder {
            color: #a0aec0;
        }
    `;
    document.head.appendChild(style);
}

// Inicializa estilos do tema escuro
adicionarEstilosTemaEscuro();