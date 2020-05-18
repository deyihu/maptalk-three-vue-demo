<template>
    <div>
        <div class="left panel">
            <div style="margin-top:60px">first</div>
        </div>
        <div class="right panel">
            <div style="margin-top:60px">first</div>
        </div>
    </div>
</template>

<script>
import First from "./first.js";
export default First;
</script>
<style>
.panel {
    position: absolute;
    z-index: 2;
    height: 100%;
    /* padding-top: 100px; */
    top: 0;
    background: rgba(0, 0, 0, 0.5);
    width: 300px;
    overflow: hidden;
    max-height: 100%;
    color: #ffffff;
    font-size: 30px;
}
.left {
    left: 0;
}

.right {
    right: 0;
}
</style>
