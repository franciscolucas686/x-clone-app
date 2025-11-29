# X-Clone Backend

## Visão geral
`x-clone-backend` é o backend da versão clone do app X, desenvolvido com **Django** e **Django REST Framework**.  
Ele fornece funcionalidades de rede social, incluindo autenticação de usuários, criação de posts, feed, seguidores/seguindo, curtidas e comentários.  
Também suporta upload de avatares e gerenciamento de perfis.  

## Tecnologias
- Python 3.12+
- Django
- Django REST Framework
- Docker & Docker Compose (opcional)
- PostgreSQL (ou outro banco configurável)

## Estrutura principal
- `accounts/` — gerenciamento de usuários e autenticação  
- `posts/` — criação e gerenciamento de posts, curtidas e comentários  
- `followers/` — funcionalidade de seguir/seguido entre usuários  
- `seed_data.py` / `seed_data_dev.py` — scripts para popular dados de teste  
- `media-seed/avatars/` — avatares padrões

## Como usar

### Com Docker
1. Clone o repositório:
```bash
git clone https://github.com/franciscolucas686/x-clone-backend.git
cd x-clone-backend
```

2. Suba os containers:
```bash
docker-compose up --build
```

### Sem Docker
1. Crie um ambiente virtual Python:
```bash
python -m venv venv
source venv/bin/activate  # Linux/macOS
venv\Scripts\activate     # Windows
```

2.instale dependencias:
```bash
pip install -r requirements.txt
```

3. Aplique migrações:
```bash
python manage.py migrate
```

4. (Opcional) Rode seeds de dados:
```bash
python seed_data_dev.py
```

5. Inicie o servidor:
```bash
python manage.py runserver
```

O backend estará disponível em: http://127.0.0.1:8000/

## CI/CD

O projeto possui **Integração Contínua (CI)** e **Deploy Contínuo (CD)** configurados via **GitHub Actions**:

### CI
Ao enviar push para a branch `main`, o workflow:

- Configura Python 3.12
- Configura Postgres para testes
- Instala dependências
- Executa os testes do Django (`python manage.py test`)

### CD
Se os testes passarem, o workflow dispara automaticamente o **deploy no Render** usando os secrets `RENDER_SERVICE_ID` e `RENDER_API_KEY`.

Isso garante que o código seja testado e atualizado em produção automaticamente.


##Este backend serve como API para o frontend do clone do app X, permitindo simular uma rede social completa com usuários, posts e interações.



