'use client'

import { PageTitle } from '@/components/PageTitle'
import { gqlFetch } from '@/functions/gqlFetch'
import { Todo } from '@/types/todo'
import { useEffect, useState } from 'react'

export default function ClientComponents() {
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    gqlFetch(`
    query feedTodo {
      todos {
        id
        text
        user {
          id
        }
      }
    }
    `).then(({ data: { todos } }) => setTodos(todos))
  }, [])

  return (
    <div className='space-y-4'>
      <PageTitle>Client Components</PageTitle>
      {todos.map((todo) => (
        <div key={todo.id}>
          <p>{todo.text}</p>
        </div>
      ))}
    </div>
  )
}
