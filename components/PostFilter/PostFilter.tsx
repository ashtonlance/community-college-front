export const PostFilter = ({
  filters,
  setFilters,
  filtersToGenerateDropdown,
}) => {
  console.log({ filtersToGenerateDropdown })

  return (
    <div className="mdsm:px-[40px] mdsm:py-[10px] mdsm:flex-col mdsm:gap-y-[10px] mdsm:w-full mdsm:mb-[32px] flex justify-center gap-x-[15px] px-[205px] py-[40px] md:flex-wrap md:justify-between md:gap-y-[15px] md:px-[60px]">
      {filtersToGenerateDropdown.map(
        filterOption =>
          filterOption.type == 'select' &&
          filterOption.name !== 'sort by' && (
            <select
              key={filterOption.name}
              className="mdsm:px-[14px] mdsm:py-[12px] mdsm:w-full body-regular flex-1 px-[20px] py-[14px] text-darkBeige md:w-[48%] md:flex-initial"
              onChange={e => setFilters({ ...filters, county: e.target.value })}
            >
              <option className="capitalize" value="">
                Select a {filterOption.name}
              </option>
              {filterOption.options.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )
      )}

      {filtersToGenerateDropdown.map(
        filterOption =>
          filterOption.type == 'select' &&
          filterOption.name == 'sort by' && (
            <select
              key={filterOption.name}
              className="mdsm:px-[14px] mdsm:py-[12px] mdsm:w-full body-regular flex-1 px-[20px] py-[14px] text-darkBeige md:w-[48%] md:flex-initial"
              onChange={e =>
                setFilters({
                  ...filters,
                  orderBy: { field: 'NAME', order: e.target.value },
                })
              }
            >
              <option value="ASC">{filterOption.options}</option>
              <option value="ASC"> Ascending</option>
              <option value="DESC"> Descending</option>
            </select>
          )
      )}

      {filtersToGenerateDropdown.map(
        filterOption =>
          filterOption.type == 'input' && (
            <input
              key={filterOption}
              className="text-input mdsm:px-[14px] mdsm:py-[12px] mdsm:w-full body-regular px-[20px] py-[14px] md:w-[48%]"
              type="text"
              placeholder="Search by keyword"
              onChange={e =>
                setFilters({ ...filters, keyword: e.target.value })
              }
            />
          )
      )}
    </div>
  )
}
