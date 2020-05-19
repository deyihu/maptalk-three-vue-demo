import * as THREE from 'three';
import * as maptalks from 'maptalks';


function getColor(level) {
    if (level < 2) {
        return 0x2685a7;
    } else if (level >= 2 && level <= 5) {
        return 0xff5733;
    } else {
        return 0xff2e00;
    }
}


export default {
    methods: {
        initBuildings() {
            var meshes, threeLayer = window.threeLayer;
            fetch('./assets/buildings.geojson').then(res => res.json()).then(json => {
                const geojson = { "type": "FeatureCollection", features: [] };
                json.forEach(element => {
                    geojson.features = geojson.features.concat(element.features);
                });
                const polygons = maptalks.GeoJSON.toGeometry(geojson);
                meshes = polygons.map(polygon => {
                    const properties = polygon.getProperties();
                    var heightPerLevel = 10;
                    var levels = properties.levels || 1;
                    var color = getColor(levels);

                    var m = new THREE.MeshPhongMaterial({ color: color, opacity: 0.7 });
                    //change to back side with THREE <= v0.94
                    // m.side = THREE.BackSide;

                    var mesh = threeLayer.toExtrudeMesh(polygon, levels * heightPerLevel, m, levels * heightPerLevel);
                    return mesh;
                });
                threeLayer.addMesh(meshes);
                this.meshes = meshes;
            });
        }
    },
    mounted() {
        window.map.setView({
            center: [13.416935229170008, 52.529564137540376],
            zoom: 16,
            pitch: 70,
            bearing: 180,
        });
        const threeLayer = window.threeLayer;
        if (threeLayer.getScene()) {
            setTimeout(() => {
                this.initBuildings();
            }, 1000);
        } else {
            setTimeout(() => {
                this.initBuildings();
            }, 1000);
        }
    },
    destroyed() {
        window.threeLayer.removeMesh(this.meshes);
    }
};