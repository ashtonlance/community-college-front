import arrowdown from '../../assets/icons/arrow-down.svg'
import arrowup from '../../assets/icons/arrow-up.svg'
import { MegaMenu } from 'components/Header/MegaMenu'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

export const NavigationItem = ({
  item,
  dropdownOpened,
  transparentMode,
  handleActiveItem,
}) => {
  const router = useRouter()
  const hasDropdownItems = item?.navigationMenu?.items?.length > 0
  const navigationElement = hasDropdownItems ? (
    <>
      {item?.navigationMenu?.items?.length > 0 && (
        <>
          <Link
            suppressHydrationWarning
            onMouseOver={() => handleActiveItem(item.id)}
            href={item.url}
            className={`
            group main-nav cursor-pointer flex justify-center gap-2 pr-[30px]
            ${
              dropdownOpened
                ? 'active hover:bg-black bg-black text-white items-center'
                : 'items-baseline'
            } ${transparentMode && 'text-white hover:text-black'}
            ${
              router.asPath.includes(item.url) &&
              'bg-gmt-200 !text-black hover:!text-white'
            }`}
          >
            {item.label}
          </Link>{' '}
          {dropdownOpened ? (
            <div>
              <Image
                alt=""
                src={arrowup}
                width={10}
                height={10}
                className="absolute right-[16px] top-[44%]"
              />
              <MegaMenu
                handleActiveItem={handleActiveItem}
                item={item}
                key={item.id}
              />
            </div>
          ) : (
            <Image
              className="absolute right-[16px] top-[44%]"
              alt=""
              src={arrowdown}
              width={10}
              height={10}
            />
          )}
        </>
      )}
    </>
  ) : (
    <Link
      onMouseOver={() => handleActiveItem(item.id)}
      className={`
      group main-nav flex cursor-pointer justify-center gap-2
      ${
        dropdownOpened
          ? 'active hover:bg-black bg-black text-white items-center'
          : 'items-baseline'
      }
    ${transparentMode && 'text-white hover:text-black'}
    ${
      router.asPath.includes(item.url) &&
      'bg-gmt-200 !text-black hover:!text-white'
    }
    `}
      href={item.url}
    >
      {item.label}
    </Link>
  )

  return navigationElement
}
