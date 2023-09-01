import { gql } from "@apollo/client";

import { client } from "./apollo";
import { ADDRESS_FIELD_FIELDS } from "../components/GravityForm/GravityFormsFields/AddressField";
import { CHECKBOX_FIELD_FIELDS } from "../components/GravityForm/GravityFormsFields/CheckboxField";
import { DATE_FIELD_FIELDS } from "../components/GravityForm/GravityFormsFields/DateField";
import { EMAIL_FIELD_FIELDS } from "../components/GravityForm/GravityFormsFields/EmailField";
import { MULTI_SELECT_FIELD_FIELDS } from "../components/GravityForm/GravityFormsFields/MultiSelectField";
import { NAME_FIELD_FIELDS } from "../components/GravityForm/GravityFormsFields/NameField";
import { PHONE_FIELD_FIELDS } from "../components/GravityForm/GravityFormsFields/PhoneField";
import { RADIO_FIELD_FIELDS } from "../components/GravityForm/GravityFormsFields/RadioField";
import { SELECT_FIELD_FIELDS } from "../components/GravityForm/GravityFormsFields/SelectField";
import { TEXT_AREA_FIELD_FIELDS } from "../components/GravityForm/GravityFormsFields/TextAreaField";
import { TEXT_FIELD_FIELDS } from "../components/GravityForm/GravityFormsFields/TextField";
import { TIME_FIELD_FIELDS } from "../components/GravityForm/GravityFormsFields/TimeField";
import { WEBSITE_FIELD_FIELDS } from "../components/GravityForm/GravityFormsFields/WebsiteField";

const GET_FORM = gql`
  query getForm($formId: ID!) {
    gravityFormsForm(id: $formId, idType: DATABASE_ID) {
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
`;

export default async function getGravityForm(formId) {
  const result = await client.query({
    query: GET_FORM,
    variables: { formId },
  });

  return result?.data?.gravityFormsForm;
}
