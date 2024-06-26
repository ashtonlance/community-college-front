import { useState } from 'react'

const MAX_TEXT_WORDS = 40

const getLimitedWords = (text: string) => {
  return text?.split(/\s+/).slice(0, MAX_TEXT_WORDS).join(' ').concat('...')
}

const wordCount = (text: string) => {
  return text?.split(/\s+/).length
}

export const ReadMore = ({ content }) => {
  const [readMore, setReadMore] = useState(false)

  const toggleReadMore = () => {
    setReadMore(!readMore)
  }

  return (
    <div className="flex flex-col gap-[20px] sm:gap-[10px]">
      {wordCount(content) >= MAX_TEXT_WORDS ? (
        <>
          {readMore ? (
            <div
              className="body-large mb-[20px] flex flex-col gap-[20px] text-gmt-400"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          ) : (
            <div
              className="body-large mb-[20px] flex flex-col gap-[20px] text-gmt-400"
              dangerouslySetInnerHTML={{ __html: getLimitedWords(content) }}
            />
          )}
          <span
            onClick={toggleReadMore}
            className="secondary-btn mb-[20px] w-fit border-[1.5px] border-black"
          >
            {readMore ? 'Show Less' : 'Read More'}
          </span>
        </>
      ) : (
        <div
          className="body-large mb-[20px] flex flex-col gap-[20px] text-gmt-400"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
    </div>
  )
}
