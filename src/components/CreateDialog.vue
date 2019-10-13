<template>
	<v-row justify="center">
		<v-dialog v-model="dialog" persistent scrollable max-width="450px">
			<v-card>
				<v-card-title class="headline primary white--text">
					<span class="headline">New Booking</span>
				</v-card-title>
				<v-card-text>
					<v-container>
						<v-row>
							<v-col cols="12">
								<v-text-field label="Booking name" dense required hide-details></v-text-field>
							</v-col>
							<v-col cols="12" md="4">
								<v-text-field readonly type="number" dense label="Attendees" required hide-details></v-text-field>
							</v-col>
							<v-col cols="12" md="3">
								<span class="ml-n4">
									<v-btn icon class="ml-n1">
										<v-icon>mdi-minus-circle-outline</v-icon>
									</v-btn>
									<v-btn icon class="ml-n1">
										<v-icon>mdi-plus-circle-outline</v-icon>
									</v-btn>
								</span>
							</v-col>
							<v-col cols="12" md="5" style="display: inline-flex;">
								<span>Test</span>
								<vue-timepicker :minute-interval="10"></vue-timepicker>
							</v-col>
							<v-col cols="12">
								<v-textarea label="Description" no-resize auto-grow :rows="1" hide-details></v-textarea>
							</v-col>
							<v-col cols="12" class="">
								<v-date-picker v-model="date" full-width="" header-color="primary" color="secondary" reactive></v-date-picker>
							</v-col>
						</v-row>
					</v-container>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="secondary" text @click="dialog = false">Close</v-btn>
					<v-btn color="secondary" @click="dialog = false">Save</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import VueTimepicker from 'vue2-timepicker';

// CSS
import 'vue2-timepicker/dist/VueTimepicker.css';

export default Vue.extend({
	components: { VueTimepicker },
	data() {
		return {
			dialog: true,
			date: null
		};
	}
});
</script>

<style>
input.display-time {
	max-width: 50% !important;
}
</style>
