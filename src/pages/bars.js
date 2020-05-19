import * as THREE from 'three';
import dat from 'dat.gui';

const COLORS = {
    '#313695': [0, 1000],
    '#4575b4': [1000, 5000],
    '#74add1': [5000, 10000],
    '#abd9e9': [10000, 50000],
    '#e0f3f8': [50000, 1000000],
    '#ffffbf': [1000000, 1500000],
    '#fee090': [1500000, 1600000],
    '#fdae61': [1600000, 1700000],
    '#f46d43': [1700000, 1800000],
    '#d73027': [1800000, 2000000],
    '#a50026': [2000000, Infinity],
};

function getColor(value) {
    for (let c in COLORS) {
        const [minV, maxV] = COLORS[c];
        if (minV <= value && value < maxV) {
            return c;
        }
    }
}

export default {
    methods: {
        initBars() {
            var bars = [], threeLayer = window.threeLayer, selectMesh = [];
            var material = new THREE.MeshLambertMaterial({ color: '#fff', transparent: true });
            var highlightmaterial = new THREE.MeshBasicMaterial({ color: 'yellow', transparent: true, opacity: 0.5 });
            var min = Infinity, max = -Infinity;
            fetch('https://maptalks.org/maptalks.three/demo/data/population.json').then(res => res.json()).then(json => {
                const data = json.filter(function (dataItem) {
                    return dataItem[2] > 0;
                }).map(function (dataItem) {
                    dataItem[2] *= 400;
                    min = Math.min(min, dataItem[2]);
                    max = Math.max(max, dataItem[2]);
                    return {
                        coordinate: dataItem.slice(0, 2),
                        height: dataItem[2],
                        radius: 15000,
                        topColor: '#fff'
                    }
                }).slice(0, Infinity);
                const colorMap = {};
                data.forEach(d => {
                    const { height } = d;
                    const color = getColor(height);
                    if (!colorMap[color]) {
                        const m = material.clone();
                        m.color.set(color);
                        colorMap[color] = {
                            data: [],
                            material: m
                        }
                    }
                    colorMap[color].data.push(d);
                });
                console.log(colorMap);
                for (let color in colorMap) {
                    const { data, material } = colorMap[color];
                    const count = data.length;
                    const PAGESIZE = 1000;
                    if (count > PAGESIZE) {
                        const page = Math.ceil(data.length / PAGESIZE);
                        for (let i = 0; i <= page; i++) {
                            const list = data.slice(i * PAGESIZE, (i + 1) * PAGESIZE);
                            if (list.length) {
                                const mesh = threeLayer.toBars(list, { interactive: false }, material);
                                bars.push(mesh);
                            }
                        }
                    } else {
                        const mesh = threeLayer.toBars(data, { interactive: false }, material);
                        bars.push(mesh);
                    }
                }
                bars.forEach(mesh => {
                    mesh.setToolTip('hello', {
                        showTimeout: 0,
                        eventsPropagation: true,
                        dx: 10
                    });

                    //infowindow test
                    mesh.setInfoWindow({
                        content: 'hello world',
                        title: 'message',
                        animationDuration: 0,
                        autoOpenOn: false
                    });

                    //event test
                    ['click', 'mousemove', 'empty', 'mouseout', 'mouseover', 'mousedown', 'mouseup', 'dblclick', 'contextmenu'].forEach(function (eventType) {
                        mesh.on(eventType, function (e) {
                            // console.log(e.type);
                            const select = e.selectMesh;
                            if (e.type === 'empty' && selectMesh.length) {
                                threeLayer.removeMesh(selectMesh);
                                selectMesh = [];
                            }

                            let data, baseObject;
                            if (select) {
                                data = select.data;
                                baseObject = select.baseObject;
                                if (baseObject && !baseObject.isAdd) {
                                    baseObject.setSymbol(highlightmaterial);
                                    threeLayer.addMesh(baseObject);
                                    selectMesh.push(baseObject);
                                }
                            }


                            if (selectMesh.length > 20) {
                                threeLayer.removeMesh(selectMesh);
                                selectMesh = [];
                            }


                            // override tooltip
                            if (e.type === 'mousemove' && data) {
                                const height = data.height;
                                const tooltip = this.getToolTip();
                                tooltip._content = `height:${height}`;
                            }
                            //override infowindow
                            if (e.type === 'click' && data) {
                                const height = data.height;
                                const infoWindow = this.getInfoWindow();
                                infoWindow.setContent(`height:${height}`);
                                if (infoWindow && (!infoWindow._owner)) {
                                    infoWindow.addTo(this);
                                }
                                this.openInfoWindow(e.coordinate);

                            }
                        });
                    });
                });
                console.log(bars);
                threeLayer.addMesh(bars);
                this.bars = bars;
                this.light = new THREE.AmbientLight(0xffffff);
                threeLayer.addMesh(this.light);
                this.initGui();
            });
        },
        initGui() {
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
                },
                interactive: false
            };

            var gui = new dat.GUI();
            gui.add(params, 'add').onChange(function () {
                if (params.add) {
                    threeLayer.addMesh(bars);
                } else {
                    threeLayer.removeMesh(bars);
                }
            });
            gui.add(params, 'opacity', 0, 1).onChange(function () {
                bars.forEach(function (mesh) {
                    const material = mesh.getSymbol();
                    material.opacity = params.opacity;
                    mesh.setSymbol(material);
                });
            });
            gui.add(params, 'altitude', 0, 300000).onChange(function () {
                bars.forEach(function (mesh) {
                    mesh.setAltitude(params.altitude);
                });
            });
            gui.add(params, 'animateShow');
            gui.add(params, 'interactive').onChange(function () {
                bars.forEach(function (mesh) {
                    mesh.options.interactive = params.interactive;
                });
            });
            this.gui = gui;
        }
    },
    mounted() {
        window.map.setView({
            center: [19.06325670775459, 42.16842479475318],
            zoom: 3,
            pitch: 60,
        });
        const threeLayer = window.threeLayer;
        if (threeLayer.getScene()) {
            setTimeout(() => {
                this.initBars();
            }, 1000);
        } else {
            setTimeout(() => {
                this.initBars();
            }, 1000);
        }
    },
    destroyed() {
        window.threeLayer.removeMesh(this.bars);
        window.threeLayer.removeMesh(this.light);
        this.gui.destroy();
    }
};