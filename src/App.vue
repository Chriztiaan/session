<template>
	<v-app class="red">
		<Navbar></Navbar>
		<v-container fluid style="min-height:94vh" class="orange lighten-3">
			<Dashboard msg="Welcome to Your Vue.js App" />
		</v-container>
	</v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Navbar from './components/Navbar.vue';
import Dashboard from './components/Dashboard.vue';

export default Vue.extend({
	components: { Dashboard, Navbar }
});
</script>

<style></style>
