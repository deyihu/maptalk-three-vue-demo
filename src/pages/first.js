import { getMaterial } from './../util';
import Circle from './../baseobjects/Circle';
export default {
    methods: {
        initCircles() {
            var circles, threeLayer = window.threeLayer;
            var lnglats = [
                [13.429362937522342, 52.518205849377495],
                [13.41688993786238, 52.52216099633924],
                [13.417991247928398, 52.53296954185342],
                [13.438154245439819, 52.533321196953096],
                [13.450418871799684, 52.52653968753597],
                [13.390340036780685, 52.51953598324846],
                [13.399921081391199, 52.50920191922407],
                [13.366122901455583, 52.50949703597493],
                [13.365784792637783, 52.51964629275582],
                [13.371429857108524, 52.528732386936014],
                [13.383686384074508, 52.53781463596616],
                [13.40395563186371, 52.540223413847315],
                [13.361485408920998, 52.53916869831616],
                [13.35373758485457, 52.52883597474849],
                [13.355233792792774, 52.519259850666316],
                [13.369548077301943, 52.506940362998336],
                [13.338732610093984, 52.50860998116909],
                [13.341879792058194, 52.52318729489704],
                [13.348448231846305, 52.537668773653735],
            ];
            var text = Math.round(Math.random() * 10000);
            var color = "#0be10b";
            var material = getMaterial(70, text, color);
            circles = lnglats.map(function (lnglat) {
                var circle = new Circle(
                    lnglat,
                    {
                        radius: 200,
                    },
                    material,
                    threeLayer
                );
                // circle.getObject3d().scale.set(0.001, 0.001, 0.0001);

                //tooltip test
                circle.setToolTip('id:' + circle.getId(), {
                    showTimeout: 0,
                    eventsPropagation: true,
                    dx: 10,
                });

                //infowindow test
                circle.setInfoWindow({
                    content: 'id:' + circle.getId(),
                    title: 'message',
                    animationDuration: 0,
                    autoOpenOn: false,
                });

                //event test
                [
                    'click',
                    'mousemove',
                    'mouseout',
                    'mouseover',
                    'mousedown',
                    'mouseup',
                    'dblclick',
                    'contextmenu',
                ].forEach(function (eventType) {
                    circle.on(eventType, function (e) {
                        console.log(e.type, e);
                    });
                });
                return circle;
            });
            threeLayer.addMesh(circles);
            this.circles = circles;
        }
    },
    mounted() {
        const threeLayer = window.threeLayer;
        if (threeLayer.getScene()) {
            this.initCircles();
        } else {
            setTimeout(() => {
                this.initCircles();
            }, 1000);
        }
    },
    destroyed() {
        window.threeLayer.removeMesh(this.circles);
    }
};