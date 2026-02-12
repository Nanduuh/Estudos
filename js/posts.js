// =============================
// BANCO DE POSTS PADRÃO
// =============================

const postsPadrao = [
  {
    id: "1",
    titulo: "Guia Completo: Como Escrever uma Redação Nota 1000",
    resumo: "Estrutura, argumentação e dicas de correção.",
    conteudo: `
      <h2>Introdução</h2>
      <p>Uma redação perfeita precisa ter introdução, desenvolvimento e conclusão bem definidos.</p>
      
      <h2>Estrutura da Redação</h2>
      <p><strong>Introdução:</strong> Apresente o tema e sua tese de forma clara.</p>
      <p><strong>Desenvolvimento:</strong> Argumente com dados, exemplos e citações.</p>
      <p><strong>Conclusão:</strong> Retome a tese e apresente uma proposta de intervenção.</p>
      
      <h2>Dicas Importantes</h2>
      <ul>
        <li>Use conectivos adequados</li>
        <li>Evite repetições</li>
        <li>Respeite a norma culta</li>
        <li>Seja objetivo e claro</li>
      </ul>
    `,
    materia: "portugues",
    categoria: "📘 Português",
    data: "2026-01-30",
    autor: "Admin",
    imagem: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=400",
    curtidas: 0,
    comentarios: []
  },
  {
    id: "2",
    titulo: "Macetes para Resolver Equações do 2º Grau Rapidamente",
    resumo: "Técnicas práticas que vão facilitar seus cálculos.",
    conteudo: `
      <h2>Fórmula de Bhaskara</h2>
      <p>A fórmula de Bhaskara é: x = (-b ± √Δ) / 2a</p>
      <p>Onde Δ = b² - 4ac</p>
      
      <h2>Passo a Passo</h2>
      <ol>
        <li>Identifique os coeficientes a, b e c</li>
        <li>Calcule o discriminante (Δ)</li>
        <li>Aplique a fórmula</li>
        <li>Encontre as duas raízes</li>
      </ol>
      
      <h2>Dica Profissional</h2>
      <p>Se Δ < 0, não há raízes reais. Se Δ = 0, há apenas uma raiz. Se Δ > 0, há duas raízes distintas.</p>
    `,
    materia: "matematica",
    categoria: "📐 Matemática",
    data: "2026-02-01",
    autor: "Admin",
    imagem: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400",
    curtidas: 0,
    comentarios: []
  },
  {
    id: "3",
    titulo: "Resumo: Tabela Periódica Simplificada",
    resumo: "Entenda os grupos e períodos de forma descomplicada.",
    conteudo: `
      <h2>Organização da Tabela</h2>
      <p>A tabela periódica organiza os elementos químicos por número atômico crescente.</p>
      
      <h2>Grupos e Períodos</h2>
      <p><strong>Períodos:</strong> São as linhas horizontais (7 no total)</p>
      <p><strong>Grupos:</strong> São as colunas verticais (18 no total)</p>
      
      <h2>Principais Grupos</h2>
      <ul>
        <li><strong>Grupo 1:</strong> Metais alcalinos</li>
        <li><strong>Grupo 2:</strong> Metais alcalinos terrosos</li>
        <li><strong>Grupo 17:</strong> Halogênios</li>
        <li><strong>Grupo 18:</strong> Gases nobres</li>
      </ul>
    `,
    materia: "ciencias",
    categoria: "🧪 Ciências",
    data: "2026-01-26",
    autor: "Admin",
    imagem: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400",
    curtidas: 0,
    comentarios: []
  },
  {
    id: "4",
    titulo: "5 Técnicas Comprovadas para Melhorar seu Rendimento",
    resumo: "Descubra métodos científicos que vão transformar sua forma de estudar.",
    conteudo: `
      <h2>1. Técnica Pomodoro</h2>
      <p>Estude por 25 minutos e descanse 5 minutos. A cada 4 ciclos, descanse 15-30 minutos.</p>
      
      <h2>2. Revisão Espaçada</h2>
      <p>Revise o conteúdo em intervalos crescentes: 1 dia, 3 dias, 7 dias, 15 dias, 30 dias.</p>
      
      <h2>3. Método Feynman</h2>
      <p>Explique o conteúdo como se estivesse ensinando para alguém. Se travar, volte e estude mais.</p>
      
      <h2>4. Mapas Mentais</h2>
      <p>Organize visualmente as informações conectando ideias principais com ramificações.</p>
      
      <h2>5. Resumos em Flashcards</h2>
      <p>Crie perguntas de um lado e respostas do outro. Teste-se constantemente.</p>
    `,
    materia: "dicas",
    categoria: "📚 Dicas de Estudo",
    data: "2026-02-05",
    autor: "Admin",
    imagem: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600",
    curtidas: 0,
    comentarios: []
  },
  {
    id: "5",
    titulo: "Como Criar um Cronograma de Estudos Eficiente",
    resumo: "Aprenda a organizar seu tempo de forma inteligente e produtiva.",
    conteudo: `
      <h2>Passo 1: Avalie seu Tempo</h2>
      <p>Liste todas as atividades fixas (escola, trabalho, etc) e veja quanto tempo livre você tem.</p>
      
      <h2>Passo 2: Defina Prioridades</h2>
      <p>Identifique as matérias mais difíceis e reserve mais tempo para elas.</p>
      
      <h2>Passo 3: Distribua as Matérias</h2>
      <p>Alterne matérias de humanas com exatas para não cansar o cérebro.</p>
      
      <h2>Passo 4: Inclua Pausas</h2>
      <p>Nunca estude por mais de 2 horas seguidas sem intervalo.</p>
      
      <h2>Passo 5: Seja Flexível</h2>
      <p>Ajuste o cronograma conforme necessário, mas mantenha a disciplina.</p>
    `,
    materia: "dicas",
    categoria: "📝 Organização",
    data: "2026-02-03",
    autor: "Admin",
    imagem: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400",
    curtidas: 0,
    comentarios: []
  },
  {
    id: "6",
    titulo: "Técnicas de Memorização que Realmente Funcionam",
    resumo: "Métodos comprovados para fixar conteúdo de forma eficaz.",
    conteudo: `
      <h2>Método Loci (Palácio da Memória)</h2>
      <p>Associe informações a lugares conhecidos. Crie uma história mental percorrendo esses lugares.</p>
      
      <h2>Acrônimos e Mnemônicos</h2>
      <p>Crie palavras ou frases com as primeiras letras do que precisa decorar.</p>
      
      <h2>Chunking (Agrupamento)</h2>
      <p>Agrupe informações em blocos menores. Exemplo: número de telefone (51) 9 9242-8486.</p>
      
      <h2>Associação de Imagens</h2>
      <p>Transforme conceitos abstratos em imagens mentais vívidas e bizarras.</p>
      
      <h2>Ensinar para Outros</h2>
      <p>A melhor forma de fixar é explicar para alguém. Você descobre o que realmente sabe.</p>
    `,
    materia: "dicas",
    categoria: "🧠 Produtividade",
    data: "2026-01-28",
    autor: "Admin",
    imagem: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400",
    curtidas: 0,
    comentarios: []
  }
];

