import { Card } from '@/components/Card'
import { PageTitle } from '@/components/PageTitle'

const todos = [
  'return types',
  'create company detail query',
  'check about fetch policy in sc',
  'typed document node',
]

export default function Home() {
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
