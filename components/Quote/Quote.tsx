import Image from 'next/image'
import quote from '../../assets/imgs/quote.svg'
import { WordPressBlocksViewer } from '@faustwp/blocks'

export const Quote = props => {
  const quoteMessage = props.dynamicContent

  return (
    <div className="flex flex-shrink-0 flex-grow-0 basis-full flex-col items-center justify-center">
      <Image src={quote} alt="" width={30} height={65} className="mb-[20px]" />
      <div
        className="body-large mb-[40px] text-center font-bold"
        dangerouslySetInnerHTML={{ __html: quoteMessage }}
      />
    </div>
  )
}

Quote.displayName = 'core/quote'
