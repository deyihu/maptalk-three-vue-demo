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
            var meshes, threeLayer = this.getThreeLayer();
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
                    var mesh = threeLayer.toExtrudePolygon(polygon, {
                        height: heightPerLevel * levels
                    }, m);
                    return mesh;
                });
                threeLayer.addMesh(meshes);
                this.meshes = meshes;
            });
        }
    },
    mounted() {
        this.getMap().setView({
            center: [13.416935229170008, 52.529564137540376],
            zoom: 16,
            pitch: 70,
            bearing: 180,
        });
        this.initThreeLayer(() => {
            this.initBuildings();
        })
    },
    destroyed() {
        this.getThreeLayer().removeMesh(this.meshes);
    }
};