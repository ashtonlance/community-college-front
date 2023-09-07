import Image from 'next/image'
import close from '../../assets/icons/close.svg'

export const Modal = ({ modalActive, handleClose, modalContent, id = '' }) => {
  return (
    <div
      id={id}
      data-testid={id}
      className={`${
        modalActive ? 'flex' : 'hidden'
      } modal flex items-center justify-center`}
    >
      <div className="relative flex h-fit w-[610px] flex-col items-center justify-center bg-white p-[60px] md:w-[466px] md:p-[40px] sm:w-[295px] sm:p-[20px]">
        <div
          onClick={handleClose}
          className="absolute right-[30px] top-[30px] sm:right-[20px] sm:top-[20px]"
        >
          {' '}
          <Image alt="" src={close} />{' '}
        </div>
        {modalContent}
      </div>
    </div>
  )
}

export default Modal
