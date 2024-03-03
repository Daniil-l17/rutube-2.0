import { Iuser } from "./IUser";
import { Icomment } from "./Icomment";
import { Ibase } from "./base";

export interface Ivideo extends Ibase {
  name: string;

  isPublic: boolean;

  views?: number;

  likes?: number;

  duration?: number;

  description: string;

  videoPath: string;

  thumbnaulPath: string;

  user?: Iuser;

  comments?: Icomment[];
}


export interface IvideoDto extends Pick<Ivideo,'id' | 'thumbnaulPath' | 'description' | 'name' | 'videoPath' | 'isPublic'>{}