function decodeHtml(html: string): string {
  if (typeof window === 'undefined') {
    // We are in server-side rendering, return the string as is
    return html
  }

  var txt = document.createElement('textarea')
  txt.innerHTML = html
  return txt.value
}

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
  let subString = str.substring(0, num)
  return subString.substring(0, subString.lastIndexOf(' ')) + ' ...'
}

export const programCardTruncate = (str: string, num: number) => {
  // Decode HTML entities
  let decodedStr = decodeHtml(str)

  // Remove all HTML tags
  let cleanStr = decodedStr.replace(/<\/?[^>]+(>|$)/g, '')

  // Remove the first instance of the word "About"
  cleanStr = cleanStr.replace('About', '')

  if (cleanStr.length <= num) {
    return cleanStr
  }

  let subString = cleanStr.substring(0, num)
  return subString.substring(0, subString.lastIndexOf(' ')) + ' ...'
}
