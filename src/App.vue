<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: "app"
	};
</script>

<style>
	@import "https://at.alicdn.com/t/font_1165479_6sutxk7rbvb.css";
	#app {
		position: relative;
		height: 100%;
		width: 100%;
		font-family: "Avenir", Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
</style>
