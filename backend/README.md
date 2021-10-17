# #Backend MyTapp App
Backend para funcionamento de uma aplicação de cervejarias utilizando node js.

## Rotas

- `GET /api/v1/beers?page=2&per_page=80`: Responsável listar cervejas com paginação
```js
// Request(Authorization: Bearer <token>):
// Request(Query):
// Response: StatusCode: 200 (OK)
{
    "id": 34,
    "name": "Bourbon Baby",
    "tagline": "Barrel-Aged Scotch Ale.",
    "first_brewed": "01/2014",
    "description": "Santa Paws Scotch ale aged in bourbon barrels - light, dry and toasty, with vanilla, hints of chocolate and ginger biscuit, and a faint spicy hoppiness."
}
```

- `GET /api/v1/beers/2`: Responsável listar cerveja pelo seu ID
```js
// Request(Authorization: Bearer <token>):
// Request(Query):
// Response: StatusCode: 200 (OK)
{
    "id": 34,
    "name": "Bourbon Baby",
    "tagline": "Barrel-Aged Scotch Ale.",
    "first_brewed": "01/2014",
    "description": "Santa Paws Scotch ale aged in bourbon barrels - light, dry and toasty, with vanilla, hints of chocolate and ginger biscuit, and a faint spicy hoppiness."
}
```

- `GET /api/v1/beers/random`: Responsável listar cervejas no modo randomico
```js
// Request(Authorization: Bearer <token>):
// Request(Query):
// Response: StatusCode: 200 (OK)
{
    "id": 34,
    "name": "Bourbon Baby",
    "tagline": "Barrel-Aged Scotch Ale.",
    "first_brewed": "01/2014",
    "description": "Santa Paws Scotch ale aged in bourbon barrels - light, dry and toasty, with vanilla, hints of chocolate and ginger biscuit, and a faint spicy hoppiness."
}
```


## Execução
Para executar o projeto use:(Projeto rodando na porta http://localhost:3333)
```js
npm install
npm run dev
```
