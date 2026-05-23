# Sistema de Consultas Mobile

Aplicativo mobile de gerenciamento de consultas médicas desenvolvido com **React Native + Expo + TypeScript**.

## Requisitos MVP Atendidos

- [x] **Titulo do sistema** - Exibido no header: "Sistema de Consultas"
- [x] **Consulta simulada** - Lista com 4 consultas simuladas
- [x] **TypeScript** - Interfaces, tipos e tipagem estrita em todo o projeto
- [x] **useState** - Controle de filtro ativo e visibilidade do painel de resumo
- [x] **Renderizacao condicional** - Painel de resumo e detalhes da consulta (expandir/recolher)

## Estrutura do Projeto

```
sistema-consultas-mobile/
├── src/
│   ├── types/
│   │   └── index.ts         # Interfaces TypeScript
│   ├── data/
│   │   └── consultas.ts     # Dados simulados
│   └── components/
│       ├── ConsultaCard.tsx  # Card com expand/collapse
│       └── FiltroStatus.tsx  # Filtros horizontais
├── App.tsx                   # Componente principal
├── app.json                  # Configuração Expo
├── tsconfig.json
├── babel.config.js
└── package.json
```

## Funcionalidades

- Listagem de consultas com status (Agendada, Realizada, Pendente, Cancelada)
- Filtro por status com contadores
- Painel de resumo com totais por categoria
- Card expansível com detalhes completos da consulta
- TypeScript com interfaces para Paciente, Médico e Consulta

## Como executar

### Pré-requisitos
- Node.js instalado
- Expo CLI instalado globalmente

### Instalação

```bash
npm install
```

### Executar

```bash
# Iniciar o servidor Expo
npx expo start

# Ou para plataformas específicas:
npx expo start --android
npx expo start --ios
npx expo start --web
```

Abra o app **Expo Go** no celular e escaneie o QR Code.

## Tecnologias

- **React Native** 0.76
- **Expo** ~52.0
- **TypeScript** 5.x
- React Hooks: `useState`
- Componentes: `FlatList`, `TouchableOpacity`, `SafeAreaView`
