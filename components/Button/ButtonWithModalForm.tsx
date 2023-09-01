import { Modal } from "components/Modal";
import { EventRegistration } from "components/Modal/EventRegistration";

export const ButtonWithModalForm = ({
  setModalActive,
  modalActive,
  ctaLabel = false,
  classList = "primary-btn",
  form,
}) => {
  return (
    <div className={classList}>
      <span onClick={() => setModalActive(true)}>{ctaLabel}</span>
      <Modal
        modalContent={<EventRegistration form={form} />}
        modalActive={modalActive}
        handleClose={() => setModalActive(false)}
      />
    </div>
  );
};
