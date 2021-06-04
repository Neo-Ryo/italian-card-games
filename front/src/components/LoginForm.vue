<template>
	<form action="" method="post" class="form-wrapper">
		<h1 class="title">LOGIN</h1>
		<div class="input-wrapper">
			<label for="email">enter your email</label>
			<input
				class="input"
				type="text"
				name="email"
				placeholder="name@email.com"
			/>
		</div>
		<div class="input-wrapper">
			<label for="password">enter your password</label>
			<input
				class="input"
				type="password"
				name="password"
				placeholder="your password..."
			/>
		</div>
		<input type="submit" class="button-submit" />
	</form>
</template>

<script>
import Axios from "axios";
export default {};
</script>

<style  scoped>
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
}
</style>