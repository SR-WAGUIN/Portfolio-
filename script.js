const API = "http://localhost:8000/api/curriculo";

let dados = null;

// ── Isso aqui busca os dados do python man ─────────────────────────────────────
async function carregarDados() {
  try {
    const res = await fetch(API);
    dados = await res.json();
    renderizar();
  } catch (e) {
    alert("Não foi possível conectar à API. Certifique-se de que o servidor está rodando em localhost:8000.");
    console.error(e);
  }
}

// ── Renderiza o projeto na tela ─────────────────────────────────────────
function renderizar() {
  const d = dados;

  // local com avater com inicial do nome
  document.getElementById("avatarLetra").textContent = d.nome.charAt(0).toUpperCase();

  document.getElementById("vNome").textContent = d.nome;
  document.getElementById("vTitulo").textContent = d.titulo;
  document.getElementById("vCidade").textContent = "📍 " + d.contato.cidade;
  document.getElementById("vSobre").textContent = d.sobre;

  // Contatos
  document.getElementById("vContatos").innerHTML = `
    <a href="mailto:${d.contato.email}">✉️ ${d.contato.email}</a>
    <a href="tel:${d.contato.telefone}">📞 ${d.contato.telefone}</a>
    <a href="https://${d.contato.linkedin}" target="_blank">💼 LinkedIn</a>
    <a href="https://${d.contato.github}" target="_blank">🐙 GitHub</a>
  `;

  // Experiências
  document.getElementById("vExperiencias").innerHTML = d.experiencias.map(e => `
    <div class="card">
      <div class="card-periodo">${e.periodo}</div>
      <div class="card-titulo">${e.cargo}</div>
      <div class="card-sub">${e.empresa}</div>
      <div class="card-desc">${e.descricao}</div>
    </div>
  `).join("");

  // Educação
  document.getElementById("vEducacao").innerHTML = d.educacao.map(e => `
    <div class="card">
      <div class="card-periodo">${e.periodo}</div>
      <div class="card-titulo">${e.curso}</div>
      <div class="card-sub">${e.instituicao}</div>
    </div>
  `).join("");

  // Habilidades
  document.getElementById("vHabilidades").innerHTML = d.habilidades.map(h => `
    <div class="skill-tag">${h.nome}<span>${h.nivel}</span></div>
  `).join("");

  // Projetos
  document.getElementById("vProjetos").innerHTML = d.projetos.map(p => `
    <div class="projeto-card">
      <h3>${p.nome}</h3>
      <p>${p.descricao}</p>
      ${p.link ? `<a href="${p.link}" target="_blank">🔗 Ver projeto</a>` : ""}
    </div>
  `).join("");
}

// ── Abre o modal de edição dessa bagaça ────────────────────────────────────────────────
function abrirEditor() {
  const d = dados;

  // Preenche campos básicos
  document.getElementById("eNome").value = d.nome;
  document.getElementById("eTitulo").value = d.titulo;
  document.getElementById("eSobre").value = d.sobre;

  // Contato
  document.getElementById("eEmail").value = d.contato.email;
  document.getElementById("eTelefone").value = d.contato.telefone;
  document.getElementById("eLinkedin").value = d.contato.linkedin;
  document.getElementById("eGithub").value = d.contato.github;
  document.getElementById("eCidade").value = d.contato.cidade;

  // Listas dinâmicas
  renderizarListaExp();
  renderizarListaEdu();
  renderizarListaSkills();
  renderizarListaProj();

  document.getElementById("modal").classList.remove("hidden");
}

function fecharEditor() {
  document.getElementById("modal").classList.add("hidden");
}

// ── Troca de abas ─────────────────────────────────────────────────────────
function trocarTab(btn, tabId) {
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("ativo"));
  document.querySelectorAll(".tab-content").forEach(t => t.classList.remove("ativo"));
  btn.classList.add("ativo");
  document.getElementById(tabId).classList.add("ativo");
}

// ──  listas editáveis ───────────────────────────────────────────────
function renderizarListaExp() {
  document.getElementById("listaExp").innerHTML = dados.experiencias.map((e, i) => `
    <div class="item-card">
      <div class="item-card-header">
        <strong>Experiência ${i + 1}</strong>
        <button class="btn-remover" onclick="removerItem('exp', ${i})">Remover</button>
      </div>
      <label>Cargo<input value="${e.cargo}" onchange="dados.experiencias[${i}].cargo = this.value" /></label>
      <label>Empresa<input value="${e.empresa}" onchange="dados.experiencias[${i}].empresa = this.value" /></label>
      <label>Período<input value="${e.periodo}" onchange="dados.experiencias[${i}].periodo = this.value" /></label>
      <label>Descrição<textarea rows="2" onchange="dados.experiencias[${i}].descricao = this.value">${e.descricao}</textarea></label>
    </div>
  `).join("");
}

