<template>
	<form @submit.prevent="submitForm" class="form-wrapper">
		<h1 class="title">CONNECTION</h1>
		<div class="input-wrapper">
			<label for="email">enter your email</label>
			<input
				class="input"
				type="text"
				name="email"
				v-model="email"
				placeholder="name@email.com"
			/>
		</div>
		<div class="input-wrapper">
			<label for="password">enter your password</label>
			<input
				class="input"
				type="password"
				v-model="password"
				name="password"
				placeholder="your password..."
			/>
		</div>
		<!-- loading button -->
		<Loader v-if="isLoading" />
		<button type="submit" class="button-submit" v-else>envoyer</button>
		<!-- error message -->
		<p v-if="isError" class="error-message">erreur d'indentifiants</p>
	</form>
</template>

<script>
import Axios from "axios";
import Loader from "@/components/anims/Loader.vue";

export default {
	name: "LoginForm",
	components: { Loader },
	data() {
		return {
			isLoading: false,
			isError: false,
			error: "",
			email: "",
			password: "",
			login: true,
		};
	},
	methods: {
		submitForm: async function () {
			try {
				this.isLoading = true;
				console.log("LOADING");
				const res = await Axios.post("http://localhost:8000/players/login", {
					email: this.email,
					password: this.password,
				});
				sessionStorage.setItem("token", res.data.token);
				console.log(res.data);
				const { id, email, pseudo, avatar, wallet } = res.data;
				const playerObj = { id, email, pseudo, avatar, wallet };
				this.$store.commit("getPlayerData", playerObj);
				this.isLoading = false;
				const dashboardRoute = `/dashboard/${id}`;
				this.$router.push(dashboardRoute);
			} catch (error) {
				console.log("MY ERROR", error);
				this.isError = true;
				this.isLoading = false;
				this.error = error.response;
			}
		},
	},
};
</script>

<style  scoped lang="scss">
.title {
	color: var(--sec);
}
.form-wrapper {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 600px;
	height: 400px;
	border: 1px solid var(--sec);
	border-radius: 5px;
	padding: 20px;
	margin: 20px auto;
}

.input {
	height: 20px;
	border-radius: 5px;
	border: none;
	padding: 10px;
}

.input-wrapper {
	display: flex;
	flex-direction: column;
	margin: 20px auto;
	width: 80%;
}
label {
	margin: 10px;
}

.button-submit {
	background-color: var(--third);
	border: none;
	width: 100px;
	height: 40px;
	cursor: pointer;
	border-radius: 5px;
	color: inherit;
	transition: 0.2s;
	&:hover {
		border: 1px solid var(--third);
		background-color: transparent;
		transition: 0.2s;
	}
}

.error-message {
	color: var(--frth);
}
</style>