
import React, { useEffect, useState } from 'react';
import loadScript from 'load-script';

const MapComponent = ({ onLocationSelect }) => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [currentValue, setCurrentValue] = useState(32);
  let count=0;

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

    const addMarkerToMap = (latLng, mapInstance, incidentId) => {
      const iconImage = document.createElement('img');
      iconImage.src = icons['info'].icon;

      if (marker) {
        marker.setMap(null);
      }

      const newMarker = new AdvancedMarkerElement({
        map: mapInstance,
        position: latLng,
        content: iconImage,
      });

      newMarker.addListener('click', async () => {
        try {
          const response = await fetch(`http://localhost:9999/api/incident/report/${incidentId}`);
          if (response.ok) {
            const incidentData = await response.json();
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
            infoWindow.open(mapInstance, newMarker);
          } else {
            console.error('Failed to fetch incident details:', response.status);
          }
        } catch (error) {
          console.error('Error fetching incident details:', error);
        }
      });

      setMarker(newMarker);
    };

    // Load saved markers from localStorage
    const savedMarkers = JSON.parse(localStorage.getItem('markers')) || [];
    savedMarkers.forEach(({ lat, lng, incidentId }) => {
      const latLng = new window.google.maps.LatLng(lat, lng);
      addMarkerToMap(latLng, mapInstance, incidentId);
    });

    const addMarker = async (event) => {
      const latLng = event.latLng;

      // Generate new incidentId (this could be from a server in a real application)
      const newIncidentId =  count++;

      const newFeature = {
        position: latLng,
        type: 'info',
        incidentId: newIncidentId,
      };

      if (marker) {
        marker.setMap(null);
      }

      setMarker(null); // Reset marker state

      const newMarker = new window.google.maps.Marker({
        position: latLng,
        map: mapInstance,
        icon: icons['info'].icon,
      });

      newMarker.addListener('click', async () => {
        try {
          const response = await fetch(`http://localhost:9999/api/incident/report/${newIncidentId}`);
          if (response.ok) {
            const incidentData = await response.json();
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
            infoWindow.open(mapInstance, newMarker);
          } else {
            console.error('Failed to fetch incident details:', response.status);
          }
        } catch (error) {
          console.error('Error fetching incident details:', error);
        }
      });

      setMarker(newMarker);

      // Save marker to localStorage
      const currentMarkers = JSON.parse(localStorage.getItem('markers')) || [];
      currentMarkers.push({ lat: latLng.lat(), lng: latLng.lng(), incidentId: newIncidentId });
      localStorage.setItem('markers', JSON.stringify(currentMarkers));

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


