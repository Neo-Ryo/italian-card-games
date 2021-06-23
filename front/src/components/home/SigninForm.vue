<template>
	<form
		@submit.prevent="submitForm"
		class="form-wrapper"
		enctype="multipart/form-data"
	>
		<h1 class="title">CREEZ UN COMPTE</h1>
		<div class="input-wrapper">
			<label for="email">Entrez votre email</label>
			<input
				class="input"
				type="text"
				name="email"
				v-model="email"
				placeholder="name@email.com"
			/>
		</div>
		<div class="input-wrapper">
			<label for="password">Entrez votre mot de passe</label>
			<input
				class="input"
				type="password"
				v-model="password"
				name="password"
				placeholder="your password..."
			/>
		</div>
		<div class="input-wrapper">
			<label for="pseudo">Entrez votre pseudo</label>
			<input
				class="input"
				type="text"
				v-model="pseudo"
				name="pseudo"
				placeholder="Superman64..."
			/>
		</div>
		<div class="input-wrapper-avatar">
			<label for="avatar">Choisissez votre image</label>
			<input
				class="input"
				ref="file"
				type="file"
				@change="selectedImage"
				name="avatar"
			/>
			<img class="avatar" :src="readableAvatar" alt="players avatar" />
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
	name: "SigninForm",
	Loader,
	data() {
		return {
			isLoading: false,
			isError: false,
			error: "",
			email: "",
			password: "",
			pseudo: "",
			avatar: null,
			readableAvatar: "",
		};
	},
	methods: {
		submitForm: async function () {
			try {
				this.isLoading = true;
				let fd = new FormData();
				fd.append("avatar", this.avatar);
				const uploadedFile = await Axios.post(
					"http://localhost:8000/players/upload",
					fd
				);
				const res = await Axios.post("http://localhost:8000/players", {
					email: this.email,
					password: this.password,
					pseudo: this.pseudo,
					avatar: uploadedFile.data.filePath,
				});
				sessionStorage.setItem("token", res.data.token);
				console.log(res.data);
				const { id, email, avatar, wallet } = res.data;
				const playerObj = { id, email, avatar, wallet };
				this.$store.commit("getPlayerData", playerObj);
				this.isLoading = false;
			} catch (error) {
				console.log("MY ERROR", error);
				this.isError = true;
				this.error = error.response;
			} finally {
				this.isLoading = false;
			}
		},
		selectedImage: function (event) {
			this.avatar = this.$refs.file.files[0];
			this.readableAvatar = URL.createObjectURL(this.$refs.file.files[0]);
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

.input-wrapper-avatar {
	display: flex;
	margin: 20px auto;
	width: 80%;
}

.avatar {
	width: 100px;
	height: 100px;
	border-radius: 100%;
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