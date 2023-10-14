import { Todo } from '@/types/todo'
import clsx from 'clsx'
import { Fragment } from 'react'

type Props = {
  todos: Todo[]
} & Omit<JSX.IntrinsicElements['div'], 'children'>

export const TodoList = ({ todos, className, ...props }: Props) => {
  return (
    <div className={clsx('grid grid-cols-2 gap-2', className)} {...props}>
      <div className='font-semibold'>Text</div>
      <div className='font-semibold'>UserID</div>
      {todos.map((todo) => (
        <Fragment key={todo.id}>
          <div>{todo?.text}</div>
          <div>{todo?.user?.name}</div>
        </Fragment>
      ))}
    </div>
  )
}
