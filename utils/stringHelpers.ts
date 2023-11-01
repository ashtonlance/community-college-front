export const camelToSentenceCase = (str: string) => {
  const result = str.replace(/([A-Z])/g, ' $1')
  if (str === 'certificateassociateOfAppliedScience')
    return 'Associate of Applied Science'
  return result.charAt(0).toUpperCase() + result.slice(1)
}

export const getArticle = (str: string) => {
  return ['a', 'e', 'i', 'o', 'u'].includes(str[0].toLowerCase()) ? 'an' : 'a'
}

export const truncate = (str: string, num: number) => {
  if (str.length <= num) {
    return str
  }
  let subString = str.substr(0, num)
  return subString.substr(0, subString.lastIndexOf(' ')) + ' ...'
}
