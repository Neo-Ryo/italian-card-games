<template>
	<div id="nav">
		<router-link to="/"> Home </router-link>
		<router-link to="/about">About</router-link>
	</div>
	<router-view />
</template>

<style>
:root {
	--main: #11a3f2;
	--sec: #5dccc9;
	--third: #a9f49f;
	--frth: #ea3a3a;
	--dark: #2c3e50;
}

body {
	margin: 0;
	box-sizing: border-box;
	background-color: var(--dark);
}

h1,
h2,
h3 {
	font-family: "Bebas Neue", cursive;
}

#app {
	/* font-family: 'Bebas Neue', cursive; */
	/* font-family: 'Sigmar One', cursive; */
	font-family: "Roboto", sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: var(--main);
}

#nav {
	padding: 20px;
	width: 100vw;
	display: flex;
	justify-content: space-around;
	background-color: var(--frth);
}

#nav a {
	font-weight: bold;
	color: aliceblue;
}

#nav a.router-link-exact-active {
	color: var(--main);
}

@media screen and (max-width: 600px) {
	#nav {
		position: fixed;
		bottom: 0;
	}
}
</style>
