<template>
	<v-card>
		<v-card-title>Booking </v-card-title>
		<v-card-text>
			<v-row class="black--text" no-gutters="">
				<span>16:30 <v-icon color="secondary">mdi-clock-outline</v-icon></span>
				<v-spacer></v-spacer>
				<span>5 <v-icon color="secondary">mdi-account-multiple</v-icon></span>
			</v-row>
			This is a regular client that would like to be waitered by Kevin.
		</v-card-text>
		<v-card-actions class="pr-1">
			<v-row no-gutters>
				<v-col class="pb-0" cols="12" sm="8">
					<v-avatar>
						<v-img
							class="elevation-2"
							src="https://avataaars.io/?accessoriesType=Prescription02&avatarStyle=Transparent&clotheColor=Gray02&clotheType=Hoodie&eyeType=Default&eyebrowType=DefaultNatural&facialHairType=Blank&hairColor=BrownDark&mouthType=Default&skinColor=Light&topType=ShortHairShortRound"
						></v-img>
					</v-avatar>
					Christiaan Landman
				</v-col>
				<v-col class="pb-0" cols="8" offset="4" offset-sm="0" sm="4">
					<span class="d-flex " :class="{ 'float-right': !$vuetify.breakpoint.xs }">
						<v-btn class="ma-0" icon x-large>
							<v-icon color="success">mdi-check-circle-outline</v-icon>
						</v-btn>
						<v-btn class="ma-0" icon x-large>
							<v-icon color="error">mdi-close-circle-outline</v-icon>
						</v-btn>
					</span>
				</v-col>
			</v-row>
		</v-card-actions>
	</v-card>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({});
</script>
