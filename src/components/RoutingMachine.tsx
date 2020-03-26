import L, { LatLngTuple } from "leaflet";
import "leaflet-routing-machine";
import { Map, MapLayer, MapLayerProps, withLeaflet } from "react-leaflet";
import icon from 'leaflet/dist/images/marker-icon.png'
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

export interface RoutingProps extends MapLayerProps {
    map: Map,
    coords: LatLngTuple
}

class Routing extends MapLayer<RoutingProps> {
    createLeafletElement() {
        const { map, coords } = this.props;

        let leafletElement = L.Routing.control({
            showAlternatives: true,
            lineOptions: { styles: [{ color: '#242c81', weight: 5 }] },
            fitSelectedRoutes: false,
            altLineOptions: { styles: [{ color: '#ed6852', weight: 9 }] },
            routeWhileDragging: true,
            waypoints: [
                L.latLng(27.4833, -109.9333),
                L.latLng(27.4389, -109.9353)
            ]
        }).addTo(map.leafletElement);

        const defaultIcon = new L.Icon({
            iconUrl: icon,
            iconRetinaUrl: iconRetina,
            iconAnchor: [12, 41],
            shadowUrl: iconShadow,
        });

        L.marker(coords, { icon: defaultIcon }).addTo(map.leafletElement);

        return leafletElement.getPlan();
    }
}
export default withLeaflet(Routing);