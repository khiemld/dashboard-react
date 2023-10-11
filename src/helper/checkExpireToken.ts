export const checkExpire = (token : string) => {        
  const decode = JSON.parse(atob(token.split('.')[1]));
  if (decode.exp * 1000 < new Date().getTime()) {
    return true
  }
  return false
}