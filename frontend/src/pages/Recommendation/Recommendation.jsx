import React, { useEffect, useState } from "react";
import "./Recommendation.css";
import API from "../../utils/api";
import MapView from "../../components/MapLibre/MapView";
import { useUser } from "../../context/UserContext";
import { useLocation } from "react-router-dom";

const Recommendation = () => {
  const { user } = useUser();
  const location = useLocation();
  const storeType = new URLSearchParams(location.search).get("storeType");

  const [userLocation, setUserLocation] = useState(null);
  const [geojsonData, setGeojsonData] = useState(null);
  const [zoomTargetStore, setZoomTargetStore] = useState(null);
  const [selectedStoreForRoute, setSelectedStoreForRoute] = useState(null);
  const [showRouteTrigger, setShowRouteTrigger] = useState(false);

  useEffect(() => {
    const lat = 18.1698;
    const lon = 73.3385;
    setUserLocation({ lat, lon });

    const fetchData = async () => {
      if (user && storeType) {
        try {
          const res = await API.post("/store/recommend", {
            userId: user.id,
            latitude: lat,
            longitude: lon,
            storeType,
          });
          setGeojsonData(res.data.geojson);
        } catch (err) {
          console.error("❌ Error fetching recommendations:", err);
        }
      }
    };

    fetchData();
  }, [storeType, user]);

  const handleStoreClick = (store) => {
    setZoomTargetStore({
      latitude: store.geometry.coordinates[1],
      longitude: store.geometry.coordinates[0],
      properties: store.properties,
    });
  };

  const handleShowRoute = (store) => {
    setSelectedStoreForRoute({
      latitude: store.geometry.coordinates[1],
      longitude: store.geometry.coordinates[0],
      properties: store.properties,
    });
    setShowRouteTrigger((prev) => !prev);
  };

  return (
    <div className="recommendation-page">
      <div className="store-list">
        <h2>Recommended {storeType}</h2>
        {geojsonData?.features?.length > 0 ? (
          geojsonData.features.map((store, idx) => (
            <div className="store-card" key={idx}>
              <h3
                onClick={() => handleStoreClick(store)}
                style={{ cursor: "pointer" }}
              >
                {store.properties.name}
              </h3>
              <p>{store.properties.address}</p>
              <p>
                <strong>Phone: 📞 </strong> {store.properties.phone}
              </p>
              <p>
                <strong>Rating: ⭐ </strong> {store.properties.rating || "N/A"}
              </p>
              <p>
                <strong>City: 📍 </strong> {store.properties.city}
              </p>
              <p>
                <strong>Open: 🕰️ </strong> {store.properties.opening_time}
              </p>
              <button
                className="show-route-btn"
                onClick={() => handleShowRoute(store)}
              >
                Show Route
              </button>
            </div>
          ))
        ) : (
          <p>Loading or no results.</p>
        )}
      </div>

      <div className="map-panel">
        {userLocation && geojsonData && (
          <MapView
            userLocation={userLocation}
            geojsonData={geojsonData}
            zoomTargetStore={zoomTargetStore}
            selectedStoreForRoute={selectedStoreForRoute}
            showRouteTrigger={showRouteTrigger}
          />
        )}
      </div>
    </div>
  );
};

export default Recommendation;
