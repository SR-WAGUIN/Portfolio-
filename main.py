from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import List

app = FastAPI()

# Se n tiver essa bagaça aqui n roda!!!
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)



class Contato(BaseModel):
    email: str
    telefone: str
    linkedin: str
    github: str
    cidade: str

class Experiencia(BaseModel):
    id: int
    cargo: str
    empresa: str
    periodo: str
    descricao: str

class Educacao(BaseModel):
    id: int
    curso: str
    instituicao: str
    periodo: str

class Habilidade(BaseModel):
    id: int
    nome: str
    nivel: str  # ex: "Avançado", "Intermediário", "Básico"

class Projeto(BaseModel):
    id: int
    nome: str
    descricao: str
    link: str

class Curriculo(BaseModel):
    nome: str
    titulo: str
    sobre: str
    contato: Contato
    experiencias: List[Experiencia]
    educacao: List[Educacao]
    habilidades: List[Habilidade]
    projetos: List[Projeto]



dados: Curriculo = Curriculo(
    nome="Wagner santtos",
    titulo="Desenvolvedor backend",
    sobre="Garoto de programa, mestre em computaria, tiro suas ideias do papel usando letrinhas coloridas.",
    contato=Contato(
        email="wagnersanttos@gmail.com",
        telefone="(66) 99935-7199",
        linkedin="linkedin.com/in/seuperfil",
        github="github.com/seuusuario",
        cidade="Sinop, MT"
    ),
    experiencias=[
        Experiencia(
            id=1,
            cargo="Desenvolvedor backend",
            empresa="Microsoft Corporation",
            periodo="2021 - Atual",
            descricao="Desenvolvimento de aplicações web utilizando Ruby, Java, JavaScript e Python."
        )
    ],
    educacao=[
        Educacao(
            id=1,
            curso="Engenharia da Computação",
            instituicao="Faculdade De Tecnoligia De Sinop",
            periodo="2025 - Atual"
        )
    ],
    habilidades=[
        Habilidade(id=1, nome="HTML/CSS", nivel="Iniciante"),
        Habilidade(id=2, nome="JavaScript", nivel="Iniciante"),
        Habilidade(id=3, nome="Python", nivel="Intermediário"),
        Habilidade(id=4, nome="java", nivel="Intermediário"),
    ],
    projetos=[
        Projeto(
            id=1,
            nome="Portfólio Pessoal",
            descricao="Página de portfólio com API em FastAPI.",
            link="https://github.com/seuusuario/portfolio"
        )
    ]
)


@app.get("/api/curriculo", response_model=Curriculo)
def get_curriculo():
    return dados

@app.put("/api/curriculo", response_model=Curriculo)
def update_curriculo(novo: Curriculo):
    global dados
    dados = novo
    return dados

# isso distribui para os arquivos (HTML, CSS, JS), n apaga isso pelo amor de Deus.
app.mount("/", StaticFiles(directory=".", html=True), name="static")

