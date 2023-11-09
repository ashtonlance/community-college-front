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
type FormProps = {
  attributes?: any
}
export const Form: React.FC<FormProps> = props => {
  const ID = props?.attributes?.formId || ''
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
  return (
    <div className="px-[205px] pb-[100px] pt-[80px] md:px-[100px] md:py-[60px] sm:p-10">
      <GravityForm customClasses="" form={data?.gfForm} />
    </div>
  )
}
Form.displayName = 'gravityforms/form'
