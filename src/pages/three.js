
import * as maptalks from 'maptalks';
export default {
    methods: {
        switchBaseLayer() {
            const baseTileLayer = this.baseTileLayer = new maptalks.TileLayer('base', {
                urlTemplate: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
                subdomains: ['a', 'b', 'c', 'd'],
                attribution: '&copy; <a href="http://osm.org">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/">CARTO</a>'
            });
            const darkTileLayer = window.map.getBaseLayer();
            this.darkTileLayer = darkTileLayer;
            window.map.setBaseLayer(baseTileLayer);
        }

    },
    mounted() {
        if (window.map) {
            this.switchBaseLayer();
        }


    },
    destroyed() {
        window.map.setBaseLayer(this.darkTileLayer);
        window.map.setZoom(14);
    }
};