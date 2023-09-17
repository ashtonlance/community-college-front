import { gql } from '@apollo/client'
import useGravityForm, { ACTION_TYPES } from '../../../utils/useGravityForms'

export const SELECT_FIELD_FIELDS = gql`
  fragment SelectFieldFields on SelectField {
    id
    label
    description
    cssClass
    isRequired
    defaultValue
    choices {
      text
      value
    }
  }
`

export default function SelectField({ field, fieldErrors }) {
  const {
    id,
    formId,
    type,
    label,
    description,
    cssClass,
    isRequired,
    defaultValue,
    choices,
  } = field
  const htmlId = `field_${formId}_${id}`
  const { state, dispatch } = useGravityForm()
  const fieldValue = state.find(fieldValue => fieldValue.id === id)
  const value = fieldValue?.value || String(defaultValue)

  return (
    <div className={`gfield  gfield-${type} ${cssClass} w-full`.trim()}>
      <label htmlFor={htmlId} className="gfield_label">
        {label}
        {isRequired ? <span className="text-rust">*</span> : null}
      </label>
      <select
        className="p-regular w-full rounded  px-[20px] py-[14px] text-navy accent-navy focus-within:outline-lightBlue focus:outline-lightBlue focus:ring-lightBlue active:outline-lightBlue"
        name={String(id)}
        id={htmlId}
        required={Boolean(isRequired)}
        value={value}
        onChange={event => {
          // @ts-ignore
          dispatch({
            type: ACTION_TYPES.updateSelectFieldValue,
            fieldValue: {
              id,
              value: event.target.value,
            },
          })
        }}
      >
        {/* <option value="" className="text-emerald" suppressHydrationWarning>
          {label}
        </option> */}
        {choices?.map(choice => (
          <option
            className="text-emerald"
            key={choice?.value || ''}
            value={choice?.value || ''}
            suppressHydrationWarning
          >
            {choice?.text || ''}
          </option>
        ))}
      </select>
      {description ? (
        <p className="field-description text-emerald">{description}</p>
      ) : null}
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
