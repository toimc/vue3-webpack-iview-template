// 判断参数是否是其中之一
export const oneOf = <T>(value: T, validList: T[]) => {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true
    }
  }
  return false
}

export const camelcaseToHyphen = (str) => {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}
