import { useGqlClient } from '@/packages/useGqlClient'

type Returns = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
}

export const useFragment = (): Returns => {
  const client = useGqlClient()

  // const fragDefNode = fragDocNode?.definitions.find(
  //   (def): def is FragmentDefinitionNode => def.kind === 'FragmentDefinition',
  // )
  // if (!fragDefNode) return { data: null }

  // const data = store
  //   .get(fragDefNode.name.value)
  //   ?.find((state) => state.get(fragmentKey))
  //   ?.get(fragmentKey)

  const data = client.get('users')
  console.log({ data })

  if (data === undefined) return { data: null }
  if (data instanceof Promise) throw data

  return { data }
}
