<template>
    <div>
        <div class="left panel">
            <div style="margin-top:60px">second</div>
        </div>
        <div class="right panel">
            <div style="margin-top:60px">second</div>
        </div>
    </div>
</template>

<script>
import Second from "./second.js";
export default Second;
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
