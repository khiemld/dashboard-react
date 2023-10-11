export type AuthenticatedUser = {
  username: string,
  fullname: string,
  password: string,
  email: string
}

export type InitialState = {
  user?: AuthenticatedUser,
  loading: boolean,
  statusCode: number
  data: {
    accessToken: string
  }
}

export type UserLogin = {
  username: string,
  password: string
}
