# StomaQuest [APP]

## Tecnologias

- [Nuxt](https://nuxt.com/)
- [Vue](https://vuejs.org/)
- [Kinde](https://kinde.com/)
- [Pinia](https://pinia.vuejs.org/)

## Variáveis de ambiente

```bash
# dev
NUXT_KINDE_CLIENT_ID=<kinde client id>
NUXT_KINDE_CLIENT_SECRET=<kinde secret>
NUXT_KINDE_AUTH_DOMAIN=https://rdvo.kinde.com
NUXT_KINDE_REDIRECT_URL=http://localhost:3000/api/callback
NUXT_KINDE_LOGOUT_REDIRECT_URL=http://localhost:3000
NUXT_KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000/edit
NUXT_KINDE_PASSWORD=<kinde pw>
API_URL=<worker api url>
```

## Configuração

Certifique-se de instalar as dependências:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Produção

Construa a aplicação para produção:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Visualize localmente a versão de produção:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Confira a [documentação de implantação do nuxt](https://nuxt.com/docs/getting-started/deployment) para mais informações.

