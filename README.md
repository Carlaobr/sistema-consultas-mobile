# Sistema de Consultas Mobile — CP2

Continuação do CP1, com foco em **gerenciamento de estado** e **persistência de dados**.

## Tecnologias
- React Native + Expo
- TypeScript
- AsyncStorage (`@react-native-async-storage/async-storage`)

## Como executar

```bash
npm install
npx expo start
```

## Funcionalidades

- ✅ **Confirmar consulta** — altera status para "Confirmada" e persiste
- ❌ **Cancelar consulta** — altera status para "Cancelada" e persiste
- 💾 **Persistência** — dados salvos com AsyncStorage, mantidos após fechar o app
- 🔄 **Carregamento automático** — `useEffect` carrega dados ao iniciar
- 🔍 **Filtro por status** — filtra consultas em tempo real
- 📊 **Resumo** — contagem por status sempre atualizada

## Estrutura

```
src/
  hooks/
    useConsultas.ts       ← useState + AsyncStorage centralizados
  components/
    ConsultaCard.tsx      ← card com botões Confirmar e Cancelar
    FiltroStatus.tsx      ← filtro horizontal por status
  data/
    consultas.ts          ← dados iniciais (usados só na 1ª execução)
  types/
    index.ts              ← interfaces TypeScript
App.tsx                   ← componente raiz
```

## Chave AsyncStorage

```
@consultas:consulta_atual
```
