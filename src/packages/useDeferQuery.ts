'use client'
import { use } from 'react'
import { client, useGqlClient } from './useGqlClient'

type Props = {
  query: string
}

export const useQuery = ({ query }: Props) => {
  use(client.deferQuery(query))

  const store = useGqlClient()
  const companies = store.get('companies')
  const tasks = store.get('tasks')
  const users = store.get('users')

  return {
    companies: companies instanceof Promise ? undefined : companies,
    tasks: tasks instanceof Promise ? undefined : tasks,
    users: users instanceof Promise ? undefined : users,
  }
}
