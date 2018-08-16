import React from 'react';
import NaverMap from 'react-naver-map'

import config from './../../config';

const MapComponent = () => {
  return (
    <NaverMap
      clientId={config.NAVER_CLIENT_ID}
      style={{width:'500px', height:'500px'}}
      initialPosition={{lat:37.3595704, lng:127.105399}}
      initialZoom={8}
      initialBounds={{   // When you provide initialBounds, it will ignores initialPosition and initialZoom
        south:35.9732265, west:129.2055044,
        north:36.1130996, east:129.4883056
      }}
      submodules={['drawing','geocoder']}
    />
  );
};

export default MapComponent;
