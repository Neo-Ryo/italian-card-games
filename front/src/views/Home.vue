<template>
	<div class="home">
		<button @click="showNavbar">show navbar</button>
		<LoginForm />
		<button @click="showVueInfos">Hello World</button>
		<HelloWorld v-if="showVJSInfos" msg="Welcome to Your Vue.js App" />
	</div>
</template>

<script>
// @ is an alias to /src
import store from "../store";
import LoginForm from "../components/LoginForm.vue";
import HelloWorld from "@/components/HelloWorld.vue";

export default {
	name: "Home",
	store,
	components: {
		HelloWorld,
		LoginForm,
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
			this.$store.dispatch("getPlayerData");
		},
		showNavbar: function () {
			this.$store.dispatch("showNavbar");
			console.log(store.state.isNavBar);
		},
	},
};
</script>
