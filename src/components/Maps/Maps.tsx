import 'maplibre-gl/dist/maplibre-gl.css'
import maplibregl from 'maplibre-gl'
import { useEffect, useRef } from 'react'

interface Props {
  longitude: number;
  latitude: number;
  zoom?: number;
  marker?: boolean;
  title?: string;
}

const Maps = ({longitude, latitude, zoom=13, marker=false, title=''}: Props) => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<maplibregl.Map>(null)

  useEffect(() => {
    if (!map.current && mapContainer.current) {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: 'https://api.maptiler.com/maps/streets/style.json?key=b21za9jf7n3jogSzDnn3', // Estilo gratuito
        center: [longitude, latitude], // [lng, lat]
        zoom: zoom,
      })

      if(marker) {
        new maplibregl.Marker()
          .setLngLat([longitude, latitude])
          .setPopup(new maplibregl.Popup().setHTML(title))
          .addTo(map.current)
      }
    }
  }, [])

  return (
    <div
      ref={mapContainer}
      style={{ width: '100vw', height: '100vh' }}
    />
  )
};

export default Maps;