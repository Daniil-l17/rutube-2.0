import { Ivideo } from "./Ivideo"
import { Ibase } from "./base"

export interface Iuser extends Ibase {


  email: string

  name: string

  isVerified?: boolean


  subscribersCount?: number


  description: string

  avatarPath: string

  videos?: Ivideo[]


  subscriptions: ISubscription[]


} 


export interface ISubscription extends Ibase {
  toChannel: Iuser
} 