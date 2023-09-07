import { GravityForm } from 'components/GravityForm/GravityForm'
import { gql, useQuery } from '@apollo/client'
import useGravityForm, { GravityFormProvider } from 'utils/useGravityForms'
import GravityFormsForm from 'components/GravityForm/GravityFormsForm'

const GET_FORM = gql`
  ${GravityForm.fragments.entry}
  query GetForm {
    gfForm(id: "21", idType: DATABASE_ID) {
      ...GravityFormFragment
    }
  }
`

type DownloadProps = {
  attributes: {
    data: {
      download_form: string
      form_submission_message: string
      form_title: string
      link_to_resource_asset: string
    }
  }
}

const ResourceDownloadInternal = (props: DownloadProps) => {
  const { state } = useGravityForm()
  const { loading, error, data } = useQuery(GET_FORM)
  if (loading) {
    return
  }
  console.log({ state })
  const form = data?.gfForm
  const hasForm = props.attributes?.data?.download_form === '1' ? true : false
  const message = props.attributes?.data?.form_submission_message
  const title = props.attributes?.data?.form_title
  const link = props.attributes?.data?.link_to_resource_asset

  const recordUserData = () => {
    const email = state.find(item => item?.emailValues)?.emailValues?.value
    const jobTitle = state.find(item => item?.value)?.value
    localStorage.setItem('userEmail', email)
    localStorage.setItem('userJobTitle', jobTitle)
  }

  const successfullSubmitionCallback = res => {
    recordUserData() // localstorage record email and job title
    window.open(link, '_blank').focus() // at this point the information is already recorded in pardot, so we just allow them to have the pdf
  }

  return (
    <div className="mt-[60px] flex w-full flex-col items-center justify-center bg-gmt-500 px-[105px] py-[60px] md:mt-[52px] md:px-[80px] sm:mt-[24px] sm:px-[40px] sm:py-[40px]">
      <h3 className="text-white">{title}</h3>
      {hasForm && (
        <div className="body-large flex flex-col gap-[30px] text-white">
          <GravityFormsForm
            reportDownload={true}
            form={form}
            onSubmit={successfullSubmitionCallback}
            customClasses="flex flex-wrap w-full gap-[20px] download-resource-form"
          />
        </div>
      )}
    </div>
  )
}

export const ResourceDownload = (props: DownloadProps) => {
  return (
    <GravityFormProvider>
      <ResourceDownloadInternal {...props} />
    </GravityFormProvider>
  )
}

ResourceDownload.displayName = 'nextword/resourcedownload'
