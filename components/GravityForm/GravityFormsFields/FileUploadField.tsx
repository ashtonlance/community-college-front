import { gql } from '@apollo/client'
import React from 'react'
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
    <fieldset className={`gfield gfield-${type} w-[48%] ${cssClass}`.trim()}>
      <legend className="text-emerald my-2">{label}</legend>
      <div className="field" data-id={id} data-type={type}>
        <input
          className="secondary-btn p-regular text-emerald w-full lowercase !px-0"
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
        <p className="field-description capitalize my-2 text-sm text-emerald">
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
          <small className="text-emerald capitalize font-semibold">
            Maximum File Size: {maxFileSize}
          </small>
        </div>
      )}

      {maxFiles > 0 && (
        <div>
          <small className="text-emerald capitalize font-semibold">
            Maximum Number of Files: {maxFiles}
          </small>
        </div>
      )}
      {fieldErrors?.length
        ? fieldErrors.map(fieldError => (
            <p key={fieldError.id} className="error-message">
              {fieldError.message}
            </p>
          ))
        : null}
    </fieldset>
  )
}
