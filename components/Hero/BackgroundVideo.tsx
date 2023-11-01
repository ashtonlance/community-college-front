import { gql, useQuery } from '@apollo/client'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Image from 'next/image'
import poster from 'public/poster.jpg'
import { useState } from 'react'
const ReactPlayer = dynamic(() => import('react-player/lazy'), {
  ssr: false,
})

const GET_BACKGROUND_VIDEO_FILE = gql`
  query GetVideoURLFromID($databaseId: ID!) {
    mediaItem(id: $databaseId, idType: DATABASE_ID) {
      id
      link
    }
  }
`

export const BackgroundVideoURL = ({ url }: { url: string }) => {
  const [showImage, setShowImage] = useState(false)
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://youtube.com" />
      </Head>
      <div className="absolute top-0 h-full w-full bg-navy">
        {showImage && (
          <Image className="object-cover" src={poster.src} alt="" fill />
        )}
        <ReactPlayer
          muted
          playing
          loop
          controls={false}
          className="video-wrapper absolute left-[50%] top-[50%] !h-full !w-full translate-x-[-50%]	translate-y-[-50%]"
          url={url}
          width="100%"
          height="100%"
          playsinline
          onError={e => {
            console.log({ e })
            setShowImage(true)
          }}
        />
      </div>
    </>
  )
}

export const BackgroundVideoFile = ({ databaseId }) => {
  const { loading, error, data } = useQuery(GET_BACKGROUND_VIDEO_FILE, {
    variables: { databaseId },
  })

  if (loading) {
    return
  }
  if (error) {
    console.log({ error })
  }
  if (data) {
    const url = data?.mediaItem?.link
    return (
      <>
        <BackgroundVideoURL url={url} />
      </>
    )
  }
}
