<template>
	<LoginForm v-if="account" />
	<SigninForm v-else />
	<button @click="account = !account" class="button-account" v-if="account">
		Deja un compte? Cliquez ici.
	</button>
	<button @click="account = !account" class="button-account" v-else>
		Pas de compte? Cliquez ici.
	</button>
</template>

<script>
// @ is an alias to /src
import LoginForm from "../components/LoginForm.vue";
import SigninForm from "@/components/SigninForm.vue";

export default {
	name: "Home",
	components: {
		LoginForm,
		SigninForm,
	},
	data: () => ({
		account: true,
	}),
};
</script>

<style lang="scss" scoped>
.button-account {
	border: none;
	background-color: transparent;
	color: var(--main);
	cursor: pointer;
}
</style>