function renderizarListaEdu() {
  document.getElementById("listaEdu").innerHTML = dados.educacao.map((e, i) => `
    <div class="item-card">
      <div class="item-card-header">
        <strong>Educação ${i + 1}</strong>
        <button class="btn-remover" onclick="removerItem('edu', ${i})">Remover</button>
      </div>
      <label>Curso<input value="${e.curso}" onchange="dados.educacao[${i}].curso = this.value" /></label>
      <label>Instituição<input value="${e.instituicao}" onchange="dados.educacao[${i}].instituicao = this.value" /></label>
      <label>Período<input value="${e.periodo}" onchange="dados.educacao[${i}].periodo = this.value" /></label>
    </div>
  `).join("");
}

function renderizarListaSkills() {
  document.getElementById("listaSkills").innerHTML = dados.habilidades.map((h, i) => `
    <div class="item-card">
      <div class="item-card-header">
        <strong>Habilidade ${i + 1}</strong>
        <button class="btn-remover" onclick="removerItem('skill', ${i})">Remover</button>
      </div>
      <label>Nome<input value="${h.nome}" onchange="dados.habilidades[${i}].nome = this.value" /></label>
      <label>Nível
        <select onchange="dados.habilidades[${i}].nivel = this.value">
          ${["Básico","Intermediário","Avançado"].map(n =>
            `<option ${h.nivel === n ? "selected" : ""}>${n}</option>`
          ).join("")}
        </select>
      </label>
    </div>
  `).join("");
}

function renderizarListaProj() {
  document.getElementById("listaProj").innerHTML = dados.projetos.map((p, i) => `
    <div class="item-card">
      <div class="item-card-header">
        <strong>Projeto ${i + 1}</strong>
        <button class="btn-remover" onclick="removerItem('proj', ${i})">Remover</button>
      </div>
      <label>Nome<input value="${p.nome}" onchange="dados.projetos[${i}].nome = this.value" /></label>
      <label>Descrição<textarea rows="2" onchange="dados.projetos[${i}].descricao = this.value">${p.descricao}</textarea></label>
      <label>Link<input value="${p.link}" onchange="dados.projetos[${i}].link = this.value" /></label>
    </div>
  `).join("");
}

// ── Adicionar / Remover itens ─────────────────────────────────────────────
function adicionarItem(tipo) {
  const nextId = Date.now();
  if (tipo === "exp") {
    dados.experiencias.push({ id: nextId, cargo: "", empresa: "", periodo: "", descricao: "" });
    renderizarListaExp();
  } else if (tipo === "edu") {
    dados.educacao.push({ id: nextId, curso: "", instituicao: "", periodo: "" });
    renderizarListaEdu();
  } else if (tipo === "skill") {
    dados.habilidades.push({ id: nextId, nome: "", nivel: "Básico" });
    renderizarListaSkills();
  } else if (tipo === "proj") {
    dados.projetos.push({ id: nextId, nome: "", descricao: "", link: "" });
    renderizarListaProj();
  }
}

function removerItem(tipo, index) {
  if (!confirm("Remover este item?")) return;
  if (tipo === "exp") { dados.experiencias.splice(index, 1); renderizarListaExp(); }
  else if (tipo === "edu") { dados.educacao.splice(index, 1); renderizarListaEdu(); }
  else if (tipo === "skill") { dados.habilidades.splice(index, 1); renderizarListaSkills(); }
  else if (tipo === "proj") { dados.projetos.splice(index, 1); renderizarListaProj(); }
}

// ── Salva via PUT na API ──────────────────────────────────────────────────
async function salvar() {
  // Pega os valores dos campos básicos
  dados.nome = document.getElementById("eNome").value;
  dados.titulo = document.getElementById("eTitulo").value;
  dados.sobre = document.getElementById("eSobre").value;
  dados.contato.email = document.getElementById("eEmail").value;
  dados.contato.telefone = document.getElementById("eTelefone").value;
  dados.contato.linkedin = document.getElementById("eLinkedin").value;
  dados.contato.github = document.getElementById("eGithub").value;
  dados.contato.cidade = document.getElementById("eCidade").value;

  try {
    const res = await fetch(API, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados)
    });
    if (!res.ok) throw new Error("Erro ao salvar");
    dados = await res.json();
    renderizar();
    fecharEditor();
    alert(" Salvo com sucesso!");
  } catch (e) {
    alert(" Erro ao salvar. Verifique se o servidor está rodando.");
    console.error(e);
  }
}

// ── Inicia ────────────────────────────────────────────────────────────────
carregarDados();
