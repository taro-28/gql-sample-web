'use client'

import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Label } from '@/components/Label'
import { PageTitle } from '@/components/PageTitle'
import { gqlFetch } from '@/functions/gqlFetch'
import { Todo } from '@/types/todo'
import { FormEventHandler, useCallback, useEffect, useState } from 'react'
import { TodoList } from '../TodoList'

const todosQuery = `query { 
  todos {
    id
    text
    user {
      id
      name
    }
  }
}
`

const createTodoMutation = `mutation ($text: String! $userId: String!) {
  createTodo(input: {
    text: $text,
    userId: $userId
  }){
    id
    text
    done
    user {
      id
      name
    }
  }
}
`

export default function ClientComponents() {
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    gqlFetch({ query: todosQuery }).then(({ data: { todos } }) => setTodos(todos))
  }, [])

  const handleCreateTodo: FormEventHandler<HTMLFormElement> = useCallback(async (e) => {
    e.preventDefault()
    const form = e.target

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const formData = new FormData(form)
    await gqlFetch({
      query: createTodoMutation,
      variables: { text: formData.get('text'), userId: formData.get('userId') },
    }).then(({ data }) => setTodos((prev) => [...prev, data.createTodo]))
  }, [])

  return (
    <div className='space-y-4'>
      <PageTitle>Client Components</PageTitle>
      <form className='flex space-x-2' onSubmit={handleCreateTodo}>
        <Label>
          Text
          <Input className='ml-1' name='text' />
        </Label>
        <Label>
          UserID
          <Input className='ml-1' name='userId' />
        </Label>
        <Button type='submit'>Create</Button>
      </form>
      <TodoList todos={todos} />
    </div>
  )
}
