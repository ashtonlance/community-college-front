export const PostFilter = ({
  filters,
  setFilters,
  filtersToGenerateDropdown,
}) => {
  return (
    <div className="flex justify-center gap-x-[15px] px-[205px] py-[40px] md:flex-wrap md:justify-between md:gap-y-[15px] md:px-[60px] mdsm:mb-[32px] mdsm:w-full mdsm:flex-col mdsm:gap-y-[10px] mdsm:px-[40px] mdsm:py-[10px]">
      {filtersToGenerateDropdown.map(
        filterOption =>
          filterOption.type == 'select' &&
          filterOption.name !== 'sort by' && (
            <select
              key={filterOption.name}
              className="body-regular flex-1 px-[20px] py-[14px] text-darkBeige md:w-[48%] md:flex-initial mdsm:w-full mdsm:px-[14px] mdsm:py-[12px]"
              onChange={e =>
                setFilters({ ...filters, [filterOption.name]: e.target.value })
              }
            >
              <option className="capitalize" value="">
                Select a {filterOption.name}
              </option>
              {filterOption?.options?.map(option => (
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
              className="body-regular flex-1 px-[20px] py-[14px] text-darkBeige md:w-[48%] md:flex-initial mdsm:w-full mdsm:px-[14px] mdsm:py-[12px]"
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
              className="text-input body-regular px-[20px] py-[14px] md:w-[48%] mdsm:w-full mdsm:px-[14px] mdsm:py-[12px]"
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
