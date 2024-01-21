'use server'

import { revalidatePath } from 'next/cache'
import { getGqlClient } from '../gqlClient'

export const deletePurchase = async (formData: FormData) => {
  'use server'
  const id = formData.get('id')?.toString()
  await getGqlClient().mutate()
  revalidatePath('/promise-cache-defer')
  return { message: 'Deleted' }
}
