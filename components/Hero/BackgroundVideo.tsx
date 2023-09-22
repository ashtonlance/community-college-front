import dynamic from 'next/dynamic'
import { gql, useQuery } from "@apollo/client";

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })

const GET_BACKGROUND_VIDEO_FILE = gql`
  query GetVideoURLFromID($databaseId: ID!) {
    mediaItem(id: $databaseId, idType: DATABASE_ID) {
      id
      link
    }
  }
`

export const BackgroundVideoURL = ({url}:{url:string}) => {
  return (
    <div className="absolute w-full">
      <div className="relative pt-[66.00%]">
        <ReactPlayer
          muted
          playing
          loop
          controls={false}
          className="absolute left-0 top-0"
          url={url}
          width="100%"
          height="100%"
        />
      </div>
    </div>
  )
}

export const BackgroundVideoFile = ({databaseId}) => {
  const { loading, error, data } = useQuery(GET_BACKGROUND_VIDEO_FILE, {variables: { databaseId },});

  if (loading) {
    return
  }
  if (error) {
    console.log({ error })
  }
  if (data) {
    const url = data?.mediaItem?.link;
    return <BackgroundVideoURL url={url} />
  }
}
