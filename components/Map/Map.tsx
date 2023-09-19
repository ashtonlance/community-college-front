import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import { useState, memo, useCallback } from 'react'

const center = {
  lat: -3.745,
  lng: -38.523,
}
const containerStyle = {
  width: '100%',
  height: '450px',
  borderRadius: '12px',
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
    <div className="w-full px-[100px] pb-[60px]">
      <MapInternal
        mapContainerStyle={containerStyle}
        center={center}
        zoom={8}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </MapInternal>
    </div>
  ) : (
    <></>
  )
}

export default memo(Map)
