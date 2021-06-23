<template>
	<div class="wrapper">
		<img class="avatar" :src="avatar" :alt="avatar" />
		<div class="pseudo">{{ pseudo }}</div>
	</div>
</template>

<script>
export default {
	name: "UserCard",
	props: {
		avatar: String,
		pseudo: String,
	},
};
</script>

<style lang="scss" scoped>
.wrapper {
	border: 1px solid var(--main);
	height: 150px;
	width: 150px;
}
</style>