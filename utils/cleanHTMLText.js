export const cleanHTMLText = (htmlString = '') => {
  return (
    htmlString
      .split(' ')
      .slice(0, 30)
      .join(' ')
      .replace(/<\/?[^>]+(>|$)/g, '') + '...'
  )
}
