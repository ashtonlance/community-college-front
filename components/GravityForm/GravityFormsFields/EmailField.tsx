import { gql } from "@apollo/client";

import useGravityForm, { ACTION_TYPES } from "../../../utils/useGravityForms";
import { useEffect } from "react";

export const EMAIL_FIELD_FIELDS = gql`
  fragment EmailFieldFields on EmailField {
    id
    label
    description
    cssClass
    isRequired
    placeholder
  }
`;

const DEFAULT_VALUE = "";

export default function EmailField({ field, fieldErrors }) {
  const { state, dispatch } = useGravityForm();
  const {
    id,
    formId,
    type,
    label,
    description,
    cssClass,
    isRequired,
    placeholder,
  } = field;

  useEffect(() => {
    // @ts-ignore
    dispatch({
      type: ACTION_TYPES.updateEmailFieldValue,
      fieldValue: {
        id,
        emailValues: {
          value: localStorage.getItem("userEmail") || "",
          confirmationValue: localStorage.getItem("userEmail") || "",
        },
      },
    });
  }, [dispatch, id]);

  const htmlId = `field_${formId}_${id}`;
  const fieldValue = state.find((fieldValue) => fieldValue.id === id);
  const value = fieldValue?.emailValues?.value || DEFAULT_VALUE;

  return (
    <div className={`gfield gfield-${type} ${cssClass} w-[48%]`.trim()}>
      <label htmlFor={htmlId} className="gfield_label">
        {label}
        {isRequired ? <span className="text-rust">*</span> : null}
      </label>
      <input
        className="border-[1.5px] px-[22px] py-[14px] p-regular placeholder:text-sky w-full"
        type="email"
        name={String(id)}
        id={htmlId}
        placeholder={placeholder}
        required={Boolean(isRequired)}
        value={value.toLowerCase()}
        onChange={(event) => {
          // @ts-ignore
          dispatch({
            type: ACTION_TYPES.updateEmailFieldValue,
            fieldValue: {
              id,
              emailValues: {
                value: event.target.value,
                confirmationValue: event.target.value,
              },
            },
          });
        }}
      />
      {description ? <p className="field-description">{description}</p> : null}
      {fieldErrors?.length
        ? fieldErrors.map((fieldError) => (
            <p key={fieldError.id} className="error-message">
              {fieldError.message}
            </p>
          ))
        : null}
    </div>
  );
}
