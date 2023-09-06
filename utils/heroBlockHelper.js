export const getHeroType = blocks => {
  const hero = blocks?.filter(block => block.name === 'nextword/hero')
  const pageHeading = blocks?.filter(
    block => block.name === 'nextword/pageheading'
  )

  if (hero?.length > 0) {
    const heroType = hero[0]['attributes']['data']['hero_design']
    return heroType || 'default'
  }

  if (pageHeading?.length > 0) {
    return 'default'
  }

  return null
}
