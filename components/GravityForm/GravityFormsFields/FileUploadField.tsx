import { gql } from '@apollo/client'
import { cn } from 'utils'

import useGravityForm, {
  ACTION_TYPES,
  FieldValue,
  FileUploadFieldValue,
} from '../../../utils/useGravityForms'

export const FILE_FIELD_FIELDS = gql`
  fragment FileUploadFields on FileUploadField {
    label
    description
    type
    cssClass
    allowedExtensions
    maxFiles
    maxFileSize
    isRequired
  }
`

const DEFAULT_VALUE = {}

export default function FileUploadField({ field, fieldErrors }) {
  const {
    formId,
    cssClass,
    allowedExtensions,
    description,
    id,
    maxFileSize,
    maxFiles,
    label,
    type,
    isRequired,
  } = field
  const htmlId = `field_${formId}_${id}`
  const { state, dispatch } = useGravityForm()
  const fieldValue = state.find(
    (fieldValue: FieldValue) => fieldValue.id === id
  ) as FileUploadFieldValue | undefined

  function handleChange(event) {
    const { files } = event.target
    const file = files?.[0]
    console.log({ file }, 'file')
    console.log({ event, files })

    // @ts-ignore
    dispatch({
      type: ACTION_TYPES.updateFileUploadFieldValue,
      fieldValue: {
        id,
        fileUploadValues: files,
      },
    })
  }

  return (
    <fieldset className={`gfield gfield-${type}  ${cssClass}`.trim()}>
      <legend className="text-emerald my-2">{label}</legend>
      <div className="field" data-id={id} data-type={type}>
        <input
          className={cn(
            `secondary-btn p-regular text-emerald w-full !px-0 lowercase ${
              fieldErrors?.length ? '!border-[#C05325]' : null
            }`
          )}
          id={htmlId}
          name={field.label}
          type="file"
          // onChange={handleChange}
          required={Boolean(isRequired)}
          onChange={event => {
            const { files } = event.target
            const file = files?.[0]
            // @ts-ignore
            dispatch({
              type: ACTION_TYPES.updateFileUploadFieldValue,
              fieldValue: {
                id,
                fileUploadValues: [
                  file,
                ] as FileUploadFieldValue['fileUploadValues'],
              },
            })
          }}
        />
      </div>
      {description ? (
        <p className="field-description text-emerald my-2 text-sm capitalize">
          {description}
        </p>
      ) : null}
      {allowedExtensions?.length > 0 && (
        <div>
          <small className="text-emerald font-semibold">
            Allowed Extensions: {allowedExtensions.map(ext => ext)}{' '}
          </small>
        </div>
      )}

      {maxFileSize > 0 && (
        <div>
          <small className="text-emerald font-semibold capitalize">
            Maximum File Size: {maxFileSize}
          </small>
        </div>
      )}

      {maxFiles > 0 && (
        <div>
          <small className="text-emerald font-semibold capitalize">
            Maximum Number of Files: {maxFiles}
          </small>
        </div>
      )}
      {fieldErrors?.length
        ? fieldErrors.map(fieldError => (
            <p key={fieldError.id} className="sr-only error-message">
              {fieldError.message}
            </p>
          ))
        : null}
    </fieldset>
  )
}
