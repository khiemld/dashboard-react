
export const saveTokenInLocalStorage = (accessToken : string) => {
  localStorage.setItem('accessToken', JSON.stringify(accessToken))
}

export const saveLoginInfo = (username: string, password: string) => {
  localStorage.setItem('username', JSON.stringify(username))
  localStorage.setItem('password', JSON.stringify(password))
}

export const saveTokenInSessionStorage = (accessToken : string) => {
  sessionStorage.setItem('accessToken', JSON.stringify(accessToken))
}


//if remember => store token in local storage, if not save token in session
//prefix url