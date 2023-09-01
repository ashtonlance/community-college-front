import { createContext, useContext, useReducer } from "react";
import React from "react";

import { FileUploadFieldValue as FileUpload } from "generated/graphql";
export interface FieldValue {
  id: number;
}
export interface FileUploadFieldValue extends FieldValue {
  fileUploadValues: FileUpload;
}
export var ACTION_TYPES;
(function (ACTION_TYPES) {
  ACTION_TYPES["updateAddressFieldValue"] = "updateAddressFieldValue";
  ACTION_TYPES["updateCheckboxFieldValue"] = "updateCheckboxFieldValue";
  ACTION_TYPES["updateDateFieldValue"] = "updateDateFieldValue";
  ACTION_TYPES["updateEmailFieldValue"] = "updateEmailFieldValue";
  ACTION_TYPES["updateMultiSelectFieldValue"] = "updateMultiSelectFieldValue";
  ACTION_TYPES["updateNameFieldValue"] = "updateNameFieldValue";
  ACTION_TYPES["updatePhoneFieldValue"] = "updatePhoneFieldValue";
  ACTION_TYPES["updateRadioFieldValue"] = "updateRadioFieldValue";
  ACTION_TYPES["updateSelectFieldValue"] = "updateSelectFieldValue";
  ACTION_TYPES["updateTextAreaFieldValue"] = "updateTextAreaFieldValue";
  ACTION_TYPES["updateTextFieldValue"] = "updateTextFieldValue";
  ACTION_TYPES["updateTimeFieldValue"] = "updateTimeFieldValue";
  ACTION_TYPES["updateWebsiteFieldValue"] = "updateWebsiteFieldValue";
  ACTION_TYPES["updateFileFieldValue"] = "updateFileFieldValue";
  ACTION_TYPES["updateFileUploadFieldValue"] = "updateFileUploadFieldValue";
})(ACTION_TYPES || (ACTION_TYPES = {}));

function reducer(state, action) {
  const getOtherFieldValues = (id) =>
    state.filter((fieldValue) => fieldValue.id !== id);
  switch (action.type) {
    case ACTION_TYPES.updateAddressFieldValue: {
      const { id, addressValues } = action.fieldValue;
      return [...getOtherFieldValues(id), { id, addressValues }];
    }
    case ACTION_TYPES.updateFileFieldValue: {
      const { id, fileUploadValues } = action.fieldValue;
      return [...getOtherFieldValues(id), { id, fileUploadValues }];
    }
    case ACTION_TYPES.updateCheckboxFieldValue: {
      const { id, checkboxValues } = action.fieldValue;
      return [...getOtherFieldValues(id), { id, checkboxValues }];
    }
    case ACTION_TYPES.updateEmailFieldValue: {
      const { id, emailValues } = action.fieldValue;
      return [...getOtherFieldValues(id), { id, emailValues }];
    }
    case ACTION_TYPES.updateMultiSelectFieldValue: {
      const { id, values } = action.fieldValue;
      return [...getOtherFieldValues(id), { id, values }];
    }
    case ACTION_TYPES.updateNameFieldValue: {
      const { id, nameValues } = action.fieldValue;
      return [...getOtherFieldValues(id), { id, nameValues }];
    }
    case ACTION_TYPES.updateFileUploadFieldValue: {
      const { id, fileUploadValues } =
        action.fieldValue as FileUploadFieldValue;
      return [...getOtherFieldValues(id), { id, fileUploadValues }];
    }
    case ACTION_TYPES.updateDateFieldValue:
    case ACTION_TYPES.updatePhoneFieldValue:
    case ACTION_TYPES.updateRadioFieldValue:
    case ACTION_TYPES.updateSelectFieldValue:
    case ACTION_TYPES.updateTextAreaFieldValue:
    case ACTION_TYPES.updateTextFieldValue:
    case ACTION_TYPES.updateTimeFieldValue:
    case ACTION_TYPES.updateWebsiteFieldValue: {
      const { id, value } = action.fieldValue;
      return [...getOtherFieldValues(id), { id, value }];
    }
    default:
      throw new Error(
        `Field value update operation not supported: ${action.type}.`
      );
  }
}
const DEFAULT_STATE = [];
const GravityFormContext = createContext({
  state: DEFAULT_STATE,
  dispatch: () => null,
});
export function GravityFormProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);
  return React.createElement(
    GravityFormContext.Provider,
    // @ts-ignore
    { value: { state, dispatch } },
    children
  );
}
const useGravityForm = () => useContext(GravityFormContext);
export default useGravityForm;
