import dynamic from 'next/dynamic'
const AddressField = dynamic(() =>
  import('./GravityFormsFields/AddressField').then(mod => mod.default)
) as any

const CheckboxField = dynamic(() =>
  import('./GravityFormsFields/CheckboxField').then(mod => mod.default)
) as any
const DateField = dynamic(() =>
  import('./GravityFormsFields/DateField').then(mod => mod.default)
) as any
const EmailField = dynamic(() =>
  import('./GravityFormsFields/EmailField').then(mod => mod.default)
) as any
const MultiSelectField = dynamic(() =>
  import('./GravityFormsFields/MultiSelectField').then(mod => mod.default)
) as any
const NameField = dynamic(() =>
  import('./GravityFormsFields/NameField').then(mod => mod.default)
) as any
const PhoneField = dynamic(() =>
  import('./GravityFormsFields/PhoneField').then(mod => mod.default)
) as any
const RadioField = dynamic(() =>
  import('./GravityFormsFields/RadioField').then(mod => mod.default)
) as any
const SelectField = dynamic(() =>
  import('./GravityFormsFields/SelectField').then(mod => mod.default)
) as any
const TextField = dynamic(() =>
  import('./GravityFormsFields/TextField').then(mod => mod.default)
) as any
const TextAreaField = dynamic(() =>
  import('./GravityFormsFields/TextAreaField').then(mod => mod.default)
) as any
const TimeField = dynamic(() =>
  import('./GravityFormsFields/TimeField').then(mod => mod.default)
) as any
const WebsiteField = dynamic(() =>
  import('./GravityFormsFields/WebsiteField').then(mod => mod.default)
) as any
const FileUploadField = dynamic(() =>
  import('./GravityFormsFields/FileUploadField').then(mod => mod.default)
) as any

export default function GravityFormsField({ field, fieldErrors, formId }) {
  switch (field?.type?.toLowerCase()) {
    case 'address':
      return <AddressField field={field} fieldErrors={fieldErrors} />
    case 'checkbox':
      return <CheckboxField field={field} fieldErrors={fieldErrors} />
    case 'date':
      return <DateField field={field} fieldErrors={fieldErrors} />
    case 'email':
      return <EmailField field={field} fieldErrors={fieldErrors} />
    case 'multiselect':
      return <MultiSelectField field={field} fieldErrors={fieldErrors} />
    case 'name':
      return <NameField field={field} fieldErrors={fieldErrors} />
    case 'phone':
      return <PhoneField field={field} fieldErrors={fieldErrors} />
    case 'radio':
      return <RadioField field={field} fieldErrors={fieldErrors} />
    case 'select':
      return <SelectField field={field} fieldErrors={fieldErrors} />
    case 'text':
      return <TextField field={field} fieldErrors={fieldErrors} />
    case 'textarea':
      return <TextAreaField field={field} fieldErrors={fieldErrors} />
    case 'time':
      return <TimeField field={field} fieldErrors={fieldErrors} />
    case 'website':
      return <WebsiteField field={field} fieldErrors={fieldErrors} />
    case 'hidden':
      return <div className="hidden"></div>
    case 'fileupload':
      return <FileUploadField field={field} fieldErrors={fieldErrors} />
    default:
      return <p>{`Field type not supported: ${field.type}.`}</p>
  }
}
