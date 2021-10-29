// import HelloWorld from './components/HelloWorld.vue';
import * as maptalks from 'maptalks';
import Map from './components/Map.vue';

export default {

    name: 'App',
    data() {
        return {

        }
    },
    components: {
        // HelloWorld,
        Map,
    },
    mounted() {
        //test map
        this.initThreeLayer(() => {
            const map = this.getMap();
            const layer = this.layer = new maptalks.VectorLayer('layer').addTo(map);
            layer.addGeometry(new maptalks.Marker(map.getCenter()));
        })
    },
    destroyed() {
        // this.getMap().removeLayer(this.layer);
    }
};