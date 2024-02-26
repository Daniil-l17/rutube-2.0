import { Iuser } from "./IUser"
import { Ivideo } from "./Ivideo"
import { Ibase } from "./base"

export interface Icomment extends Ibase {
  user: Iuser
  videos?: Ivideo
  message:string
} 