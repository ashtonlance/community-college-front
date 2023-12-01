import { gql } from '@apollo/client'
import useGravityForm, { ACTION_TYPES } from '../../../utils/useGravityForms'
import { cn } from 'utils'

export const WEBSITE_FIELD_FIELDS = gql`
  fragment WebsiteFieldFields on WebsiteField {
    id
    label
    description
    cssClass
    isRequired
    placeholder
  }
`

const DEFAULT_VALUE = ''

export default function WebsiteField({ field, fieldErrors }) {
  const {
    id,
    formId,
    type,
    label,
    description,
    cssClass,
    isRequired,
    placeholder,
  } = field
  const htmlId = `field_${formId}_${id}`
  const { state, dispatch } = useGravityForm()
  const fieldValue = state.find(fieldValue => fieldValue.id === id)
  const value = fieldValue?.value || DEFAULT_VALUE

  return (
    <div className={`gfield gfield-${type} ${cssClass}`.trim()}>
      <label htmlFor={htmlId}>{label}</label>
      <input
        className={cn(
          `${
            fieldErrors?.length ? '!border-[#C05325]' : null
          }`
        )}
        type="url"
        name={String(id)}
        id={htmlId}
        required={Boolean(isRequired)}
        placeholder={placeholder || ''}
        value={value}
        onChange={event => {
          // @ts-ignore
          dispatch({
            type: ACTION_TYPES.updateWebsiteFieldValue,
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
            <p key={fieldError.id} className="sr-only error-message">
              {fieldError.message}
            </p>
          ))
        : null}
    </div>
  )
}
