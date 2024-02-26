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

  thumbnailPath: string;

  user?: Iuser;

  comments?: Icomment[];
}


export interface IvideoDto extends Pick<Ivideo,'id' | 'thumbnailPath' | 'description' | 'name' | 'videoPath' | 'isPublic'>{}