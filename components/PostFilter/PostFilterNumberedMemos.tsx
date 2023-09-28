export const PostFilterNumberedMemos = ({
  filters,
  setFilters,
  categories,
  years,
}) => {
  return (
    <div className="flex justify-center md:justify-between md:gap-y-[15px] md:flex-wrap gap-x-[15px] px-[205px] py-[40px] md:px-[60px] mdsm:px-[40px] mdsm:py-[10px] mdsm:flex-col mdsm:gap-y-[10px] mdsm:w-full mdsm:mb-[32px]">
      <select
        className="flex-1 md:flex-initial text-darkBeige py-[14px] px-[20px] mdsm:px-[14px] mdsm:py-[12px] md:w-[48%] mdsm:w-full body-regular"
        onChange={e => setFilters({ ...filters, county: e.target.value })}
      >
        <option value="">Select a category</option>
        {categories.map(category => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <select
        className="flex-1 md:flex-initial text-darkBeige py-[14px] px-[20px] mdsm:px-[14px] mdsm:py-[12px] md:w-[48%] mdsm:w-full body-regular"
        onChange={e => setFilters({ ...filters, year: e.target.value })}
      >
        <option value="">Select a Year</option>
        {years.map(year => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      <input
        className="text-input py-[14px] px-[20px] mdsm:px-[14px] mdsm:py-[12px] md:w-[48%] mdsm:w-full body-regular"
        type="text"
        placeholder="Search by keyword"
        onChange={e => setFilters({ ...filters, keyword: e.target.value })}
      />
      <select
        onChange={e =>
          setFilters({
            ...filters,
            orderBy: { field: 'DATE', order: e.target.value },
          })
        }
        className="flex-1 md:flex-initial text-navy py-[14px] px-[20px] mdsm:px-[14px] mdsm:py-[12px] md:w-[48%] mdsm:w-full body-regular"
      >
        <option value="ASC">Order by</option>
        <option value="ASC">Date Ascending</option>
        <option value="DESC">Date Descending</option>
      </select>
    </div>
  )
}
