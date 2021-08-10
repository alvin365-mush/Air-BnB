import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import getCenter from "geolib/es/getCenter";

function Map({ searchResults }) {
  const [selectedLoc, setSelectedLoc] = useState({});
  const cordinates = searchResults.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));
  const center = getCenter(cordinates);
  //console.log(center);

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 8,
  });
  return (
    <ReactMapGL
      mapStyle="mapbox://styles/alvinmush/cks6f590h041z18p1k5rbfef9"
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={(viewport) => setViewport(viewport)}
    >
      {searchResults.map((result) => (
        <div key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p
              onClick={() => setSelectedLoc(result)}
              className="cursor-pointer text-2xl animate-bounce"
              aria-label="push-pin"
            >
              👇{" "}
            </p>
          </Marker>
          {selectedLoc.long === result.long ? (
            <Popup onClose={() => setSelectedLoc({})} closeOnClick={true}>
              {result.title} latitude={result.lat} longitude=
              {result.longitude}
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
}

export default Map;
