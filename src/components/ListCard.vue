<template>
	<v-card>
		<v-card-title>Title</v-card-title>
		<v-card-text id="style-1" style="max-height:200px; overflow: auto;">
			<v-row><v-col cols="12">Test</v-col></v-row>
			<v-row><v-col cols="12">Test</v-col></v-row>
			<v-row><v-col cols="12">Test</v-col></v-row>
			<v-row><v-col cols="12">Test</v-col></v-row>
			<v-row><v-col cols="12">Test</v-col></v-row>
		</v-card-text>
	</v-card>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({});
</script>

<style>
#style-1::-webkit-scrollbar-track {
	-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
	border-radius: 10px;
}

#style-1::-webkit-scrollbar {
	width: 8px;
	height: 10px;
	background-color: #f5f5f5 !important;
}

#style-1::-webkit-scrollbar-thumb {
	border-radius: 6px;
	background-color: #555;
	height: 120px;
}
</style>
