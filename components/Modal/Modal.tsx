import Image from "next/image";
import close from "../../assets/icons/close.svg";

export const Modal = ({ modalActive, handleClose, modalContent, id = "" }) => {
  return (
    <div
      id={id}
      data-testid={id}
      className={`${
        modalActive ? "flex" : "hidden"
      } modal flex justify-center items-center`}
    >
      <div className="bg-white relative flex flex-col w-[610px] md:w-[466px] h-fit sm:w-[295px] justify-center items-center p-[60px] md:p-[40px] sm:p-[20px]">
        <div
          onClick={handleClose}
          className="absolute top-[30px] right-[30px] sm:top-[20px] sm:right-[20px]"
        >
          {" "}
          <Image alt="" src={close} />{" "}
        </div>
        {modalContent}
      </div>
    </div>
  );
};