// =============================
// FUNÇÕES DE GERENCIAMENTO
// =============================

function pegarPosts() {
  const postsUsuario = JSON.parse(localStorage.getItem("postsUsuario")) || [];
  return [...postsPadrao, ...postsUsuario];
}

function salvarPost(post) {
  const postsUsuario = JSON.parse(localStorage.getItem("postsUsuario")) || [];
  postsUsuario.unshift(post);
  localStorage.setItem("postsUsuario", JSON.stringify(postsUsuario));
}

function pegarPostPorId(id) {
  const posts = pegarPosts();
  return posts.find(p => p.id === id);
}

function curtirPost(id) {
  const curtidas = JSON.parse(localStorage.getItem("curtidas")) || {};
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
  
  if (!usuario) {
    alert("Você precisa estar logado para curtir!");
    return;
  }
  
  if (!curtidas[id]) {
    curtidas[id] = [];
  }
  
  const index = curtidas[id].indexOf(usuario.usuario);
  
  if (index > -1) {
    curtidas[id].splice(index, 1);
  } else {
    curtidas[id].push(usuario.usuario);
  }
  
  localStorage.setItem("curtidas", JSON.stringify(curtidas));
  return curtidas[id].length;
}

function pegarCurtidas(id) {
  const curtidas = JSON.parse(localStorage.getItem("curtidas")) || {};
  return curtidas[id] ? curtidas[id].length : 0;
}

function usuarioCurtiu(id) {
  const curtidas = JSON.parse(localStorage.getItem("curtidas")) || {};
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
  
  if (!usuario || !curtidas[id]) return false;
  
  return curtidas[id].includes(usuario.usuario);
}

function adicionarComentario(postId, texto) {
  const comentarios = JSON.parse(localStorage.getItem("comentarios")) || {};
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
  
  if (!usuario) {
    alert("Você precisa estar logado para comentar!");
    return;
  }
  
  if (!comentarios[postId]) {
    comentarios[postId] = [];
  }
  
  comentarios[postId].push({
    id: Date.now(),
    usuario: usuario.nome,
    texto: texto,
    data: new Date().toISOString()
  });
  
  localStorage.setItem("comentarios", JSON.stringify(comentarios));
  return comentarios[postId];
}

function pegarComentarios(postId) {
  const comentarios = JSON.parse(localStorage.getItem("comentarios")) || {};
  return comentarios[postId] || [];
}