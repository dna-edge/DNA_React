import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import config from './../../../../config';
import markerPng from './../../../../../public/images/marker.png';
import homePng from './../../../../../public/images/home.png';
import styles from './styles.css';

class MapComponent extends Component {
  componentDidUpdate() {
      if (localStorage.getItem('coord')) {
      const position = JSON.parse(localStorage.getItem('coord'));
      const CURRENT_POSITION = new window.naver.maps.LatLng(position.lat, position.lng);

      var locationBtnHtml = `<a href="" class="btn_mylct"><img class="map-home-button" src="${homePng}"/></a>`;
      var map = new window.naver.maps.Map('map', {
          center: CURRENT_POSITION, //지도의 초기 중심 좌표
          zoom: 11, //지도의 초기 줌 레벨
          minZoom: 1, //지도의 최소 줌 레벨
          zoomControl: true, //줌 컨트롤의 표시 여부
          zoomControlOptions: { //줌 컨트롤의 옵션
              position: window.naver.maps.Position.TOP_RIGHT
          }
      });

      var urlMarker = new window.naver.maps.Marker({
          position: CURRENT_POSITION,
          map: map,
          title: 'urlMarker',
          // icon: markerPng,
          animation: window.naver.maps.Animation.BOUNCE
      });

      var circle = new window.naver.maps.Circle({
          map: map,
          center: CURRENT_POSITION,
          radius: 100,
          fillColor: 'crimson',
          fillOpacity: 0.3,
          strokeColor: 'black',
          strokeOpacity: 0.5
      });

      //customControl 객체를 이용하기
    var customControl = new window.naver.maps.CustomControl(locationBtnHtml, {
        position: window.naver.maps.Position.TOP_LEFT
    });
    var domEventListener = window.naver.maps.Event.addDOMListener(customControl.getElement(), 'click', function() {
        map.setCenter(new window.naver.maps.LatLng(position.lat, position.lng));
    });
    customControl.setMap(map);


    }
  }

  render() {
    return (
      <div id="map" className="geo-chat-map" />
    );
  }
};

export default MapComponent;
