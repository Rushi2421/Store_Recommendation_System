import React, { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./MapView.css";
import * as turf from "@turf/turf";

const MapView = ({
  geojsonData,
  userLocation,
  zoomTargetStore,
  selectedStoreForRoute,
  showRouteTrigger,
}) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const popupRef = useRef(null);
  const ORS_KEY = import.meta.env.VITE_ORS_KEY;
  const [raigadBoundary, setRaigadBoundary] = useState(null);
  const storeMarkersRef = useRef([]);

  useEffect(() => {
    fetch("/geojson/raigad_district.geojson")
      .then((res) => res.json())
      .then(setRaigadBoundary)
      .catch((err) => console.error("Error loading district:", err));
  }, []);

  useEffect(() => {
    if (!raigadBoundary || !geojsonData || !userLocation) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: "https://api.maptiler.com/maps/streets-v2/style.json?key=2Wi8frgrnwf8N727e8Kp",
      center: [userLocation.lon, userLocation.lat],
      zoom: 9,
    });

    mapRef.current = map;
    map.addControl(new maplibregl.NavigationControl(), "top-right");

    map.on("load", () => {
      map.addSource("raigad", { type: "geojson", data: raigadBoundary });
      map.addLayer({
        id: "raigad-line",
        type: "line",
        source: "raigad",
        paint: { "line-color": "#ff7b00", "line-width": 2 },
      });

      // Add custom icon markers for stores
      geojsonData.features.forEach((feature) => {
        const { store_type, name, address, phone, rating, city, opening_time } = feature.properties;
        const [lon, lat] = feature.geometry.coordinates;

        const iconPath = `/assets/markers/${store_type.toLowerCase().replace(/\s+/g, "")}.svg`;

        const el = document.createElement("img");
        el.src = iconPath;
        el.className = "custom-marker";
        el.style.width = "36px";
        el.style.height = "36px";

        const marker = new maplibregl.Marker(el)
          .setLngLat([lon, lat])
          .setPopup(
            new maplibregl.Popup({ offset: 15 }).setHTML(`
              <div class="popup-container">
                <h3>${name}</h3>
                <p><strong>📍</strong> ${address}</p>
                <p><strong>📞</strong> ${phone}</p>
                <p><strong>⭐</strong> ${rating || "N/A"}</p>
                <p><strong>🏙️</strong> ${city}</p>
                <p><strong>🕒</strong> ${opening_time}</p>
              </div>
            `)
          )
          .addTo(map);

        storeMarkersRef.current.push(marker);
      });

      new maplibregl.Marker({ color: "#ff4e4e" })
        .setLngLat([userLocation.lon, userLocation.lat])
        .setPopup(new maplibregl.Popup().setText("📍 Your Location"))
        .addTo(map);

      const bounds = turf.bbox(raigadBoundary);
      map.fitBounds(bounds, { padding: 40 });
    });

    return () => {
      map.remove();
      storeMarkersRef.current.forEach((marker) => marker.remove());
      storeMarkersRef.current = [];
    };
  }, [raigadBoundary, geojsonData, userLocation]);

  useEffect(() => {
    if (zoomTargetStore && mapRef.current) {
      if (popupRef.current) popupRef.current.remove();

      mapRef.current.flyTo({
        center: [zoomTargetStore.longitude, zoomTargetStore.latitude],
        zoom: 14,
        speed: 1.4,
        curve: 1.5,
        essential: true,
      });

      const popup = new maplibregl.Popup({ offset: 15 })
        .setLngLat([zoomTargetStore.longitude, zoomTargetStore.latitude])
        .setHTML(`
          <div class="popup-container">
            <h3>${zoomTargetStore.properties.name}</h3>
            <p><strong>📍</strong> ${zoomTargetStore.properties.address}</p>
            <p><strong>📞</strong> ${zoomTargetStore.properties.phone}</p>
            <p><strong>⭐</strong> ${zoomTargetStore.properties.rating || "N/A"}</p>
            <p><strong>🏙️</strong> ${zoomTargetStore.properties.city}</p>
            <p><strong>🕒</strong> ${zoomTargetStore.properties.opening_time}</p>
          </div>
        `)
        .addTo(mapRef.current);

      popupRef.current = popup;
    }
  }, [zoomTargetStore]);

  useEffect(() => {
    const fetchRoute = async () => {
      if (!selectedStoreForRoute || !mapRef.current) return;

      const start = `${userLocation.lon},${userLocation.lat}`;
      const end = `${selectedStoreForRoute.longitude},${selectedStoreForRoute.latitude}`;
      const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${ORS_KEY}&start=${start}&end=${end}`;

      try {
        const res = await fetch(url);
        const data = await res.json();
        const route = {
          type: "Feature",
          geometry: data.features[0].geometry,
        };

        const summary = data.features[0].properties.summary;
        const distance = summary.distance / 1000;
        const duration = summary.duration / 60;

        if (mapRef.current.getSource("route")) {
          mapRef.current.getSource("route").setData(route);
        } else {
          mapRef.current.addSource("route", { type: "geojson", data: route });
          mapRef.current.addLayer({
            id: "route-line",
            type: "line",
            source: "route",
            paint: {
              "line-color": "#f44236",
              "line-width": 4,
            },
          });
        }

        const bounds = turf.bbox(route);
        mapRef.current.fitBounds(bounds, { padding: 60 });

        if (popupRef.current) popupRef.current.remove();

        const popup = new maplibregl.Popup({ offset: 15 })
          .setLngLat([selectedStoreForRoute.longitude, selectedStoreForRoute.latitude])
          .setHTML(`
            <div class="popup-container">
              <h3>${selectedStoreForRoute.properties.name}</h3>
              <p><strong>📍</strong> ${selectedStoreForRoute.properties.address}</p>
              <p><strong>📞</strong> ${selectedStoreForRoute.properties.phone}</p>
              <p><strong>⭐</strong> ${selectedStoreForRoute.properties.rating || "N/A"}</p>
              <p><strong>📏</strong> ${distance.toFixed(2)} km</p>
              <p><strong>⏱️</strong> ${duration.toFixed(1)} min</p>
            </div>
          `)
          .addTo(mapRef.current);

        popupRef.current = popup;
      } catch (err) {
        console.error("❌ Failed to fetch ORS route:", err);
      }
    };

    fetchRoute();
  }, [showRouteTrigger]);

  return <div className="maplibre-container" ref={mapContainerRef} />;
};

export default MapView;
