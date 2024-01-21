import clsx from 'clsx'
import { Fragment } from 'react'
import gql from 'graphql-tag'
import { getGqlClient } from '../gqlClient'
import { deletePurchase } from './deletePurchase'

export const PurchasesFragment = gql`
  fragment PurchasesFragment on User {
    purchases {
      id
      item
      date
      amount
    }
  }
`

type Props = Omit<JSX.IntrinsicElements['div'], 'children'>

export const Purchases = async ({ className, ...props }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any = await getGqlClient().readFragment(PurchasesFragment)

  return (
    <div className={clsx('grid grid-cols-4 gap-2 rounded-md border-2 p-2', className)} {...props}>
      <div className='font-semibold'>購入品</div>
      <div className='font-semibold'>購入日</div>
      <div className='font-semibold'>量</div>
      <div>削除</div>
      {data?.purchases ? (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data?.purchases?.map(({ id, date, amount, item }: any) => (
          <Fragment key={id}>
            <div>{item}</div>
            <div>{date}</div>
            <div>{amount}</div>
            <form action={deletePurchase}>
              <input name='id' type='hidden' value={id} />
              <button className='rounded-md border p-1'>削除</button>
            </form>
          </Fragment>
        ))
      ) : (
        <div className='col-span-4 py-2 text-center text-xl'>loading...</div>
      )}
    </div>
  )
}
