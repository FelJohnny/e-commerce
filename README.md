 # Fluxo de atividades do usuario dentro do sistema

```mermaid

graph TD
    User[Usuário] -->|Adicionar Jogo| GameCatalog[Catálogo de Jogos]
    User -->|Excluir Jogo| GameCatalog
    User -->|Alterar Jogo| GameCatalog
    User -->|Adicionar ao Carrinho| ShoppingCart[Carrinho de Compras]
    User -->|Comprar Jogo| PurchaseSystem[Sistema de Compras]
    ShoppingCart -->|Comprar Jogo| PurchaseSystem
    GameCatalog -->|Adicionar ao Carrinho| ShoppingCart
    PurchaseSystem -->|Atualizar Estoque| GameCatalog

    classDef user fill:#f9f,stroke:#333,stroke-width:4px;
    classDef system fill:#9f6,stroke:#333,stroke-width:4px;

    class User user;
    class GameCatalog,ShoppingCart,PurchaseSystem system;


```

 ✔ O Usuário pode adicionar, excluir e alterar jogos no Catálogo de Jogos que está vinculado ao seu perfil.<br/>
 ✔ O Usuário pode adicionar jogos ao Carrinho de Compras.<br/>
 ✔ O Usuário pode comprar jogos através do Sistema de Compras.<br/>
 ✔ O Carrinho de Compras pode se comunicar com o Sistema de Compras para finalizar a compra.<br/>
 ✔ O Sistema de Compras" atualiza o estoque no Catálogo de Jogos após uma compra.<br/>



 # Diagrama de Classe :
```mermaid
classDiagram
    Controller <|-- Produto_Controller
    Controller <|-- Rule_Controller
    
    Produto_Controller --> Produto_Services
    Produto_Controller --> model
    Produto_Controller --> jwt

    Controller *-- Services : propsServices
    Controller *-- model : camposObrigatorios
    
    class Controller {
        - propsServices
        - camposObrigatorios
        - camposVazios
        + allowNull(req, res) bool
        + criaRegistroController(req, res)
        + pegaTodosController(req, res)
        + pegaUmRegistroPorIdController(req, res)
        + atulizaDadoController(req, res)
        + excluiRegistroController(req, res)
    }
    
    class Produto_Controller {
        + criaProduto_Controller(req, res)
        + pegaTodosProdutosPorPage_Controller(req, res)
        + pegaProdutosPorId_Controller(req, res)
    }

    class Rule_Controller {
        << empty >>
    }
    
    class Produto_Services {
        + criaRegistro(dadosParaCriacao)
        + pegaTodosRegistros()
        + pegaUmRegistroPorId(id)
        + atualizaDado(dadosAtualizados, id)
        + excluiRegistro(id)
        + pegaTodosProdutosPorPage_Services(ItenStarted, limit)
    }
    
    class Rule_Services {
        + criaRegistro(dadosParaCriacao)
        + pegaTodosRegistros()
        + pegaUmRegistroPorId(id)
        + atualizaDado(dadosAtualizados, id)
        + excluiRegistro(id)
    }

    class Usuario_Services {
        + criaRegistro(dadosParaCriacao)
        + pegaTodosRegistros()
        + pegaUmRegistroPorId(id)
        + atualizaDado(dadosAtualizados, id)
        + excluiRegistro(id)
        + pegaUmUsuarioPorId(id)
    }

    class Services {
        - nomeModel
        + criaRegistro(dadosDoRegistro)
        + pegaTodosRegistros()
        + pegaUmRegistroPorId(id)
        + pegaRegistroPorEmail(dado)
        + atualizaDado(dadosAtualizados, id)
        + excluiRegistro(id)
    }

    class model {
        + sequelize
        + Usuario
        + Produto
        + Rule
    }

    class jwt {
        + decode(token, secret)
    }

    Services <|-- Produto_Services
    Services <|-- Rule_Services
    Services <|-- Usuario_Services
    Produto_Services --> model
    Usuario_Services --> model
    Usuario_Services --> bcrypt

    class Produto {
        + nome: STRING
        + preco: DOUBLE
        + status: BOOLEAN
        + capa_produto: STRING
        + usuario_id: INTEGER
        + associate(models)
    }

    class Rule {
        + nome: STRING
        + associate(models)
    }

    class Usuario {
        + email: STRING
        + senha: STRING
        + nome_completo: STRING
        + rule_id: INTEGER
        + associate(models)
    }

    Produto --> Usuario : usuario_id
    Rule --> Usuario : rule_id
    Usuario --> Produto : id



```
 ## Descrição:
 Controladores (Controllers)

