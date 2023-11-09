import { gql } from '@apollo/client'
import useGravityForm, { ACTION_TYPES } from '../../../utils/useGravityForms'

export const NAME_FIELD_FIELDS = gql`
  fragment NameFieldFields on NameField {
    id
    label
    description
    isRequired
    cssClass
    inputs {
      label
      ... on NameInputProperty {
        id
        name
        placeholder
        isHidden
      }
    }
  }
`

const AUTOCOMPLETE_ATTRIBUTES = {
  prefix: 'honorific-prefix',
  first: 'given-name',
  middle: 'additional-name',
  last: 'family-name',
  suffix: 'honorific-suffix',
}

const DEFAULT_VALUE = {}

export default function NameField({ field, fieldErrors }) {
  const { id, formId, type, label, description, cssClass, inputs, isRequired } =
    field

  const htmlId = `field_${formId}_${id}`
  const { state, dispatch } = useGravityForm()
  const fieldValue = state.find(fieldValue => fieldValue.id === id)
  const nameValues = fieldValue?.nameValues || DEFAULT_VALUE

  const prefixInput = inputs?.find(input => input?.key === 'prefix')
  const otherInputs = inputs?.filter(input => input?.key !== 'prefix') || []

  function handleChange(event) {
    const { name, value } = event.target
    const newNameValues = { ...nameValues, [name]: value }

    // @ts-ignore
    dispatch({
      type: ACTION_TYPES.updateNameFieldValue,
      fieldValue: {
        id,
        nameValues: newNameValues,
      },
    })
  }

  return (
    <fieldset
      id={htmlId}
      className={`gfield flex w-full justify-between md:flex-col gfield-${type} ${cssClass}`.trim()}
    >
      {prefixInput ? (
        <>
          <select
            name={String(prefixInput.key).toLocaleLowerCase()}
            id={`input_${formId}_${id}_${prefixInput.key}`}
            autoComplete={AUTOCOMPLETE_ATTRIBUTES.prefix}
            value={nameValues.prefix || ''}
            onChange={handleChange}
          >
            <option value=""></option>
            {prefixInput.choices?.map(choice => (
              <option key={choice?.value} value={String(choice?.value)}>
                {String(choice?.text)}
              </option>
            ))}
          </select>
          <label htmlFor={`input_${formId}_${id}_${prefixInput.key}`}>
            {prefixInput.label}
          </label>
        </>
      ) : null}
      {otherInputs.map(input => {
        const key = input?.key || input?.label
        const inputLabel = input?.label || ''
        const placeholder = input?.placeholder || ''
        const isHidden = input?.isHidden || false
        if (isHidden) return null
        return (
          <div className="gfield gfield-name-input sm:basis-full md:basis-[calc(50%-7.5px)] basis-[calc(50%-10px)]" key={key}>
            <label htmlFor={`input_${formId}_${id}_${key}`}>
              {inputLabel}{' '}
              {isRequired ? <span className="pl-1 text-rust">*</span> : null}
            </label>
            <input
              className="w-full"
              type="text"
              name={String(key).toLowerCase()}
              id={`input_${formId}_${id}_${key}`}
              placeholder={placeholder}
              autoComplete={AUTOCOMPLETE_ATTRIBUTES[key]}
              value={nameValues?.[key.toLowerCase()] || ''}
              onChange={handleChange}
            />
          </div>
        )
      })}
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
