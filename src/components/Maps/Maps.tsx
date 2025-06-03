import 'maplibre-gl/dist/maplibre-gl.css'
import maplibregl from 'maplibre-gl'
import { useEffect, useRef } from 'react'

export interface MapMarker {
  longitude: number;
  latitude: number;
  title: string;
  action: () => void;
}

interface Props {
  width?: string;
  height?: string;
  longitude: number;
  latitude: number;
  zoom?: number;
  marker?: boolean;
  mapMarkers?: MapMarker[];
  tapOutAction?: () => void;
  localLotationAction?: () => void;
}

const Maps = ({
  longitude, latitude, zoom=13, marker=false, mapMarkers=[], width='100%', height='90vh',
  localLotationAction = () => {}, tapOutAction = () => {}
}: Props) => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<maplibregl.Map>(null)

  useEffect(() => {
    if (!map.current && mapContainer.current) {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: 'https://api.maptiler.com/maps/streets/style.json?key=b21za9jf7n3jogSzDnn3', // Estilo gratuito
        center: [longitude, latitude], // [lng, lat]
        zoom: zoom,
      });

      // Marcador de ubicación actual
      const localLocationMarker = new maplibregl.Marker()
        .setLngLat([longitude, latitude]) // Slightly offset markers
        .setPopup(new maplibregl.Popup().setHTML("Ubicación actual"))
        .addTo(map.current)
      localLocationMarker.getElement().addEventListener('click', () => {
        if (marker) {
          map.current?.flyTo({
            center: [longitude, latitude],
            zoom: zoom,
          });
          localLotationAction();
        }
      });

      // Otras ubicaciones a mostrar en el mapa
      if(marker) {
        mapMarkers.forEach((mapMarker: MapMarker, index) => {
          const newMarker = new maplibregl.Marker({
            color: 'red'
          })
            .setLngLat([mapMarker.longitude + (index * 0.001), mapMarker.latitude + (index * 0.001)]) // Slightly offset markers
            .setPopup(new maplibregl.Popup().setHTML(mapMarker.title))
            .addTo(map.current!);

          newMarker.getElement().addEventListener('click', () => {
            mapMarker.action();
          });
        });

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