// import { ServicesMenu } from './ServicesMenu'
// import { ResourcesMenu } from './ResourcesMenu'
// import { AboutMenu } from './AboutMenu'
import dynamic from 'next/dynamic'

const AboutMenu = dynamic(
  async () => {
    const { AboutMenu } = await import('./AboutMenu')
    return { default: AboutMenu }
  },
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
) as unknown as React.FC<any>

const ResourcesMenu = dynamic(
  async () => {
    const { ResourcesMenu } = await import('./ResourcesMenu')
    return { default: ResourcesMenu }
  },
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
) as unknown as React.FC<any>

const TwoColumnMenu = dynamic(
  async () => {
    const { TwoColumnMenu } = await import('./TwoColumnMenu')
    return { default: TwoColumnMenu }
  },
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
) as unknown as React.FC<any>

export const MegaMenu = ({ item, handleActiveItem, activeItem }) => {
  const subItems = item.children
  switch (item.label) {
    case 'About':
      return (
        <AboutMenu handleActiveItem={handleActiveItem} subItems={subItems} />
      )
    case 'Services':
      return (
        <TwoColumnMenu
          handleActiveItem={handleActiveItem}
          subItems={subItems}
        />
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
        <TwoColumnMenu
          handleActiveItem={handleActiveItem}
          subItems={subItems}
          parentItem={item}
          activeItem={activeItem}
        />
      )
  }
}
