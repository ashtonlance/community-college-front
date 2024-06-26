import { unslugify } from 'utils/unslugify'

export default function generateBreadcrumbs(router, custom, urlToMatch) {
  // Remove any query parameters, as those aren't included in breadcrumbs
  const asPathWithoutQuery = router.asPath.split('?')[0]

  // Break down the path between "/"s, removing empty entities
  // Ex:"/my/nested/path" --> ["my", "nested", "path"]
  const asPathNestedRoutes = asPathWithoutQuery
    .split('/')
    .filter(v => v.length > 0)

  // Iterate over the list of nested route parts and build
  // a "crumb" object for each one.
  const crumblist = asPathNestedRoutes.map((subpath, idx) => {
    // We can get the partial nested route for the crumb
    // by joining together the path parts up to this point.
    let href = '/' + asPathNestedRoutes.slice(0, idx + 1).join('/')
    // The title will just be the route string for now
    const title = unslugify(subpath)
    href === '/colleges' ? (href = '/students/what-we-offer/colleges/') : ''
    if (custom && urlToMatch) {
      if (href === urlToMatch) {
        href = custom
      }
    }
    // custom ? (href = custom) : ''
    return { href, title }
  })

  // Add in a default "Home" crumb for the top-level
  return [...crumblist]
}
