# 📁 Portfólio com FastAPI

Projeto da Atividade 3 — HTML, CSS, JavaScript e FastAPI.

## 📂 Arquivos

```
portfolio/
├── main.py       ← API em Python (FastAPI)
├── index.html    ← Página do portfólio
├── style.css     ← Estilização
└── script.js     ← Lógica do frontend
```

## 🚀 Como rodar

### 1. Instale as dependências Python
```bash
pip install fastapi uvicorn
```

### 2. Rode o servidor
```bash
uvicorn main:app --reload
```

### 3. Acesse no navegador
```
http://localhost:8000
```

### 4. Documentação automática da API
```
http://localhost:8000/docs
```

## ✏️ Como editar seus dados

- Clique no botão **✏️ Editar** no canto inferior direito
- Edite as abas: Básico, Contato, Experiências, Educação, Habilidades, Projetos
- Clique em **💾 Salvar**

Os dados são salvos via `PUT /api/curriculo` e ficam na memória enquanto o servidor está rodando.

> **Dica**: Para salvar os dados permanentemente, você pode editar os dados iniciais diretamente no `main.py`, na seção "Dados iniciais".

## 📤 Publicar no GitHub Pages

1. Crie um repositório no GitHub
2. Faça upload dos 4 arquivos
3. Vá em **Settings → Pages** e ative o GitHub Pages

> Obs: O GitHub Pages só serve arquivos estáticos. Para a API funcionar online, você precisará de um host como Railway, Render ou Fly.io para rodar o `main.py`.
