import dynamic from 'next/dynamic'
import { gql, useQuery } from '@apollo/client'
import Head from 'next/head'
const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false })

const GET_BACKGROUND_VIDEO_FILE = gql`
  query GetVideoURLFromID($databaseId: ID!) {
    mediaItem(id: $databaseId, idType: DATABASE_ID) {
      id
      link
    }
  }
`

export const BackgroundVideoURL = ({ url }: { url: string }) => {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://youtube.com" />
      </Head>
      <div className="absolute h-full w-full bg-navy pt-[75.25%]">
        {/* <div className="relative h-full w-full "> */}
        <ReactPlayer
          muted
          playing
          loop
          controls={false}
          className="absolute left-0 top-0"
          url={url}
          width="100%"
          height="100%"
          playsinline
        />
        {/* </div> */}
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
