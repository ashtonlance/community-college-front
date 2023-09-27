import { gql } from '@apollo/client'

type sortDateType = 'ascending' | 'descending'

type PostFilterType = {
  category?: string
  keyword?: string
  year?: number
  sortDate?: sortDateType
}

const GET_FILTERED_NUMBERED_MEMOS = gql`
  query GetFilteredNumberedMemos($searchedTerm: string, $category: string, $year: number, $order: string) {
    numberedMemos(
      where: {
        search: $searchedTerm
        offsetPagination: { offset: 10, size: 10 }
      }
      metaQuery: {
        relation: AND
        metaArray: [
            { key: "category", compare: EQUAL_TO, value: $category },
            { key: "year", compare: EQUAL_TO, value: $year },
            ]
      }
      orderby: {field: DATE, order: $order}
    )
    nodes {
      blocks
    }
  }
`

export const PostFilter = ({
  category,
  keyword,
  year,
  sortDate,
}: PostFilterType) => {

  return <div> filter goes here </div>
}
