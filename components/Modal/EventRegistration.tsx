import { GravityForm } from "../GravityForm/GravityForm";

export const EventRegistration = ({ form }) => {
  return (
    <>
      <h3 className=""> Request an Invite </h3>
      <div className="flex gap-[20px] flex-col">
        <GravityForm
          form={form}
          customClasses="flex flex-wrap gap-y-[20px] gap-x-[4%] event-registration-form"
          disclaimer="By submitting this form, you agree to receive emails, promotions, and general messages from GMT. You also agree to our Privacy Policy."
        />
      </div>
    </>
  );
};
