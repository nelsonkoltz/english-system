# Admin Students - GET Endpoint

## Tela
- `src/pages/admin/AdminStudents.tsx`

## Serviço
- `src/services/adminService.ts`
- Método: `adminService.getStudents()`

## Endpoint
- `GET /admin/students`

## Descrição
Retorna a lista de alunos cadastrados para uso na tela de administração.

## Requisição
- Método: `GET`
- Caminho: `/admin/students`
- Autenticação: sim, deve ser protegido para usuários admin.

## Resposta esperada
- Tipo: `AdminStudent[]`
- Exemplo de objeto:
  ```json
  {
    "id": 1,
    "name": "João Santos",
    "email": "joao@email.com",
    "teacher": "Prof. Maria",
    "stage": "B1",
    "status": "Ativo",
    "modality": "VIP",
    "age": 25,
    "startDate": "2024-03-01",
    "location": "São Paulo - SP (BRT)",
    "packageTotal": 8,
    "packageUsed": 5,
    "packageValue": "R$680"
  }
  ```

## Campos principais
- `id`
- `name`
- `email`
- `teacher`
- `stage`
- `status`
- `modality`
- `age`
- `startDate`
- `location`
- `packageTotal`
- `packageUsed`
- `packageValue`

## Observações
- O componente `AdminStudents.tsx` atualmente usa dados estáticos no frontend.
- O endpoint `POST /admin/students` ainda não foi documentado nem implementado na tela.
- Quando estiver pronto, o POST deve criar um novo aluno e retornar o objeto criado.
