import { GravityFormProvider } from "../../utils/useGravityForms";
import GravityFormsForm from "./GravityFormsForm";
import { gql } from "@apollo/client";
import { ADDRESS_FIELD_FIELDS } from "./GravityFormsFields/AddressField";
import { CHECKBOX_FIELD_FIELDS } from "./GravityFormsFields/CheckboxField";
import { DATE_FIELD_FIELDS } from "./GravityFormsFields/DateField";
import { EMAIL_FIELD_FIELDS } from "./GravityFormsFields/EmailField";
import { MULTI_SELECT_FIELD_FIELDS } from "./GravityFormsFields/MultiSelectField";
import { NAME_FIELD_FIELDS } from "./GravityFormsFields/NameField";
import { PHONE_FIELD_FIELDS } from "./GravityFormsFields/PhoneField";
import { RADIO_FIELD_FIELDS } from "./GravityFormsFields/RadioField";
import { SELECT_FIELD_FIELDS } from "./GravityFormsFields/SelectField";
import { TEXT_AREA_FIELD_FIELDS } from "./GravityFormsFields/TextAreaField";
import { TEXT_FIELD_FIELDS } from "./GravityFormsFields/TextField";
import { TIME_FIELD_FIELDS } from "./GravityFormsFields/TimeField";
import { WEBSITE_FIELD_FIELDS } from "./GravityFormsFields/WebsiteField";
import { FILE_FIELD_FIELDS } from "./GravityFormsFields/FileUploadField";

export const GravityForm = ({ form, customClasses, disclaimer = "" }) => {
  return (
    <GravityFormProvider>
      <GravityFormsForm
        form={form}
        customClasses={customClasses}
        disclaimer={disclaimer}
      />
    </GravityFormProvider>
  );
};

GravityForm.displayName = "GfForm";
GravityForm.fragments = {
  key: "GravityFormFragment",
  entry: gql`
    fragment GravityFormFragment on GfForm {
      formId
      title
      description
      button {
        text
      }
      confirmations {
        isDefault
        message
      }
      formFields(first: 500) {
        nodes {
          id
          type
          ... on AddressField {
            ...AddressFieldFields
          }
          ... on FileUploadField {
            ...FileUploadFields
          }
          ... on CheckboxField {
            ...CheckboxFieldFields
          }
          ... on DateField {
            ...DateFieldFields
          }
          ... on EmailField {
            ...EmailFieldFields
          }
          ... on MultiSelectField {
            ...MultiSelectFieldFields
          }
          ... on NameField {
            ...NameFieldFields
          }
          ... on PhoneField {
            ...PhoneFieldFields
          }
          ... on RadioField {
            ...RadioFieldFields
          }
          ... on SelectField {
            ...SelectFieldFields
          }
          ... on TextField {
            ...TextFieldFields
          }
          ... on TextAreaField {
            ...TextAreaFieldFields
          }
          ... on TimeField {
            ...TimeFieldFields
          }
          ... on WebsiteField {
            ...WebsiteFieldFields
          }
        }
      }
    }
    ${ADDRESS_FIELD_FIELDS}
    ${CHECKBOX_FIELD_FIELDS}
    ${DATE_FIELD_FIELDS}
    ${EMAIL_FIELD_FIELDS}
    ${MULTI_SELECT_FIELD_FIELDS}
    ${NAME_FIELD_FIELDS}
    ${PHONE_FIELD_FIELDS}
    ${RADIO_FIELD_FIELDS}
    ${SELECT_FIELD_FIELDS}
    ${TEXT_AREA_FIELD_FIELDS}
    ${TEXT_FIELD_FIELDS}
    ${TIME_FIELD_FIELDS}
    ${WEBSITE_FIELD_FIELDS}
    ${FILE_FIELD_FIELDS}
  `,
};
