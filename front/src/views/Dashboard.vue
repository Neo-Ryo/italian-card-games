<template>
	<h1>DASHBOARD!</h1>
	<UserCard :pseudo="player.pseudo" :avatar="player.avatar" />
</template>

<script>
import UserCard from "@/components/dashboard/UserCard.vue";
export default {
	name: "Dashboard",
	components: {
		UserCard,
	},
	data() {
		return {
			player: {},
		};
	},
	mounted: function () {
		this.player = this.$store.state.player;
	},
};
</script>

<style>
</style>