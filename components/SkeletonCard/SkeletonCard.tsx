import React from 'react'

export const SkeletonCard = () => {
  const card = `bg-stone flex flex w-full p-2 h-auto animate-pulse gap-8 mt-8`
  const cardImage = `w-[33%] overflow-hidden`
  const cardContent = `w-[66%]`
  return (
    <div className={card}>
      <div className={cardImage}>
        <div className={`h-[300px] w-full bg-beige lg:h-[331px]`}></div>
      </div>
      <div className={cardContent}>
        <h2 className={`my-3 h-10 rounded-md bg-beige`}></h2>
        <div
          className={`md:text-md font-body flex flex-col gap-2 pb-4 text-xs text-gray-500`}
        >
          <div className={`h-4 rounded-md bg-beige`}></div>
          <div className={`h-4 rounded-md bg-beige`}></div>
          <div className={`h-4 rounded-md bg-beige`}></div>
        </div>
        <div className="border-secondary bg-secondary font-body hover:text-secondary hidden h-12 w-full min-w-[165px] rounded-full border-2 px-8 py-2 text-center uppercase text-white transition duration-300 ease-in-out hover:bg-white lg:block"></div>
      </div>
    </div>
  )
}
