import React, { useEffect, useState } from 'react';
import loadScript from 'load-script';

const MapComponent = ({ onLocationSelect }) => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [markersData, setMarkersData] = useState([]);

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=AIzaSyCbb0RzFNgKvDIlJ4FMRA8FoTFXlzgPWxk&libraries=places`,
      (err) => {
        if (err) {
          console.error('Error loading Google Maps API', err);
          return;
        }
        initMap();
      }
    );
  }, []);

  const initMap = async () => {
    const { Map } = await window.google.maps.importLibrary('maps');
    const { AdvancedMarkerElement } = await window.google.maps.importLibrary('marker');

    const mapInstance = new Map(document.getElementById('map'), {
      center: new window.google.maps.LatLng(8.536795787419491, 76.88320871823498),
      zoom: 16,
      mapId: 'DEMO_MAP_ID',
    });

    setMap(mapInstance);

    const iconBase = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/';
    const icons = {
      info: {
        icon: iconBase + 'info-i_maps.png',
      },
    };

    const addMarkerToMap = (latLng, mapInstance, incidentData) => {
      const iconImage = document.createElement('img');
      iconImage.src = icons['info'].icon;

      const newMarker = new AdvancedMarkerElement({
        map: mapInstance,
        position: latLng,
        content: iconImage,
      });

      // Create the InfoWindow content using the incident data
      const infoWindowContent = `
        <div>
          <strong>Contact Name:</strong> ${incidentData.contactName}<br/>
          <strong>Location:</strong> ${incidentData.location}<br/>
          <strong>Phone:</strong> ${incidentData.contactPhone}<br/>
          <strong>Description:</strong> ${incidentData.description}<br/>
          <strong>Type of Incident:</strong> ${incidentData.typeOfIncident}<br/>
          <strong>Status:</strong> ${incidentData.status}<br/>
          <strong>City:</strong> ${incidentData.city}<br/>
          <strong>Reported At:</strong> ${new Date(incidentData.reportedAt).toLocaleString()}<br/>
          <img src="${incidentData.photoPath}" alt="Incident Photo" style="width: 100px; height: auto;"/><br/>
          <a href="${incidentData.mapLink}" target="_blank">View on Map</a>
        </div>
      `;

      const infoWindow = new window.google.maps.InfoWindow({
        content: infoWindowContent,
      });

      // Attach the InfoWindow to the marker
      newMarker.addListener('click', () => {
        infoWindow.open(mapInstance, newMarker);
      });

      setMarker(newMarker);
    };

    // Load saved markers from database and display the infoWindow with details
    try {
      const response = await fetch("http://localhost:9999/api/incident/reports");
      if (response.ok) {
        const data = await response.json();
        setMarkersData(data); // Set the markers data in state

        data.forEach((incident) => {
          const latLng = new window.google.maps.LatLng(incident.latitude, incident.longitude);
          // Use the already fetched incident data to display the infoWindowContent
          addMarkerToMap(latLng, mapInstance, incident);
        });
      } else {
        console.error('Failed to fetch markers from the database:', response.status);
      }
    } catch (error) {
      console.error('Error fetching markers from the database:', error);
    }

    const addMarker = async (event) => {
      const latLng = event.latLng;

      if (marker) {
        marker.setMap(null);
      }

      setMarker(null); // Reset marker state

      const newMarker = new window.google.maps.Marker({
        position: latLng,
        map: mapInstance,
        icon: icons['info'].icon,
      });

      setMarker(newMarker);

      // Call the onLocationSelect prop function to update latitude and longitude in the form
      onLocationSelect(latLng.lat(), latLng.lng());
    };

    mapInstance.addListener('click', addMarker);
  };

  useEffect(() => {
    return () => {
      const mapElement = document.getElementById('map');
      if (mapElement) {
        mapElement.innerHTML = '';
      }
    };
  }, []);

  return (
    <div>
      <div id="map" style={{ height: '280px', width: '100%' }} />
      Reported Incidents
    </div>
  );
};

export default MapComponent;
