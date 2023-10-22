import { Card } from '@/components/Card'
import { PageTitle } from '@/components/PageTitle'

const todos = [
  'return types',
  'create company detail query',
  'check about fetch policy in sc',
  'typed document node',
  'create page for props pattern',
]

export default function Todo() {
  return (
    <div className='w-full space-y-4'>
      <PageTitle>Todo</PageTitle>
      <div className='grid grid-cols-3 gap-4'>
        {todos.map((todo) => (
          <Card content={todo} key={todo} title='' />
        ))}
      </div>
    </div>
  )
}
