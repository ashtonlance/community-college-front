import { gql } from '@apollo/client'
import Image from 'next/image'
import Link from 'next/link'

export const PreFooter = ({ preFooterContent }) => {
  const heading = preFooterContent?.prefooter?.heading
  const certifications = preFooterContent?.prefooter?.certifications

  return (
    <div className="bg-gmt-200 w-full py-[60px] px-[100px] flex flex-col sm:p-[40px]">
      <h3 className="mb-[40px] text-center">{heading}</h3>
      <div className="flex gap-[10%] w-full justify-center items-center sm:flex-col">
        {certifications?.map(item => (
          <Link href={item.link} key={item.link} className="sm:mb-[32px]">
            <Image src={item.image.sourceUrl} alt="" width={100} height={50} />
          </Link>
        ))}
      </div>
    </div>
  )
}

PreFooter.displayName = 'Footer'
PreFooter.fragments = {
  key: `PreFooterFragment`,
  entry: gql`
    fragment PreFooterFragment on Menu {
      prefooter {
        fieldGroupName
        heading
        certifications {
          fieldGroupName
          link
          image {
            sourceUrl
          }
        }
      }
    }
  `,
}
