# Endpoints Necessários para Lista de Espera (Waiting List)

## Visão Geral
Para integrar a tela `AdminWaitingList.tsx`, precisamos de endpoints dedicados à lista de espera (leads não matriculados). O endpoint `GET /api/v1/students` fornecido é para alunos matriculados, então criamos endpoints separados para evitar confusão.

## Endpoints

### 1. Buscar Lista de Espera
**GET /api/v1/waiting-list**

- **Descrição**: Retorna a lista de leads em espera com filtros opcionais.
- **Parâmetros de Query**:
  - `search` (string, opcional): Busca por nome, contato ou indicação.
  - `status` (string, opcional): Filtra por status ("Esperando", "Ativo", "Desistiu").
  - `modalidade` (string, opcional): Filtra por modalidade ("VIP", "Turma", "Kids").
- **Resposta**: Array de objetos `WaitingStudent`.
- **Exemplo de Resposta**:
  ```json
  [
    {
      "id": 1,
      "name": "Fernanda Oliveira",
      "referral": "João Santos",
      "referralSource": "Indicação de aluno",
      "location": "São Paulo - SP",
      "contact": "@fernanda.oli",
      "contactType": "Instagram",
      "modality": "VIP",
      "level": "A1 - Iniciante",
      "availability": "Seg e Qua 19h-20h",
      "goal": "Trabalho",
      "quotedPrice": "R$ 280/mês",
      "observation": "Trabalha em multinacional, precisa urgente",
      "status": "Esperando",
      "createdAt": "2024-06-01"
    }
  ]
  ```

## Estrutura de Dados (WaitingStudent)
```typescript
interface WaitingStudent {
  id: number;              // Gerado pelo backend (não enviar em POST/PUT)
  name: string;            // Nome do aluno
  referral: string;        // Quem indicou
  referralSource: string;  // Origem da indicação
  location: string;        // Cidade/Local
  contact: string;         // Contato (telefone ou @instagram)
  contactType: "Telefone" | "Instagram";
  modality: "VIP" | "Turma" | "Kids";
  level: string;           // Nível (ex: "A1 - Iniciante")
  availability: string;    // Disponibilidade (ex: "Seg e Qua 19h-20h")
  goal: "Trabalho" | "Viagem" | "Outros";
  quotedPrice: string;     // Valor passado (ex: "R$ 280/mês")
  observation: string;     // Observações
  status: "Esperando" | "Ativo" | "Desistiu";
  createdAt: string;       // Data de criação (ISO string, gerado pelo backend)
}
```

## Observações
- **Autenticação**: Todos os endpoints devem requerer autenticação de admin.
- **Validações**: Valide campos obrigatórios (ex: `name`) e formatos (ex: `contact`).
- **Mapeamento Interno**: No backend, mapeie `modality` para `StudentType` ("vip", "vip_kids", "group", "group_kids") e `status` para `WaitingListStatus` ("waiting", "enrolled", "declined") se necessário.
- **Erros**: Retorne códigos HTTP apropriados (400 para dados inválidos, 404 para ID inexistente, etc.).
- **Paginação**: Considere adicionar `?page` e `?limit` se a lista for grande.

Se precisar de ajustes ou mais detalhes, avise!</content>
<parameter name="filePath">c:\Users\arinelson.koltz\Documents\english-system-frontend\waiting-list-endpoints.md