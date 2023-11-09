import { gql, useQuery } from '@apollo/client'
import { GravityForm } from 'components/GravityForm/GravityForm'

const GET_GRAVITY_FORM = gql`
  ${GravityForm.fragments.entry}
  query GetGF($ID: ID!) {
    gfForm(id: $ID, idType: DATABASE_ID) {
      ...GravityFormFragment
    }
  }
`

export const ShortcodeGravityForm = ({ ID }) => {
  const { loading, error, data } = useQuery(GET_GRAVITY_FORM, {
    variables: { ID },
    context: {
      fetchOptions: {
        method: 'GET',
      },
    },
  })

  if (loading) {
    return
  }
  if (error) {
    console.log({ error })
  }
  return <GravityForm customClasses="" form={data?.gfForm} />
}
