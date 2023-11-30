import { gql } from '@apollo/client'
import useGravityForm, { ACTION_TYPES } from '../../../utils/useGravityForms'
import { cn } from 'utils'

export const RADIO_FIELD_FIELDS = gql`
  fragment RadioFieldFields on RadioField {
    id
    label
    description
    cssClass
    choices {
      text
      value
    }
  }
`

const DEFAULT_VALUE = ''

export default function RadioField({ field, fieldErrors }) {
  const { id, formId, type, label, description, cssClass, choices } = field
  const htmlId = `field_${formId}_${id}`
  const { state, dispatch } = useGravityForm()
  const fieldValue = state.find(fieldValue => fieldValue.id === id)
  const value = fieldValue?.value || DEFAULT_VALUE

  function handleChange(event) {
    // @ts-ignore
    dispatch({
      type: ACTION_TYPES.updateRadioFieldValue,
      fieldValue: {
        id,
        value: event.target.value,
      },
    })
  }

  return (
    <fieldset
      id={htmlId}
      className={`gfield gfield-${type} ${cssClass}`.trim()}
    >
      <legend>{label}</legend>
      {choices?.map(input => {
        const text = input?.text || ''
        const inputValue = input?.value || ''
        return (
          <div className="sm:mb-3 mb-[10px] flex items-center" key={inputValue}>
            <input
              className={cn(
                `h-5 w-5 !rounded-full !p-0 accent-navy focus-within:outline-lightBlue ${
                  fieldErrors?.length ? '!border-[#C05325]' : null
                }`
              )}
              type="radio"
              name={String(id)}
              id={`choice_${formId}_${id}_${inputValue}`}
              value={inputValue}
              onChange={handleChange}
            />
            <label
              className="p-label body-regular ml-3 text-navy mb-0"
              htmlFor={`choice_${formId}_${id}_${value}`}
            >
              {text}
            </label>
          </div>
        )
      })}
      {description ? <p className="field-description">{description}</p> : null}
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
