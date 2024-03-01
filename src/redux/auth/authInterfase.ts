export interface IAuthState {
  loading: boolean,
  user: {
    id: number,
    email: string
  } | null
  accessToken: string
}