import { PageTitle } from '@/components/PageTitle'
import clsx from 'clsx'
import { Fragment } from 'react'

const users: {
  name: string
  email: string
  company: string
  branch: string
}[] = [
  {
    name: '北海道太郎',
    email: 'hokkaido@example.com',
    company: '北海道株式会社',
    branch: '札幌支店',
  },
  {
    name: '青森太郎',
    email: 'aomori@example.com',
    company: '青森株式会社',
    branch: '青森支店',
  },
  {
    name: '岩手太郎',
    email: 'iwate@example.com',
    company: '岩手株式会社',
    branch: '盛岡支店',
  },
  {
    name: '宮城太郎',
    email: 'miyagi@example.com',
    company: '宮城株式会社',
    branch: '仙台支店',
  },
  {
    name: '秋田太郎',
    email: 'akita@example.com',
    company: '秋田株式会社',
    branch: '秋田支店',
  },
  {
    name: '山形太郎',
    email: 'yamagata@example.com',
    company: '山形株式会社',
    branch: '山形支店',
  },
  {
    name: '福島太郎',
    email: 'fukushima@example.com',
    company: '福島株式会社',
    branch: '福島支店',
  },
  {
    name: '茨城太郎',
    email: 'ibaraki@example.com',
    company: '茨城株式会社',
    branch: '水戸支店',
  },
  {
    name: '栃木太郎',
    email: 'tochigi@example.com',
    company: '栃木株式会社',
    branch: '宇都宮支店',
  },
  {
    name: '群馬太郎',
    email: 'gunma@example.com',
    company: '群馬株式会社',
    branch: '前橋支店',
  },
]

export default async function Home() {
  return (
    <div className='w-full space-y-4'>
      <PageTitle>DashBoard</PageTitle>
      <div className='rounded-md bg-yellow-50 px-4 py-2 font-semibold'>
        未対応のタスクが3件あります
      </div>
      <div className='grid grid-cols-3 justify-between gap-4'>
        <Card content='100,000,000円' title='売上' />
        <Card content='100' title='企業数' />
        <Card content='500' title='ユーザー数' />
      </div>
      <div className='space-y-2'>
        <div className='flex justify-between'>
          <div className='text-xl'>顧客一覧</div>
          <button
            className='hover: rounded-md border-none bg-indigo-400 px-6 py-2 font-semibold text-slate-50 hover:bg-indigo-300 hover:text-slate-50'
            type='button'
          >
            追加
          </button>
        </div>
        <div className='grid grid-cols-4 gap-2 rounded-md border-2 p-2'>
          <div className='font-semibold'>氏名</div>
          <div className='font-semibold'>メールアドレス</div>
          <div className='font-semibold'>会社名</div>
          <div className='font-semibold'>支店名</div>
          {users.map(({ name, email, company, branch }) => (
            <Fragment key={email}>
              <div>{name}</div>
              <div>{email}</div>
              <div>{company}</div>
              <div>{branch}</div>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

type CardProps = {
  title: string
  content: string
} & Omit<JSX.IntrinsicElements['div'], 'children'>

const Card = ({ title, content, className, ...props }: CardProps) => {
  return (
    <div className={clsx(className, 'space-y-2 rounded-md border-2 p-4')} {...props}>
      <div className='text-xl'>{title}</div>
      <div className='text-2xl font-bold'>{content}</div>
    </div>
  )
}
