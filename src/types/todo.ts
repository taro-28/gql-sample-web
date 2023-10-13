import { User } from './user'

export type Todo = {
  id: number
  text: string
  done: boolean
  user: User
}
