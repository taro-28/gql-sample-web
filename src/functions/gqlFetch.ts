export const gqlFetch = async (query: string) => {
  const response = await fetch('http://localhost:8080/query', {
    cache: 'no-store',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
    }),
  })
  const data = await response.json()
  return data
}
