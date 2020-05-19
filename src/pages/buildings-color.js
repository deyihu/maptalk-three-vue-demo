import * as THREE from 'three';
import * as maptalks from 'maptalks';
import dat from 'dat.gui';

export default {
    methods: {
        initBuildings() {
            var threeLayer = window.threeLayer;
            var meshes = [];
            var material = new THREE.MeshBasicMaterial({ color: '#3e35cf', transparent: true });
            var highlightmaterial = new THREE.MeshBasicMaterial({ color: 'yellow', transparent: true });
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

                    var mesh = threeLayer.toExtrudePolygon(polygon, {
                        height: levels * heightPerLevel,
                        topColor: '#fff'
                    }, material);

                    //tooltip test
                    mesh.setToolTip(levels * heightPerLevel, {
                        showTimeout: 0,
                        eventsPropagation: true,
                        dx: 10
                    });

                    //infowindow test
                    mesh.setInfoWindow({
                        content: 'hello world,height:' + levels * heightPerLevel,
                        title: 'message',
                        animationDuration: 0,
                        autoOpenOn: false
                    });

                    // mesh.getInfoWindow().addTo(map);

                    //event test
                    ['click', 'mousemove', 'mouseout', 'mouseover', 'mousedown', 'mouseup', 'dblclick', 'contextmenu'].forEach(function (eventType) {
                        mesh.on(eventType, function (e) {
                            // console.log(e.type, e);
                            // console.log(this);
                            if (e.type === 'mouseout') {
                                this.setSymbol(material);
                            }
                            if (e.type === 'mouseover') {
                                this.setSymbol(highlightmaterial);
                            }
                        });
                    });
                    return mesh;
                });
                threeLayer.addMesh(meshes);
                this.meshes = meshes;
                this.initGui(material);
            });
        },
        initGui(material) {
            var threeLayer = window.threeLayer, meshs = this.meshes;
            var params = {
                add: true,
                color: '#3e35cf',
                show: true,
                opacity: 1,
                altitude: 0,
                animateShow: function () {
                    meshs.forEach(function (mesh) {
                        mesh.animateShow({
                            duration: 3000
                        });
                    });
                }
            };
            var gui = new dat.GUI();
            gui.add(params, 'add').onChange(function () {
                if (params.add) {
                    threeLayer.addMesh(meshs);
                } else {
                    threeLayer.removeMesh(meshs);
                }
            });
            gui.addColor(params, 'color').name('building color').onChange(function () {
                material.color.set(params.color);
                meshs.forEach(function (mesh) {
                    mesh.setSymbol(material);
                });
            });
            gui.add(params, 'opacity', 0, 1).onChange(function () {
                material.opacity = params.opacity;
                meshs.forEach(function (mesh) {
                    mesh.setSymbol(material);
                });
            });
            gui.add(params, 'altitude', 0, 300).onChange(function () {
                meshs.forEach(function (mesh) {
                    mesh.setAltitude(params.altitude);
                });
            });
            gui.add(params, 'animateShow');
            this.gui = gui;
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
        this.gui.destroy();
    }
};