import * as THREE from 'three';
import * as maptalks from 'maptalks';
import dat from 'dat.gui';
import LZString from 'lz-string';

export default {
    methods: {
        initBuildings() {
            var threeLayer = window.threeLayer;
            var meshes = [];
            var material = new THREE.MeshBasicMaterial({ color: '#3e35cf', transparent: true });
            // var highlightmaterial = new THREE.MeshBasicMaterial({ color: 'yellow', transparent: true });
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
                        topColor: '#fff',
                        interactive: false
                    }, material);
                    return mesh;
                });
                threeLayer.addMesh(meshes);
                this.meshes = meshes;
                this.initRoads(threeLayer);
                // this.initGui(material);
            });
        },

        initRoads(threeLayer) {
            var material = new THREE.MeshPhongMaterial({ color: 0x00ffff, transparent: true });
            var highlightmaterial = new THREE.MeshBasicMaterial({ color: 'yellow', transparent: true });
            fetch('./assets/berlin-roads.txt').then(res => {
                return res.text();
            }).then(geojson => {
                geojson = LZString.decompressFromBase64(geojson);
                geojson = JSON.parse(geojson);
                var lineStrings = maptalks.GeoJSON.toGeometry(geojson);
                var timer = 'generate line time';
                console.time(timer);
                var lines = lineStrings.map(function (lineString) {
                    var line = threeLayer.toExtrudeLine(lineString, { altitude: 0, width: 3, height: 1 }, material);
                    //tooltip test
                    line.setToolTip(line.getId(), {
                        showTimeout: 0,
                        eventsPropagation: true,
                        dx: 10
                    });
                    //infowindow test
                    line.setInfoWindow({
                        content: 'hello world,id:' + line.getId(),
                        title: 'message',
                        animationDuration: 0,
                        autoOpenOn: false
                    });

                    //event test
                    ['click', 'mouseout', 'mouseover', 'mousedown', 'mouseup', 'dblclick', 'contextmenu'].forEach(function (eventType) {
                        line.on(eventType, function (e) {
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
                    return line;
                });
                console.log('lines.length:', lines.length);
                console.timeEnd(timer);
                threeLayer.addMesh(lines);
                this.lines = lines;
                this.initGui(material);
            })

        },
        initGui(material) {
            var threeLayer = window.threeLayer, lines = this.lines;
            var params = {
                add: true,
                color: 0x00ffff,
                show: true,
                opacity: 1,
                altitude: 0
            };
            var gui = new dat.GUI();
            gui.add(params, 'add').onChange(function () {
                if (params.add) {
                    threeLayer.addMesh(lines);
                } else {
                    threeLayer.removeMesh(lines);
                }
            });
            gui.addColor(params, 'color').name('line color').onChange(function () {
                material.color.set(params.color);
                lines.forEach(function (mesh) {
                    mesh.setSymbol(material);
                });
            });
            gui.add(params, 'opacity', 0, 1).onChange(function () {
                material.opacity = params.opacity;
                lines.forEach(function (mesh) {
                    mesh.setSymbol(material);
                });
            });
            gui.add(params, 'altitude', 0, 300).onChange(function () {
                lines.forEach(function (mesh) {
                    mesh.setAltitude(params.altitude);
                });
            });
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
        console.log(this.lines);
        window.threeLayer.removeMesh(this.meshes);
        window.threeLayer.removeMesh(this.lines);
        this.gui.destroy();
    }
};