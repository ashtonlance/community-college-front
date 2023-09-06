import { gql } from '@apollo/client'
import useGravityForm, { ACTION_TYPES } from '../../../utils/useGravityForms'

export const TIME_FIELD_FIELDS = gql`
  fragment TimeFieldFields on TimeField {
    id
    label
    description
    cssClass
    isRequired
  }
`

const DEFAULT_VALUE = ''

export default function TimeField({ field, fieldErrors }) {
  const { id, formId, type, label, description, cssClass, isRequired } = field
  const htmlId = `field_${formId}_${id}`
  const { state, dispatch } = useGravityForm()
  const fieldValue = state.find(fieldValue => fieldValue.id === id)
  const value = fieldValue?.value || DEFAULT_VALUE

  return (
    <div className={`gfield gfield-${type} ${cssClass}`.trim()}>
      <label htmlFor={htmlId}>{label}</label>
      <input
        type="time"
        name={String(id)}
        id={htmlId}
        required={Boolean(isRequired)}
        value={value}
        onChange={event => {
          // @ts-ignore
          dispatch({
            type: ACTION_TYPES.updateTimeFieldValue,
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