➤ **Controller:** </br> Classe base que contém métodos genéricos para operações CRUD (Create, Read, Update, Delete).</br></br> Métodos incluem: </br>
- allowNull, </br>
- criaRegistroController,</br> 
- pegaTodosController,</br>
- pegaUmRegistroPorIdController,</br>
- atulizaDadoController, e excluiRegistroController. </br>

➤ **Produto_Controller:** </br> Estende a classe Controller e adiciona métodos específicos para produtos, como:
- criaProduto_Controller,</br>
- pegaTodosProdutosPorPage_Controller e pegaProdutosPorId_Controller.</br>
Rule_Controller: </br> Estende a classe Controller e utiliza serviços específicos para regras, sem adicionar novos métodos.</br>
➤ **Serviços (Services)** </br>
 **Services:** </br> Classe base que fornece métodos comuns para operações no banco de dados, como:
 - criaRegistro, </br>
 - pegaTodosRegistros, </br>
 - pegaUmRegistroPorId,</br>
 -atualizaDado e excluiRegistro.</br>
➤ **Produto_Services:** </br> Estende a classe Services e adiciona métodos específicos para produtos, como </br>
  - pegaTodosProdutosPorPage_Services.</br>
➤ **Rule_Services:** Estende a classe Services sem adicionar novos métodos.</br>
➤ **Usuario_Services:** </br> Estende a classe Services e adiciona métodos específicos para usuários, como:</br>
- pegaUmUsuarioPorId.</br>
➤ **Modelos (Models)** </br>
➤ **Produto:</br></br>** Modelo que representa a tabela de produtos no banco de dados, com atributos como nome, preco, status, capa_produto e usuario_id. Relaciona-se com Usuario.</br>
➤ **Rule:** </br> Modelo que representa a tabela de regras no banco de dados, com um atributo nome. Relaciona-se com Usuario.</br>
➤ **Usuario:** </br> Modelo que representa a tabela de usuários no banco de dados, com atributos como email, senha, nome_completo e rule_id. Relaciona-se com Produto e Rule.</br>
**Outros Componentes** </br>
➤ **model:** </br> Representa as conexões e modelos do banco de dados, incluindo Produto, Rule, e Usuario. Utiliza Sequelize para definir e associar modelos.</br>
➤ **jwt:** </br> Utilizado para decodificar tokens JWT, garantindo a autenticação dos usuários.</br>
➤ **bcrypt:** </br> Utilizado para hash e verificação de senhas de usuários, garantindo a segurança dos dados.</br>
Interações e Relacionamentos</br>
Controladores e Serviços:</br></br> Os controladores utilizam os serviços para realizar operações no banco de dados. Por exemplo, Produto_Controller utiliza Produto_Services para criar, ler, atualizar e excluir produtos.
Modelos e Banco de Dados:</br></br> Os modelos representam as tabelas do banco de dados e definem os relacionamentos entre si. Por exemplo, Produto pertence a Usuario, e Usuario pertence a Rule.
Autenticação e Autorização:</br></br> Produto_Controller utiliza JWT para autenticação, garantindo que apenas usuários autenticados possam realizar certas operações. O uso de bcrypt em Usuario_Services garante que as senhas sejam armazenadas de forma segura.
Fluxo de Operações
Criação de Produto:</br></br>

Um pedido para criar um produto é enviado para Produto_Controller.
O controlador valida os dados e verifica a autenticação do usuário usando JWT.
Se a validação e autenticação são bem-sucedidas, Produto_Services é chamado para salvar o novo produto no banco de dados.
A resposta é retornada ao cliente com o status da operação.
Leitura de Produtos:

Um pedido para listar produtos é enviado para Produto_Controller.
O controlador chama Produto_Services para buscar os produtos no banco de dados, com suporte para paginação.
A resposta é retornada ao cliente com a lista de produtos e informações de paginação.
Atualização de Produto:

Um pedido para atualizar um produto é enviado para Produto_Controller.
O controlador valida os dados e verifica a existência do produto.
Se a validação for bem-sucedida, Produto_Services é chamado para atualizar o produto no banco de dados.
A resposta é retornada ao cliente com o status da operação.
Exclusão de Produto:

Um pedido para excluir um produto é enviado para Produto_Controller.
O controlador verifica a existência do produto.
Se o produto existe, Produto_Services é chamado para excluir o produto no banco de dados.
A resposta é retornada ao cliente com o status da operação.





