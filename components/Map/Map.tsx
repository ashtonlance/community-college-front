import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import { useState, memo, useCallback } from 'react'

const center = {
  lat: -3.745,
  lng: -38.523,
}
const containerStyle = {
  width: '400px',
  height: '400px',
}

const MapInternal = GoogleMap as any

export const Map = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_API_KEY,
  })

  const [map, setMap] = useState(null)

  const onLoad = useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center)
    map.fitBounds(bounds)

    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <MapInternal
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </MapInternal>
  ) : (
    <></>
  )
}

export default memo(Map)
