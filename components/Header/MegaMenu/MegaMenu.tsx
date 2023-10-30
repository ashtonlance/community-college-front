import dynamic from 'next/dynamic'

const TwoColumnMenu = dynamic(
  async () => {
    const { TwoColumnMenu } = await import('./TwoColumnMenu')
    return { default: TwoColumnMenu }
  },
  {
    ssr: false,
    loading: () => null,
  }
) as unknown as React.FC<any>

const PlainMenu = dynamic(
  async () => {
    const { PlainMenu } = await import('./PlainMenu')
    return { default: PlainMenu }
  },
  {
    ssr: false,
    loading: () => null,
  }
) as unknown as React.FC<any>

export const MegaMenu = ({ item, handleActiveItem, activeItem }) => {
  const subItems = item.children
  if (item?.children?.some(child => child.children?.length > 0)) {
    return (
      <TwoColumnMenu
        handleActiveItem={handleActiveItem}
        subItems={subItems}
        parentItem={item}
        activeItem={activeItem}
      />
    )
  } else {
    return (
      <PlainMenu
        handleActiveItem={handleActiveItem}
        subItems={subItems}
        parentItem={item}
        activeItem={activeItem}
      />
    )
  }
}
