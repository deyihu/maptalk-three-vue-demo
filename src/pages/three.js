
import * as maptalks from 'maptalks';
export default {
    methods: {
        switchBaseLayer() {
            const baseTileLayer = new maptalks.TileLayer('base', {
                urlTemplate: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
                subdomains: ['a', 'b', 'c', 'd'],
                attribution: '&copy; <a href="http://osm.org">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/">CARTO</a>'
            });
            this.darkTileLayer = this.getMap().getBaseLayer();
            this.getMap().setBaseLayer(baseTileLayer);
        }

    },
    mounted() {
        this.switchBaseLayer();


    },
    destroyed() {
        this.getMap().setBaseLayer(this.darkTileLayer);
    }
};