import * as maptalks from 'maptalks';
import * as THREE from 'three';

export function createThreeLayer(map, callback) {
    var threeLayer = new maptalks.ThreeLayer('threelayer', {
        forceRenderOnMoving: true,
        forceRenderOnRotating: true,
    });

    // eslint-disable-next-line no-unused-vars
    threeLayer.prepareToDraw = function (gl, scene, camera) {
        var light = new THREE.DirectionalLight(0xffffff);
        light.position.set(0, -10, 10).normalize();
        scene.add(light);
        callback && callback(threeLayer);
    };
    threeLayer.addTo(map);
}