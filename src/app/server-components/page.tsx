import { PageTitle } from '@/components/PageTitle'
import { gqlFetch } from '../../functions/gqlFetch'
import { Todo } from '../../types/todo'

export default async function ServerComponents() {
  const todos: Todo[] = await gqlFetch(`
  query feedTodo {
    todos {
      id
      text
      user {
        id
      }
    }
  }
  `).then(({ data: { todos } }) => todos)

  return (
    <div className='space-y-4'>
      <PageTitle>Server Components</PageTitle>
      {todos.map((todo) => (
        <div key={todo.id}>
          <p>{todo.text}</p>
        </div>
      ))}
    </div>
  )
}
