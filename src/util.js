import * as THREE from 'three';

var SIZE = 512;
var canvas = document.createElement('canvas');
canvas.width = canvas.height = SIZE;
var ctx = canvas.getContext('2d');
var material;

export function getMaterial(fontSize, text, fillColor) {
    ctx.clearRect(0, 0, SIZE, SIZE);
    ctx.save();

    ctx.beginPath();
    ctx.fillStyle = fillColor;
    ctx.arc(SIZE / 2, SIZE / 2, 60, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = fillColor;
    ctx.lineWidth = 20;
    ctx.beginPath();
    ctx.arc(SIZE / 2, SIZE / 2, 120, 0, Math.PI * 2);
    ctx.closePath();
    ctx.stroke();

    ctx.shadowColor = '#fff';
    ctx.shadowBlur = 100;
    ctx.beginPath();
    ctx.arc(SIZE / 2, SIZE / 2, 200, 0, Math.PI * 2);
    ctx.closePath();
    ctx.stroke();

    ctx.restore();

    if (!material) {
        var texture = new THREE.Texture(canvas);
        texture.needsUpdate = true; //浣跨敤璐村浘鏃惰繘琛屾洿鏂�
        material = new THREE.MeshPhongMaterial({
            map: texture,
            // side: THREE.DoubleSide,
            transparent: true,
        });
    } else {
        material.map.needsUpdate = true;
    }
    return material;
}