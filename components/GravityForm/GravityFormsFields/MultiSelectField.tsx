import { gql } from '@apollo/client'
import useGravityForm, { ACTION_TYPES } from '../../../utils/useGravityForms'
import { MultiSelect } from 'react-multi-select-component'

export const MULTI_SELECT_FIELD_FIELDS = gql`
  fragment MultiSelectFieldFields on MultiSelectField {
    id
    label
    description
    cssClass
    isRequired
    choices {
      text
      value
    }
  }
`

const DEFAULT_VALUE = []

export default function MultiSelectField({ field, fieldErrors }) {
  const {
    id,
    formId,
    type,
    label,
    description,
    cssClass,
    isRequired,
    choices,
  } = field
  const htmlId = `field_${formId}_${id}`
  const { state, dispatch } = useGravityForm()
  const fieldValue = state.find(fieldValue => fieldValue.id === id)
  const values = fieldValue?.values || DEFAULT_VALUE
  const options =
    choices?.map(choice => ({ value: choice?.value, label: choice?.text })) ||
    []
  const selectedOptions = options.filter(option =>
    values.includes(String(option?.value))
  )

  function handleChange(value, actionMeta) {
    const values = value.map(option => option.value)
    // @ts-ignore
    dispatch({
      type: ACTION_TYPES.updateMultiSelectFieldValue,
      fieldValue: { id, values },
    })
  }

  return (
    <div
      className={`gfield gfield-${type} ${cssClass} secondary-btn border-[1.5px] border-black p-regular text-emerald w-full max-w-[400px] mx-auto`.trim()}
    >
      <label htmlFor={htmlId}>{label}</label>
      <MultiSelect
        // isMulti
        labelledBy={String(id)}
        // id={htmlId}
        // required={Boolean(isRequired)}
        options={options}
        value={selectedOptions}
        onChange={handleChange}
        hasSelectAll={false}
        className="rounded-none "
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
