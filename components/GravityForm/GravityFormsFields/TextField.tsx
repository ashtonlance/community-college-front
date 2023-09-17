import { gql } from '@apollo/client'
import useGravityForm, { ACTION_TYPES } from '../../../utils/useGravityForms'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export const TEXT_FIELD_FIELDS = gql`
  fragment TextFieldFields on TextField {
    id
    label
    description
    cssClass
    isRequired
    placeholder
    visibility
  }
`
const DEFAULT_VALUE = ''

export default function TextField({ field, fieldErrors }) {
  const { state, dispatch } = useGravityForm()
  const {
    id,
    formId,
    type,
    label,
    description,
    cssClass,
    isRequired,
    placeholder,
    visibility,
  } = field
  console.log(field)
  const htmlId = `field_${formId}_${id}`
  const fieldValue = state.find(fieldValue => fieldValue.id === id)
  const value = fieldValue?.value || DEFAULT_VALUE
  const { query } = useRouter()
  const fieldIsHidden = visibility === 'HIDDEN'

  useEffect(() => {
    if (field.label == 'Job Title') {
      // @ts-ignore
      dispatch({
        type: ACTION_TYPES.updateTextFieldValue,
        fieldValue: {
          id,
          value: localStorage.getItem('userJobTitle') || '',
        },
      })
    }
    if (field.label.includes('utm')) {
      // @ts-ignore
      dispatch({
        type: ACTION_TYPES.updateTextFieldValue,
        fieldValue: {
          id,
          value: query[field.label] || '',
        },
      })
    }
    if (field.label.includes('gclid')) {
      // @ts-ignore
      dispatch({
        type: ACTION_TYPES.updateTextFieldValue,
        fieldValue: {
          id,
          value: query[field.label] || '',
        },
      })
    }
    if (field.label.includes('web_cta')) {
      // @ts-ignore
      dispatch({
        type: ACTION_TYPES.updateTextFieldValue,
        fieldValue: {
          id,
          value: query[field.label] || '',
        },
      })
    }
  }, [dispatch, field.label, id, query])

  return (
    <div
      className={`gfield gfield-${type} ${cssClass} ${
        fieldIsHidden ? 'hidden' : ''
      } `.trim()}
    >
      <label htmlFor={htmlId} className="gfield_label">
        {label}
        {isRequired ? <span className="text-rust pl-1">*</span> : null}
      </label>
      <input
        type="text"
        name={String(id)}
        className="p-regular placeholder:text-sky w-full border-[1.5px] border-black"
        id={htmlId}
        required={Boolean(isRequired)}
        placeholder={placeholder}
        value={value}
        onChange={event => {
          // @ts-ignore
          dispatch({
            type: ACTION_TYPES.updateTextFieldValue,
            fieldValue: {
              id,
              value: event.target.value,
            },
          })
        }}
      />
      {description ? <p className="field-description">{description}</p> : null}
      {fieldErrors?.length
        ? fieldErrors.map(fieldError => (
            <p key={fieldError.id} className="error-message">
              {fieldError.message}
            </p>
          ))
        : null}
    </div>
  )
}
