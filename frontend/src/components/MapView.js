import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';
import iconUrl from './../assets/marcador-de-posicion.png';

const provider = new OpenStreetMapProvider();

const customIcon = new L.Icon({
    iconUrl,
    iconSize: [32, 32], // Tamaño del ícono
    iconAnchor: [16, 32], // Punto del ícono que estará anclado al marcador
    popupAnchor: [0, -32] // Punto desde donde se abrirá el popup relativo al ícono
  });
  
  const LocateUser = ({ setPosition }) => {
    const map = useMap();
  
    useEffect(() => {
      map.locate({ setView: true, maxZoom: 16 }).on('locationfound', (e) => {
        setPosition(e.latlng);
      });
    }, [map, setPosition]);
  
    return null;
  };
  
  const SearchBox = ({ setPosition }) => {
    const map = useMap();
  
    useEffect(() => {
      const searchControl = new GeoSearchControl({
        provider,
        style: 'bar',
        showMarker: false, // No mostrar el marcador automáticamente
        autoClose: true,
        keepResult: true,
        updateMap: false, // No actualizar el mapa automáticamente
      });
  
      map.addControl(searchControl);
  
      map.on('geosearch/showlocation', (result) => {
        if (result && result.location) {
          setPosition([result.location.y, result.location.x]);
          map.setView([result.location.y, result.location.x], 13); // Centrar el mapa en la nueva ubicación
        }
      });
  
      return () => {
        map.removeControl(searchControl);
      };
    }, [map, setPosition]);
  
    return null;
  };
  
  const MapClickHandler = ({ setPosition }) => {
    useMapEvents({
      click: (e) => {
        setPosition(e.latlng);
      },
    });
  
    return null;
  };
  
  const MapView = ({ setFormData }) => {
    const [position, setPosition] = useState(null);
  
    useEffect(() => {
      const fetchAddress = async (lat, lng) => {
        try {
          const response = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
            params: {
              format: 'json',
              lat,
              lon: lng
            }
          });
          const address = response.data.display_name;
          setFormData(prevData => ({
            ...prevData,
            lostOrFoundLocation: address,
            latitude: lat,
            longitude: lng,
          }));
        } catch (error) {
          console.error('Error fetching address:', error);
        }
      };
  
      if (position) {
        fetchAddress(position.lat, position.lng);
      }
    }, [position, setFormData]);
  
    return (
      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '400px', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {position && <Marker position={position} icon={customIcon}></Marker>}
        <LocateUser setPosition={setPosition} />
        <SearchBox setPosition={setPosition} />
        <MapClickHandler setPosition={setPosition} />
      </MapContainer>
    );
  };
  
  export default MapView;