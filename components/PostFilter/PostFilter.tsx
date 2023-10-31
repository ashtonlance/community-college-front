import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { camelToSentenceCase, getArticle } from 'utils/stringHelpers'

export const PostFilter = ({
  filters,
  setFilters,
  filtersToGenerateDropdown,
}) => {
  const router = useRouter()

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
    }, 1000)
  }

  return (
    <div className="flex justify-center gap-x-[15px] px-[205px] py-[40px] md:flex-wrap md:justify-between md:gap-y-[15px] md:px-[60px] mdsm:mb-[32px] mdsm:w-full mdsm:flex-col mdsm:gap-y-[10px] mdsm:px-[40px] mdsm:py-[10px]">
      {filtersToGenerateDropdown.map(filterOption => {
        const filterName = camelToSentenceCase(filterOption.name)
        if (filterOption.type === 'select') {
          const isSortBy = filterName.toLowerCase() === 'sort by'
          return (
            <select
              key={filterOption.name}
              className="body-regular max-w-[250px] flex-1 px-[20px] py-[14px] text-darkBeige md:w-[48%] md:flex-initial mdsm:w-full mdsm:px-[14px] mdsm:py-[12px]"
              onChange={e =>
                handleFilterChange(
                  isSortBy ? 'orderBy' : filterOption.name,
                  isSortBy
                    ? { field: 'NAME', order: e.target.value }
                    : e.target.value
                )
              }
              value={filters[filterOption.name]}
            >
              <option className="capitalize" value="">
                {typeof filterOption.options === 'string'
                  ? filterOption.options
                  : `Select ${getArticle(filterName)} ${filterName}`}
              </option>
              {Array.isArray(filterOption.options) &&
                filterOption.options.map(option => (
                  <option key={option} value={option}>
                    {camelToSentenceCase(option)}
                  </option>
                ))}
              {isSortBy && (
                <>
                  <option value="ASC">Ascending</option>
                  <option value="DESC">Descending</option>
                </>
              )}
            </select>
          )
        } else if (filterOption.type === 'input') {
          return (
            <input
              key={filterOption.name}
              className="text-input body-regular px-[20px] py-[14px] md:w-[48%] mdsm:w-full mdsm:px-[14px] mdsm:py-[12px]"
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
