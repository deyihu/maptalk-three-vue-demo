// import HelloWorld from './components/HelloWorld.vue';
import Map from './components/Map.vue';
import * as maptalks from 'maptalks';

export default {

    name: 'App',
    data() {
        return {
            mapView: {
                center: [-0.113049, 51.498568],
                zoom: 14,
            }
        }
    },
    components: {
        // HelloWorld,
        Map,
    },
    mounted() {
        const vectorLayer = window.vectorLayer;
        var point = new maptalks.Marker(
            window.map.getCenter(),
            {
                visible: true,
                editable: true,
                cursor: 'pointer',
                shadowBlur: 0,
                shadowColor: 'black',
                draggable: false,
                dragShadow: false, // display a shadow during dragging
                drawOnAxis: null,  // force dragging stick on a axis, can be: x, y
                symbol: {
                    'textFaceName': 'sans-serif',
                    'textName': 'MapTalks',
                    'textFill': 'red',
                    'textHorizontalAlignment': 'right',
                    'textSize': 40
                }
            }
        );
        point.addTo(vectorLayer);
        this.point = point;

    },
    destroyed() {
        // window.vectorLayer.removeGeometry(this.point);
    }
};