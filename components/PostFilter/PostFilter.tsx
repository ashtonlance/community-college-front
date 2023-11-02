import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { camelToSentenceCase, getArticle } from 'utils/stringHelpers'
import { cn } from 'utils'

export const PostFilter = ({
  filters,
  setFilters,
  filtersToGenerateDropdown,
}) => {
  const router = useRouter()
  const filterLength = Object.keys({ ...filters }).length - 1

  let filterClass
  switch (filterLength) {
    case 2:
      filterClass = 'basis-[calc(50%-15px)]'
      break
    case 3:
      filterClass = 'basis-[calc(33.33%-15px)]'
      break
    case 4:
      filterClass = 'basis-[calc(25%-15px)]'
      break
    case 5:
      filterClass = 'basis-[calc(20%-15px)]'
      break
    default:
      filterClass = 'basis-full'
  }

  useEffect(() => {
    const newFilters = { ...filters }
    Object.keys(router.query).forEach(key => {
      newFilters[key] = router.query[key]
    })
    setFilters(newFilters)
  }, [router.query])

  const handleFilterChange = (
    name: string,
    value: string | { field: string; order: string }
  ) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }))

    const newValue =
      typeof value === 'string' ? value : `${value.field}:${value.order}`
    const newQuery = { ...router.query, [name]: newValue }
    delete newQuery.wordpressNode

    const queryString = new URLSearchParams(
      newQuery as Record<string, string>
    ).toString()
    setTimeout(() => {
      window.history.replaceState(null, '', `?${queryString}`)
    }, 500)
  }

  return (
    <div className="flex justify-center gap-x-[15px] px-[205px] py-[40px] md:flex-wrap md:justify-between md:gap-y-[15px] md:px-[60px] mdsm:mb-[32px] mdsm:w-full mdsm:flex-col mdsm:gap-y-[10px] mdsm:px-[40px] mdsm:py-[10px]">
      {filtersToGenerateDropdown.map(filterOption => {
        const filterName = camelToSentenceCase(filterOption.name)
        if (filterOption.type === 'select') {
          const isSortBy = filterName.toLowerCase() === 'sort by'
          const isNameFilter =
            filterOption.options.includes('Name') ||
            filterOption.options.includes('Last Name')
          const isEventsPage = router.asPath.includes('events')
          return (
            <select
              key={filterOption.name}
              className={cn(
                `body-regular max-w-[250px] flex-1 px-[20px] py-[14px] text-darkBeige md:w-[48%] md:max-w-none mdsm:w-full mdsm:px-[14px] mdsm:py-[12px] 
                ${filterClass}
                `
              )}
              onChange={e =>
                handleFilterChange(
                  isSortBy ? 'orderBy' : filterOption.name,
                  isSortBy
                    ? { field: 'NAME', order: e.target.value }
                    : e.target.value
                )
              }
              defaultValue={isNameFilter || isEventsPage ? 'DESC' : 'ASC'}
            >
              {!isNameFilter && (
                <option className="capitalize" value="">
                  {typeof filterOption.options === 'string'
                    ? filterOption.options
                    : `Select ${getArticle(filterName)} ${filterName}`}
                </option>
              )}
              {Array.isArray(filterOption.options) &&
                filterOption.options.map(option => (
                  <option key={option} value={option}>
                    {typeof option === 'string'
                      ? camelToSentenceCase(option)
                      : option}
                  </option>
                ))}
              {isSortBy && isNameFilter && (
                <>
                  <option value="DESC">A-Z</option>
                  <option value="ASC">Z-A</option>
                </>
              )}
              {isSortBy && !isNameFilter && (
                <>
                  <option value="ASC">Oldest</option>
                  <option value="DESC">Newest</option>
                </>
              )}
            </select>
          )
        } else if (filterOption.type === 'input') {
          return (
            <input
              key={filterOption.name}
              className={cn(
                `text-input body-regular px-[20px] py-[14px] md:w-[48%] mdsm:w-full mdsm:px-[14px] mdsm:py-[12px] 
                ${filterClass}
                }`
              )}
              type="text"
              placeholder={`Search by ${filterName ?? 'keyword'}`}
              onChange={e =>
                handleFilterChange(filterOption.name, e.target.value)
              }
              value={filters[filterOption.name]}
            />
          )
        }
        return null
      })}
    </div>
  )
}
