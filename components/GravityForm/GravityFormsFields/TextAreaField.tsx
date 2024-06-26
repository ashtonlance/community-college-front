import { gql } from '@apollo/client'
import { cn } from 'utils'
import useGravityForm, { ACTION_TYPES } from '../../../utils/useGravityForms'

export const TEXT_AREA_FIELD_FIELDS = gql`
  fragment TextAreaFieldFields on TextAreaField {
    id
    label
    description
    cssClass
    isRequired
    placeholder
  }
`

const DEFAULT_VALUE = ''

export default function TextAreaField({ field, fieldErrors }) {
  const { id, formId, type, label, description, cssClass, isRequired, placeholder } = field
  const htmlId = `field_${formId}_${id}`
  const { state, dispatch } = useGravityForm()
  const fieldValue = state.find(fieldValue => fieldValue.id === id)
  const value = fieldValue?.value || DEFAULT_VALUE
  return (
    <div className={`gfield  gfield-${type} ${cssClass} basis-full`.trim()}>
      <label htmlFor={htmlId} className="gfield_label">
        {label}
        {isRequired ? <span className="pl-1 text-rust">*</span> : null}
      </label>
      <textarea
        className={cn(
          `h-52 w-full text-navy ${
            fieldErrors?.length ? '!border-[#C05325]' : null
          }`
        )}
        placeholder={placeholder || ''}
        name={String(id)}
        id={htmlId}
        required={Boolean(isRequired)}
        value={value}
        onChange={event => {
          // @ts-ignore
          dispatch({
            type: ACTION_TYPES.updateTextAreaFieldValue,
            fieldValue: {
              id,
              value: event.target.value,
            },
          })
        }}
      />
      {description ? (
        <p
          className="field-description"
          dangerouslySetInnerHTML={{ __html: description }}
        ></p>
      ) : null}
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
