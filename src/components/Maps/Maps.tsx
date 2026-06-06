import "maplibre-gl/dist/maplibre-gl.css";
import maplibregl from "maplibre-gl";
import {useEffect, useRef} from "react";

export interface MapMarker {
  longitude: number;
  latitude: number;
  title: string;
  action: (e) => void;
}

interface Props {
  width?: string;
  height?: string;
  longitude: number;
  latitude: number;
  zoom?: number;
  marker?: boolean;
  tapMarker?: boolean;
  mapMarkers?: MapMarker[];
  enableChangeMarkerPosition?: boolean;
  tapOutAction?: (e) => void;
  localLotationAction?: (e) => void;
}

const Maps = ({
  longitude,
  latitude,
  zoom = 13,
  marker = false,
  mapMarkers = [],
  width = "100%",
  height = "90vh",
  enableChangeMarkerPosition = true,
  tapMarker = false,
  localLotationAction = () => {},
  tapOutAction = () => {},
}: Props) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map>(null);
  const localMarker = useRef<maplibregl.Marker>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const othersMarkersRef = useRef<maplibregl.Marker[]>([]);

  useEffect(() => {
    if (!map.current && mapContainer.current) {
      const mapToken = import.meta.env.VITE_MAPBOX_TOKEN ?? "";
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: `https://api.maptiler.com/maps/streets/style.json?key=${mapToken}`, // Estilo gratuito
        center: [longitude, latitude], // [lng, lat]
        zoom: zoom,
      });

      // Marcador de ubicación actual
      const localLocationMarker = new maplibregl.Marker()
        .setLngLat([longitude, latitude]) // Slightly offset markers
        .setPopup(new maplibregl.Popup().setHTML("Ubicación actual"))
        .addTo(map.current);
      localMarker.current = localLocationMarker;

      // Evento para manejar el clic en el marcador de ubicación actual
      localLocationMarker.getElement().addEventListener("click", (e) => {
        if (marker) {
          map.current?.flyTo({
            center: [longitude, latitude],
            zoom: zoom,
          });
        }
        localLotationAction(e);
      });

      map.current.on("click", (e) => {
        tapOutAction(e);
        if (tapMarker && enableChangeMarkerPosition) {
          markersRef.current.forEach((marker) => marker.remove());

          const newMarker = new maplibregl.Marker({
            color: "red",
          })
            .setLngLat([e.lngLat.lng, e.lngLat.lat])
            .setPopup(new maplibregl.Popup().setHTML("Ubicación seleccionada"))
            .addTo(map.current!);
          markersRef.current.push(newMarker);
        }
      });

      // Otras ubicaciones a mostrar en el mapa
      if (marker) {
        mapMarkers.forEach((mapMarker: MapMarker, index) => {
          // console.log(mapMarker);
          const newMarker = new maplibregl.Marker({
            color: "red",
          })
            .setLngLat([
              !isNaN(mapMarker.longitude) && !isNaN(index)
                ? mapMarker.longitude + index * 0.001
                : 0,
              !isNaN(mapMarker.latitude) && !isNaN(index)
                ? mapMarker.latitude + index * 0.001
                : 0,
            ]) // Slightly offset markers
            .setPopup(new maplibregl.Popup().setHTML(mapMarker.title))
            .addTo(map.current!);

          othersMarkersRef.current.push(newMarker);
          newMarker.getElement().addEventListener("click", (e) => {
            mapMarker.action(e);
          });
        });
      }
    }
  }, []);

  useEffect(() => {
    if (!map.current) return;

    // Limpiar marcadores anteriores
    othersMarkersRef.current.forEach((marker) => marker.remove());
    othersMarkersRef.current = [];

    // Agregar nuevos marcadores
    if (marker && mapMarkers?.length) {
      mapMarkers.forEach((mapMarker: MapMarker, index) => {
        const newMarker = new maplibregl.Marker({color: "red"})
          .setLngLat([
            !isNaN(mapMarker.longitude) && !isNaN(index)
              ? Number(mapMarker.longitude) + Number(index) * 0.001
              : 0,
            !isNaN(mapMarker.latitude) && !isNaN(index)
              ? Number(mapMarker.latitude) + Number(index) * 0.001
              : 0,
          ])
          .setPopup(new maplibregl.Popup().setHTML(mapMarker.title))
          .addTo(map.current!);

        othersMarkersRef.current.push(newMarker);
        newMarker.getElement().addEventListener("click", (e) => {
          mapMarker.action(e);
        });
      });
    }
  }, [mapMarkers, marker]);

  return (
    <div
      ref={mapContainer}
      className='rounded-lg shadow-neutral-400 shadow'
      style={{width, height}}
    />
  );
};

export default Maps;
