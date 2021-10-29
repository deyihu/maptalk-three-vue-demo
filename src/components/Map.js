import * as maptalks from 'maptalks';
import Stats from 'stats.js';

export default {
    props: {
        // view: {}
    },
    mounted() {
        window.map = new maptalks.Map('map', {
            center: [13.384062075483484, 52.52392452635709],
            zoom: 14,
            pitch: 0,
            bearing: 0,
            baseLayer: new maptalks.TileLayer('base', {
                urlTemplate: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
                subdomains: ['a', 'b', 'c', 'd'],
                attribution: '&copy; <a href="http://osm.org">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/">CARTO</a>'
            })
        });
        this.initThreeLayer(() => {

        })
        var stats = new Stats();
        stats.domElement.style.zIndex = 100;
        document.getElementById('map').appendChild(stats.domElement);

        function animation() {
            const threeLayer = window.threeLayer;
            if (threeLayer) {
                // layer animation support Skipping frames
                threeLayer._needsUpdate = !threeLayer._needsUpdate;
                if (threeLayer._needsUpdate) {
                    threeLayer.renderScene();
                }
            }
            stats.update();
            requestAnimationFrame(animation);
        }
        animation();

    }
}