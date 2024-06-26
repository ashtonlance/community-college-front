import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  InfoWindowF,
} from '@react-google-maps/api'
import { useState, memo, useCallback, useMemo } from 'react'
import { FadeIn } from '@/components/FadeIn'

const MapInternal = GoogleMap as any

export const Map = ({ coordinates = [], zoom = 7, isEmbed = false }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_API_KEY,
  })

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      clickableIcons: true,
      scrollwheel: false,
      streetViewControl: false,
    }),
    []
  )

  const mapCenter = useMemo(() => ({ lat: 35.782169, lng: -80.793457 }), [])

  const [map, setMap] = useState(null)

  const onLoad = useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    // const bounds = new window.google.maps.LatLngBounds(center)
    // map.fitBounds(bounds)
    // setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  const [activeMarker, setActiveMarker] = useState(null)

  const handleActiveMarker = marker => {
    if (marker === activeMarker) {
      return
    }
    setActiveMarker(marker)
  }

  const containerStyle = {
    width: '100%',
    height: !isEmbed ? '450px' : '250px',
    borderRadius: '12px',
  }

  return isLoaded ? (
    <FadeIn>
      <div
        className={`w-full bg-grey ${
          !isEmbed
            ? 'px-[100px] pb-[60px] md:px-[60px] md:py-[40px] sm:px-5 sm:pt-0'
            : null
        }`}
      >
        <MapInternal
          mapContainerStyle={containerStyle}
          center={!isEmbed ? mapCenter : coordinates[0]}
          zoom={zoom}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={mapOptions}
        >
          {coordinates.map((coordinate, index) => {
            return (
              <MarkerF
                key={index}
                position={{
                  lat: coordinate.lat,
                  lng: coordinate.lng,
                }}
                icon={'/marker.svg'}
                onClick={() => handleActiveMarker(index)}
              >
                {activeMarker === index ? (
                  <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                    <div className="flex max-w-[250px] flex-col gap-2 p-3">
                      <a href={coordinate?.uri} className="h5 md:text-[16px] text-[18px] font-bold tracking-[-0.16px] capitalize">{coordinate?.name}</a>
                      <div className="body-regular max-w-[75%] text-[14px] leading-[140%] text-darkGrey">
                        {coordinate?.streetAddress.replace(", USA", "")}
                      </div>
                      <a
                        href={`tel:${coordinate?.phoneNumber}`}
                        className="body-regular text-[14px] leading-[140%] text-darkGrey hover:text-navy"
                      >
                        {coordinate?.phoneNumber}
                      </a>
                    </div>
                  </InfoWindowF>
                ) : null}
              </MarkerF>
            )
          })}
        </MapInternal>
      </div>
    </FadeIn>
  ) : (
    <></>
  )
}

export default memo(Map)
