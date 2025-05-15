import 'maplibre-gl/dist/maplibre-gl.css'
import maplibregl from 'maplibre-gl'
import { useEffect, useRef } from 'react'

interface Props {
  width?: string;
  height?: string;
  longitude: number;
  latitude: number;
  zoom?: number;
  marker?: boolean;
  title?: string;
}

const Maps = ({longitude, latitude, zoom=13, marker=false, title='', width='100%', height='90vh'}: Props) => {
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
      className='rounded-lg shadow-neutral-400 shadow'
      style={{ width, height }}
    />
  )
};

export default Maps;