import { useMutation, gql, ApolloProvider } from '@apollo/client'
import useGravityForm from '../../utils/useGravityForms'
import GravityFormsField from './GravityFormsField'
import Image from 'next/image'
import arrowright from '../../assets/icons/arrow-right.svg'
import ArrowRightLarge from '../../assets/icons/arrow-right-large.svg'
import { getApolloClient } from 'utils/apollo-faust'
import { validateEmail } from 'utils/validations'
import { FadeIn } from 'components/FadeIn'
import { cn } from 'utils'
import Arrow from 'assets/icons/arrow-forward-sharp-reverse.svg'
const SUBMIT_FORM = gql`
  mutation submitGfForm($formId: ID!, $fieldValues: [FormFieldValuesInput]!) {
    submitGfForm(input: { id: $formId, fieldValues: $fieldValues }) {
      entry {
        id
      }
      confirmation {
        type
        message
        url
      }
      errors {
        id
        message
      }
    }
  }
`

type GravityFormsFormInternalProps = {
  form: any
  customClasses: string
  onSubmit?: (arg: any) => {}
  disclaimer?: string
  reportDownload?: boolean
}

const DownloadButton = ({ description }) => {
  const { state } = useGravityForm()
  const email = state.find(item => item?.emailValues)?.emailValues?.value
  const jobTitle = state.find(item => item?.value)?.value
  const active = validateEmail(email) && jobTitle

  return (
    <div className="flex items-center justify-center gap-[60px] sm:flex-col sm:items-start sm:gap-[20px]">
      <button
        type="submit"
        className={cn(
          `primary-btn navy ${
            active ? 'active' : 'inactive cursor-not-allowed opacity-[0.75]'
          }`
        )}
        disabled={!active}
      >
        Download
        <Image alt="" src={arrowright} width={9} height={9} />
      </button>
      <p
        className="p-small !mb-0 !text-white"
        dangerouslySetInnerHTML={{ __html: description }}
      ></p>
    </div>
  )
}

const ArrowButton = () => {
  return (
    <button
      className="primary-btn navy"
      type="submit"
      aria-label="Submit form"
    >
      <span className="arrow-submit-parent">
        <svg
          className="arrow-submit stroke-green"
          width="24"
          height="11"
          viewBox="0 0 24 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0.651367 5.5L20.6514 5.5" />
          <path d="M17.2426 9.74264L21.4853 5.5L17.2426 1.25736" />
        </svg>
      </span>
    </button>
  )
}

const DefaultButton = ({ loading, form, disclaimer = null }) => {
  return (
    <div className="submit-gravity-form flex gap-[40px] sm:mt-[12px] mt-5">
      <button
        type="submit"
        className={`primary-btn group navy`}
        disabled={loading}
        aria-label="Submit form"
      >
        {' '}
        {form?.button?.text || 'Submit'}
        <ArrowRightLarge className="text-gold group-hover:text-white transition-colors" />
      </button>
      {disclaimer && <p className="p-small text-white">{disclaimer}</p>}
    </div>
  )
}

function GravityFormsFormInternal({
  form,
  customClasses,
  onSubmit,
  disclaimer,
  reportDownload,
}: GravityFormsFormInternalProps) {
  const { state } = useGravityForm()
  const [submitForm, { data, loading, error }] = useMutation(SUBMIT_FORM)

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div role="status">
          <svg
            aria-hidden="true"
            className="fill-green text-stone mr-2 h-10 w-10 animate-spin"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    )
  }

  const haveEntryId = Boolean(data?.submitGfForm?.entry?.id)
  const haveFieldErrors = Boolean(data?.submitGfForm?.errors?.length)
  const wasSuccessfullySubmitted = haveEntryId && !haveFieldErrors

  const defaultConfirmation = form?.confirmations?.find(
    confirmation => confirmation?.isDefault
  )
  const formFields = form?.formFields?.nodes || []

  const button = customClasses.includes('submit-button-as-arrow') ? (
    <ArrowButton />
  ) : (
    <DefaultButton loading={loading} disclaimer={disclaimer} form={form} />
  )

  function handleSubmit(event) {
    event.preventDefault()
    if (loading) {
      return (
        <div className="flex items-center justify-center py-8">
          <div role="status">
            <svg
              aria-hidden="true"
              className="fill-green text-stone mr-2 h-10 w-10 animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )
    }

    submitForm({
      variables: {
        formId: form.formId,
        fieldValues: state,
      },
    })
      .then(res => {
        if (res?.data?.submitGfForm?.errors === null) {
          onSubmit?.(res?.data?.submitGfForm)
        } else {
          const error = res?.data?.submitGfForm?.errors
          throw new Error(`Form submission invalid: ${error}`)
        }
      })
      .catch(error => {
        console.error(error)
      })
  }

  function getFieldErrors(id) {
    if (!haveFieldErrors) return []
    console.log(error)
    return data.submitGfForm.errors.filter(error => error.id === id)
  }

  if (wasSuccessfullySubmitted) {
    return (
      <FadeIn>
        <div className="success module-spacing-bottom-none module-spacing-top-none h-fit w-full bg-white">
          <div
            className={`sm:p-[40px]max-w-[1030px] wrapper mx-auto flex flex-col justify-center py-[80px] md:px-[100px]`}
          >
            <div
              className={`h3 text-emerald mt-[24px] text-center`}
              dangerouslySetInnerHTML={{
                __html:
                  defaultConfirmation?.message ||
                  'Form successfully submitted - thank you.',
              }}
            ></div>
          </div>
        </div>
      </FadeIn>
    )
  } else {
    return (
      <form
        method="post"
        onSubmit={handleSubmit}
        className={`flex flex-wrap justify-between ${customClasses}`}
      >
        {formFields.map(field => (
          <GravityFormsField
            key={field?.id}
            field={field}
            fieldErrors={getFieldErrors(Number(field?.id))}
            formId={form.formId}
          />
        ))}
        {error ? (
          <p className="error-message text-rust">{error.message}</p>
        ) : null}

        {reportDownload ? (
          <DownloadButton description={form?.description} />
        ) : (
          button
        )}
      </form>
    )
  }
}

const client = getApolloClient()

// @ts-ignore
export default function GravityFormsForm(props) {
  return (
    <ApolloProvider client={client}>
      <GravityFormsFormInternal {...props} />
    </ApolloProvider>
  )
}
// function createUploadLink(arg0: {
//   uri: string;
// }): import("@apollo/client").ApolloLink {
//   throw new Error("Function not implemented.");
// }
