import React, { SuspenseProps } from 'react';
import ReactDOM from 'react-dom';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default class Map extends React.Component {
  map?: L.Map;
  componentDidMount() {
    var map = (this.map = L.map(ReactDOM.findDOMNode(this) as HTMLElement, {
      minZoom: 2,
      maxZoom: 20,
      layers: [
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
        })
      ],
      attributionControl: false
    }));

    map.on('click', this.onMapClick);
    map.fitWorld();
  }

  componentWillUnmount() {
    if (!this.map) return;
    this.map.off('click', this.onMapClick);
    this.map = undefined;
  }

  onMapClick = (ev: any) => {
    var latlng = (this.map as L.Map).mouseEventToLatLng(ev.originalEvent);
    console.log(latlng.lat + ', ' + latlng.lng);
  };

  render() {
    return <div className="map" />;
  }
}
