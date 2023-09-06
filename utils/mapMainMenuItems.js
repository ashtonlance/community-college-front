import { v4 as uuid } from 'uuid'

export const mapMainMenuItems = menuItems => {
  return menuItems?.map(menuItem => ({
    id: uuid(),
    destination: menuItem.menuItem.destinationUrl?.uri,
    label: menuItem.menuItem.label,
    subMenuItems:
      menuItem.items ||
      [].map(subitem => ({
        id: uuid(),
        destination: subitem.items.pageDestination?.uri,
        label: subitem.items.pageDestination?.uri,
      })),
  }))
}
