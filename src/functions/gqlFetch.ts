type Props = {
  query: string
  variables?: Record<string, unknown>
}

export const gqlFetch = async ({ query, variables }: Props) => {
  const response = await fetch('http://localhost:8080/query', {
    cache: 'no-store',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })
  const data = await response.json()
  return data
}

export const gqlFetch2 = async ({ query, variables }: Props) => {
  const response = await fetch('http://localhost:3000/graphql', {
    cache: 'no-store',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })
  const data = await response.json()
  return data
}
