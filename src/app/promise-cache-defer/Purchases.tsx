import { Fragment } from 'react'
import gql from 'graphql-tag'
import { getGqlClient } from '../gqlClient'

export const PurchasesFragment = gql`
  fragment PurchasesFragment on User {
    purchases {
      item
      date
      amount
    }
  }
`

export const Purchases = async () => {
  const data = await getGqlClient().readFragment(PurchasesFragment)
  return (
    <div className='grid grid-cols-3 gap-2 rounded-md border-2 p-2'>
      <div>購入品</div>
      <div>購入日</div>
      <div>量</div>
      {data?.purchases?.map(({ id, date, amount, item }) => (
        <Fragment key={id}>
          <div>{item}</div>
          <div>{date}</div>
          <div>{amount}</div>
        </Fragment>
      ))}
    </div>
  )
}
