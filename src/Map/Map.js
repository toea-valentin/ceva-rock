import * as React from 'react';
import {useState, useCallback} from 'react';
import MapGL, {
  Popup,
  Marker,
  NavigationControl,
  ScaleControl,
  GeolocateControl
} from 'react-map-gl';
import Pin from './Pin';
import Pins from './Pins';
import OverlayPanel from '../OverlayPanel';

const MAPBOX_TOKEN = 'pk.eyJ1IjoibW9zdGFyZTEiLCJhIjoiY2tsbm8xZTM1MGwyOTJubjNnNXY2cmtwbiJ9.qqECwkcMZ1-2ZRYCeQvqfw';

const geolocateStyle = {
  top: 0,
  left: 0,
  padding: '10px'
};

const fullscreenControlStyle = {
  top: 36,
  left: 0,
  padding: '10px'
};

const navStyle = {
  top: 72,
  left: 0,
  padding: '10px'
};

const scaleControlStyle = {
  bottom: 36,
  left: 0,
  padding: '10px'
};

const PLACE = {
    longitude: 26.079038524165203, 
    latitude: 44.445969301380636
};

function Map(props) {
  const apartments = props.apartments;
  const newViewPort = props.myMarker;

  const [viewport, setViewport] = useState({
    latitude: 44.4268,
    longitude: 26.1025,
    zoom: 10,
    bearing: 0,
    pitch: 0
  });

  const [displayOverlay, setDisplayOverlay] = React.useState(null);

  const [marker, setMarker] = useState({
    latitude: PLACE.latitude,
    longitude: PLACE.longitude
  });
  const [events, logEvents] = useState({});

  const [apInfo, setApInfo] = useState(null);

  const onMarkerDragStart = useCallback(event => {
    logEvents(_events => ({..._events, onDragStart: event.lngLat}));
  }, []);

  const onMarkerDrag = useCallback(event => {
    logEvents(_events => ({..._events, onDrag: event.lngLat}));
  }, []);

  const onMarkerDragEnd = useCallback(event => {
    logEvents(_events => ({..._events, onDragEnd: event.lngLat}));
    setMarker({
      longitude: event.lngLat[0],
      latitude: event.lngLat[1]
    });

    props.setCoord([event.lngLat[0],event.lngLat[1]]);
    
  }, []);

  React.useState(() => {
    console.log(newViewPort);
    if (newViewPort && newViewPort.length !== 0) {
      setViewport({
        latitude: newViewPort[1],
        longitude: newViewPort[0],
        zoom: 11,
        bearing: 0,
        pitch: 0
      });
      setMarker({
        latitude: newViewPort[1],
        longitude: newViewPort[0]
      })
    }
  });
  
  return (
    <>
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/bright-v8"
        onViewportChange={setViewport}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        //onClick={(event) => updateCoordOnClick(event)}
      >
        {props.showResults === false ?
          <Marker
            longitude={marker.longitude}
            latitude={marker.latitude}
            offsetTop={-20}
            offsetLeft={-10}
            draggable
            onDragStart={onMarkerDragStart}
            onDrag={onMarkerDrag}
            onDragEnd={onMarkerDragEnd}
          >
            <Pin size={40}/>
          </Marker>
          :<Pins data={apartments} setDisplay={setDisplayOverlay} onClick={setApInfo} />
        }
        <GeolocateControl style={geolocateStyle} />
        <NavigationControl style={navStyle} />
        <ScaleControl style={scaleControlStyle} />
      </MapGL>

      <OverlayPanel display={displayOverlay} setDisplay={setDisplayOverlay}  data={apInfo}/>
    </>
  );
}

export default Map;