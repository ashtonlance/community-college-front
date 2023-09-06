import { ServicesMenu } from './ServicesMenu'
import { ResourcesMenu } from './ResourcesMenu'
import { AboutMenu } from './AboutMenu'

export const MegaMenu = ({ item, handleActiveItem }) => {
  const subItems = item.navigationMenu.items

  switch (item.label) {
    case 'About':
      return (
        <AboutMenu handleActiveItem={handleActiveItem} subItems={subItems} />
      )
    case 'Services':
      return (
        <ServicesMenu handleActiveItem={handleActiveItem} subItems={subItems} />
      )
    case 'Resources':
      return (
        <ResourcesMenu
          handleActiveItem={handleActiveItem}
          featuredResource={item.navigationMenu.featuredResource}
          subItems={subItems}
        />
      )
    default:
      return (
        <AboutMenu handleActiveItem={handleActiveItem} subItems={subItems} />
      )
  }
}
