<template>
	<div class="loading-wrapper">
		<div class="loading-box">
			<span>提交中</span>
			<div class="ani-box"></div>
		</div>
	</div>
</template>


<style lang="scss">
	.loading-wrapper {
		position: fixed;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100vw;
		height: 100vh;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.719);
		z-index: 1000;
		.loading-box {
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;
			width: 100px;
			height: 100px;
			color: rgb(189, 189, 189);
			> span {
				font-weight: bold;
			}
			// &::after {
			// 	content: "LOADING";
			// 	font-weight: bold;
			// }
			.ani-box {
				position: absolute;
				top: 0;
				left: 0;
				margin-left: 0;
				margin-top: 0;
				background-color: #fff;
				animation: loading_ani 5s infinite forwards;
			}
		}
	}
	@keyframes loading_ani {
		0% {
			width: 10%;
			height: 10%;
			margin-left: 0;
			margin-top: 0;
			background-color: #fff;
		}
		10% {
			width: 100%;
			height: 10%;
			margin-left: 0;
			margin-top: 0;
		}
		20% {
			width: 10%;
			height: 10%;
			margin-left: 90%;
			margin-top: 0;
			background-color: rgb(211, 125, 27);
		}
		30% {
			width: 10%;
			height: 100%;
			margin-left: 90%;
			margin-top: 0;
		}
		40% {
			width: 10%;
			height: 10%;
			margin-left: 90%;
			margin-top: 90%;
			background-color: rgb(255, 255, 255);
		}
		50% {
			width: 100%;
			height: 10%;
			margin-left: 0;
			margin-top: 90%;
		}
		60% {
			width: 10%;
			height: 10%;
			margin-left: 0;
			margin-top: 90%;
			background-color: rgb(211, 125, 27);
		}
		70% {
			width: 10%;
			height: 100%;
			margin-left: 0;
			margin-top: 0;
		}
		80% {
			width: 10%;
			height: 10%;
			margin-left: 0;
			margin-top: 0;
			background-color: rgb(255, 255, 255);
		}
		100% {
			width: 10%;
			height: 10%;
			margin-left: 0;
			margin-top: 0;
		}
	}
</style>


<script>
	export default {
		props: ["isRequest", "isSuccess"]
	};
</script>
