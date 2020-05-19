<template>
    <div id="app">
        <div class="header">
            <router-link to="/">index</router-link>
            <router-link to="/first">first</router-link>
            <router-link to="/second">second</router-link>
            <router-link to="/three">three</router-link>
            <router-link to="/bar">bar</router-link>
            <router-link to="/bars">bars</router-link>
            <router-link to="/buildings">buildings</router-link>
            <router-link to="/buildings-color">buildings-color</router-link>
        </div>
        <Map />
        <!-- 路由出口 -->
        <!-- 路由匹配到的组件将渲染在这里 -->
        <router-view></router-view>
    </div>
</template>

<script>
import App from './App';
export default App;
</script>

<style>
html,
body {
    height: 100%;
    padding: 0;
    margin: 0;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /* margin-top: 60px; */
    height: 100%;
    overflow: hidden;
}
.header {
    width: 100%;
    height: 60px;
    position: absolute;
    top: 0;
    z-index: 99;
    /* background-color: black; */
    color: #ffffff;
    background: #012a7b;
}
.header a {
    color: #ffffff;
    margin-right: 20px;
}

.dg.ac{
    z-index: 100;
}
</style>
