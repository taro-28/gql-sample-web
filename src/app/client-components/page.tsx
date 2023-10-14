'use client'

import { PageTitle } from '@/components/PageTitle'
import { gqlFetch } from '@/functions/gqlFetch'
import { Todo } from '@/types/todo'
import { FormEventHandler, useCallback, useEffect, useState } from 'react'
import { useDeferQuery } from '@/hooks/useDeferQuery'
import { Label } from '@/components/Label'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { TodoList } from '../TodoList'

const todosQuery = `query { 
  todos {
    id
    text
    ... @defer {
      user {
        id
        name
      }
    }
  }
}
`

const deferQuery = `query {
  ... on Query @defer {
    slowField
  }
  fastField
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

  const data = useDeferQuery({ query: deferQuery })

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
      <PageTitle>Defer Sample</PageTitle>
      <div>fastField: {data?.fastField ?? 'Loading...'}</div>
      <div>slowField: {data?.slowField ?? 'Loading...'}</div>
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
