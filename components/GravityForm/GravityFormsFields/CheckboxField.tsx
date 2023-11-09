import { gql } from '@apollo/client'
import useGravityForm, { ACTION_TYPES } from '../../../utils/useGravityForms'

export const CHECKBOX_FIELD_FIELDS = gql`
  fragment CheckboxFieldFields on CheckboxField {
    id
    label
    description
    cssClass
    inputs {
      id
    }
    choices {
      text
      value
    }
  }
`

const DEFAULT_VALUE = []

export default function CheckboxField({ field, fieldErrors }) {
  const { id, formId, type, label, description, cssClass, inputs, choices } =
    field
  const checkboxInputs =
    choices?.map((choice, index) => ({ ...choice, id: inputs?.[index]?.id })) ||
    []
  const htmlId = `field_${formId}_${id}`
  const { state, dispatch } = useGravityForm()
  const fieldValue = state.find(fieldValue => fieldValue.id === id)
  const checkboxValues = fieldValue?.checkboxValues || DEFAULT_VALUE

  function handleChange(event) {
    const { name, value, checked } = event.target
    const otherCheckboxValues = checkboxValues.filter(
      checkboxValue => checkboxValue.inputId !== Number(name)
    )
    const newCheckboxValues = checked
      ? [...otherCheckboxValues, { fieldValue, value }]
      : otherCheckboxValues

    // @ts-ignore
    dispatch({
      type: ACTION_TYPES.updateCheckboxFieldValue,
      fieldValue: {
        id,
        checkboxValues: newCheckboxValues,
      },
    })
  }

  return (
    <fieldset
      id={htmlId}
      className={`gfield gfield-${type} ${cssClass}`.trim()}
    >
      <legend>{label}</legend>
      {checkboxInputs.map(({ id: inputId, text, value }) => (
        <div className="sm:mb-3 mb-[10px] flex items-center" key={inputId}>
          <input
            className="h-5 w-5 !rounded !p-0 accent-navy focus-within:outline-lightBlue"
            type="checkbox"
            name={String(inputId)}
            id={`input_${formId}_${id}_${inputId}`}
            value={String(value)}
            onChange={handleChange}
          />
          <label
            className="p-label body-regular ml-3 text-navy mb-0"
            htmlFor={`input_${formId}_${id}_${inputId}`}
          >
            {text}
          </label>
        </div>
      ))}
      {description ? <p className="field-description">{description}</p> : null}
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
