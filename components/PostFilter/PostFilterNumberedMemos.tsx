export const PostFilterNumberedMemos = ({
  filters,
  setFilters,
  categories,
  years,
}) => {
  return (
    <div className="flex justify-center gap-x-[15px] px-[205px] py-[40px]">
      <select
        className="flex-1 text-darkBeige"
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
        className="flex-1 text-darkBeige"
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
        className="text-input"
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
        className="flex-1 text-navy"
      >
        <option value="ASC">Order by</option>
        <option value="ASC">Date Ascending</option>
        <option value="DESC">Date Descending</option>
      </select>
    </div>
  )
}
