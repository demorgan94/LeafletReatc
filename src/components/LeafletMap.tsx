import React, { Component } from 'react'
import { Map, TileLayer } from 'react-leaflet'
import { LatLngTuple } from 'leaflet'
import Routing from './RoutingMachine'
import 'leaflet-routing-machine'

type State = {
    lat: number,
    lng: number,
    zoom: number
    isMapInit: boolean
}

export default class LeafletMap extends Component<{}, State> {
    map!: Map;
    state = {
        lat: 27.4833,
        lng: -109.9333,
        zoom: 14,
        isMapInit: false
    };

    saveMap = (map: Map) => {
        this.map = map;
        this.setState({
            isMapInit: true
        });
    };

    render() {
        const position: LatLngTuple = [this.state.lat, this.state.lng];

        return (
            <Map id="mapId" center={position} zoom={this.state.zoom} ref={this.saveMap}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                />
                {this.state.isMapInit && <Routing map={this.map} coords={position} />}
            </Map>
        );
    }
}

