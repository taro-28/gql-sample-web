import clsx from 'clsx'
import { Fragment } from 'react'
import gql from 'graphql-tag'

export const PurchasesFragment = gql`
  fragment PurchasesFragment on User {
    purchases {
      item
      date
      amount
    }
  }
`

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  purchases: any[]
} & Omit<JSX.IntrinsicElements['div'], 'children'>

export const Purchases = async ({ purchases, className, ...props }: Props) => {
  return (
    <div className={clsx('grid grid-cols-3 gap-2 rounded-md border-2 p-2', className)} {...props}>
      <div className='font-semibold'>購入品</div>
      <div className='font-semibold'>購入日</div>
      <div className='font-semibold'>量</div>
      {purchases?.map(({ date, amount, item }) => (
        <Fragment key={date}>
          <div>{item}</div>
          <div>{date}</div>
          <div>{amount}</div>
        </Fragment>
      ))}
    </div>
  )
}
