import React from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const zoom = 11;
const center = {
  lat: 53.782928,
  lng: -1.541150
};
 
function Map() {
  const [map, setMap] = React.useState(null)
 
  const onLoad = React.useCallback(function callback(map) {
    setMap(map)
  }, [])
 
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])
 
  return (
    <LoadScript
      //googleMapsApiKey="AIzaSyCXrPoPQkdQCn9GNTtpRRopAdqPRntjzNU"
    >
      <GoogleMap
        id='map'
        center={center}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { <Marker position={center} onClick={null} /> }
        <></>
      </GoogleMap>
    </LoadScript>
  )
}
 
export default React.memo(Map)