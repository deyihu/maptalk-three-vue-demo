import * as maptalks from 'maptalks';
import * as THREE from 'three';
import Stats from 'stats.js';


export default {
    props: {
        // view: {}
    },
    mounted() {
        const map = window.map = new maptalks.Map('map', {
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
        // console.log(maptalks);
        // console.log(map);

        window.vectorLayer = new maptalks.VectorLayer('vector');
        map.addLayer(window.vectorLayer);

        var threeLayer = window.threeLayer = new maptalks.ThreeLayer('t', {
            forceRenderOnMoving: true,
            forceRenderOnRotating: true,
            // animation: true
        });


        var stats;
        // eslint-disable-next-line no-unused-vars
        threeLayer.prepareToDraw = function (gl, scene, camera) {
            var light = new THREE.DirectionalLight(0xffffff);
            light.position.set(0, -10, 10).normalize();
            scene.add(light);

            stats = new Stats();
            stats.domElement.style.zIndex = 100;
            document.getElementById('map').appendChild(stats.domElement);
            animation();
        };
        threeLayer.addTo(map);

        function animation() {
            // layer animation support Skipping frames
            threeLayer._needsUpdate = !threeLayer._needsUpdate;
            if (threeLayer._needsUpdate) {
                threeLayer.getRenderer().clearCanvas();
                threeLayer.renderScene();
            }
            stats.update();
            requestAnimationFrame(animation);
        }

    }
}