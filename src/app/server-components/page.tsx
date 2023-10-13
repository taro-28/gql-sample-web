import { PageTitle } from '@/components/PageTitle'
import { gqlFetch } from '../../functions/gqlFetch'
import { Todo } from '../../types/todo'
import { Fragment } from 'react'
import { Label } from '@/components/Label'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { revalidatePath } from 'next/cache'

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

export default async function ServerComponents() {
  const todos: Todo[] = await gqlFetch({
    query: todosQuery,
  }).then(({ data: { todos } }) => todos)

  const handleCreateTodo = async (formData: FormData) => {
    'use server'
    await gqlFetch({
      query: createTodoMutation,
      variables: { text: formData.get('text'), userId: formData.get('userId') },
    })
    revalidatePath('/server-components')
  }

  return (
    <div className='space-y-4'>
      <PageTitle>Server Components</PageTitle>
      <form action={handleCreateTodo} className='flex space-x-2'>
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
      <div className='grid grid-cols-2 gap-2'>
        <div className='font-semibold'>Text</div>
        <div className='font-semibold'>UserID</div>
        {todos.map((todo) => (
          <Fragment key={todo.id}>
            <div>{todo.text}</div>
            <div>{todo.user.name}</div>
          </Fragment>
        ))}
      </div>
    </div>
  )
}
