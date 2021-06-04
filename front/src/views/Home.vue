<template>
	<div class="home">
		<button @click="updateState">state updater</button>
		<button @click="showVueInfos">Hello World</button>
		<h1>{{ this.$store.state.player.pseudo }}</h1>
		<h2>{{ this.$store.state.player.email }}</h2>
		<p>{{ this.$store.state.player }}</p>
		<HelloWorld v-if="showVJSInfos" msg="Welcome to Your Vue.js App" />
	</div>
</template>

<script>
// @ is an alias to /src
import store from "../store";
import HelloWorld from "@/components/HelloWorld.vue";

export default {
	name: "Home",
	store,
	components: {
		HelloWorld,
	},
	data() {
		return {
			showVJSInfos: false,
		};
	},
	methods: {
		showVueInfos: function () {
			this.showVJSInfos = !this.showVJSInfos;
		},
		updateState: function () {
			this.$store.commit("getPlayerData");
			console.log(store.state.player);
		},
	},
};
</script>
