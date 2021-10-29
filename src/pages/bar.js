import * as THREE from 'three';
import dat from 'dat.gui';

export default {
    methods: {
        initBars() {
            var bars, threeLayer = this.getThreeLayer();
            var material = new THREE.MeshBasicMaterial({ color: '#fff', transparent: true });
            var highlightmaterial = new THREE.MeshBasicMaterial({ color: 'yellow', transparent: true });
            fetch('https://maptalks.org/maptalks.three/demo/data/population.json').then(res => res.json()).then(json => {
                bars = json.filter(function (dataItem) {
                    return dataItem[2] > 500;
                }).map(function (dataItem) {
                    return {
                        coordinate: dataItem.slice(0, 2),
                        height: dataItem[2]
                    }
                }).map(function (d) {
                    var bar = threeLayer.toBar(d.coordinate, {
                        height: d.height * 400,
                        radius: 15000,
                        topColor: '#fff',
                        // radialSegments: 4
                    }, material);

                    // tooltip test
                    bar.setToolTip(d.height * 400, {
                        showTimeout: 0,
                        eventsPropagation: true,
                        dx: 10
                    });


                    //infowindow test
                    bar.setInfoWindow({
                        content: 'hello world,height:' + d.height * 400,
                        title: 'message',
                        animationDuration: 0,
                        autoOpenOn: false
                    });


                    //event test
                    ['click', 'mouseout', 'mouseover', 'mousedown', 'mouseup', 'dblclick', 'contextmenu'].forEach(function (eventType) {
                        bar.on(eventType, function (e) {
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
                    return bar;
                });
                threeLayer.addMesh(bars);
                this.bars = bars;
                this.initGui(material);
            });
        },
        initGui(material) {
            var bars = this.bars, threeLayer = window.threeLayer;
            var params = {
                add: true,
                color: '#fff',
                show: true,
                opacity: 1,
                altitude: 0,
                animateShow: function () {
                    bars.forEach(function (mesh) {
                        mesh.animateShow({
                            duration: 3000
                        });
                    });
                }
            };

            var gui = new dat.GUI();
            gui.add(params, 'add').onChange(function () {
                if (params.add) {
                    threeLayer.addMesh(bars);
                } else {
                    threeLayer.removeMesh(bars);
                }
            });
            gui.addColor(params, 'color').name('bar color').onChange(function () {
                material.color.set(params.color);
                bars.forEach(function (mesh) {
                    mesh.setSymbol(material);
                });
            });
            gui.add(params, 'opacity', 0, 1).onChange(function () {
                material.opacity = params.opacity;
                bars.forEach(function (mesh) {
                    mesh.setSymbol(material);
                });
            });
            gui.add(params, 'show').onChange(function () {
                bars.forEach(function (mesh) {
                    if (params.show) {
                        mesh.show();
                    } else {
                        mesh.hide();
                    }
                });
            });
            gui.add(params, 'altitude', 0, 300000).onChange(function () {
                bars.forEach(function (mesh) {
                    mesh.setAltitude(params.altitude);
                });
            });
            gui.add(params, 'animateShow');
            this.gui = gui;
        }
    },
    mounted() {
        const map = this.getMap();
        map.setView({
            center: [19.06325670775459, 42.16842479475318],
            zoom: 6,
            pitch: 60,
        })
        this.initThreeLayer(() => {
            this.initBars();
        })
    },
    destroyed() {
        this.getThreeLayer().removeMesh(this.bars);
        this.gui.destroy();
    }
};