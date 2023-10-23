import clsx from 'clsx'
import { Fragment } from 'react'
import { getGqlClient } from './gqlClient'
import gql from 'graphql-tag'

export const UsersFragment = gql`
  fragment UsersFragment on Query {
    users {
      name
      email
      company {
        name
        branch
      }
    }
  }
`

type Props = Omit<JSX.IntrinsicElements['div'], 'children'>

export const UserList = async ({ className, ...props }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any = await getGqlClient().readFragment(UsersFragment)

  return (
    <div className={clsx('grid grid-cols-4 gap-2 rounded-md border-2 p-2', className)} {...props}>
      <div className='font-semibold'>氏名</div>
      <div className='font-semibold'>メールアドレス</div>
      <div className='font-semibold'>会社名</div>
      <div className='font-semibold'>支店名</div>
      {data?.users ? (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data?.users?.map(({ name, email, company }: any) => (
          <Fragment key={email}>
            <div>{name}</div>
            <div>{email}</div>
            <div>{company.name}</div>
            <div>{company.branch}</div>
          </Fragment>
        ))
      ) : (
        <div className='col-span-4 py-2 text-center text-xl'>loading...</div>
      )}
    </div>
  )
}
