import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const MapComponent = () => {
  const markersRef = useRef([]);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC4phZIKyQkzkILaFQkIgWv1-5bFQCj9UQ&callback=initMap`;
      script.async = true;
      document.head.appendChild(script);
    };

    window.initMap = () => {
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: -12.135069029870728, lng: -77.02209818806087 }, // Center the map to the new location
        zoom: 17,
        disableDefaultUI: true,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [
              { visibility: "off" }
            ]
          }
        ]
      });

      const fetchScooters = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/scooters`);
          const scooters = response.data;

          // Remove existing markers from the map
          markersRef.current.forEach(marker => marker.setMap(null));
          markersRef.current = [];

          // Add new markers to the map using Google Maps Marker
          scooters.forEach(scooter => {
            const [lng, lat] = scooter.location.replace('POINT(', '').replace(')', '').split(' ');
            const marker = new window.google.maps.Marker({
              position: { lat: parseFloat(lat), lng: parseFloat(lng) },
              map,
              title: `Scooter ${scooter.scooter_id}`,
              icon: {
                url: '/src/assets/scooter.svg',
                scaledSize: new window.google.maps.Size(30, 30) // Set the size of the SVG
              }
            });

            // Add click listener to show the scooter ID in an InfoWindow
            const infoWindow = new window.google.maps.InfoWindow({
              content: `<div style="color: black;"><strong>Id:</strong> ${scooter.scooter_id}</div>`
            });

            marker.addListener('click', () => {
              infoWindow.open(map, marker);
            });

            markersRef.current.push(marker);
          });

        } catch (error) {
          console.error('Error fetching scooters:', error);
        }
      };

      // Fetch scooters every 5 seconds
      fetchScooters();
      setInterval(fetchScooters, 5000);
    };

    if (!window.google) {
      loadGoogleMapsScript();
    } else {
      window.initMap();
    }
  }, []);

  return <div id="map" className="w-full h-full"></div>;
};

export default MapComponent;