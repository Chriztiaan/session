<template>
	<v-row justify="center">
		<v-dialog v-model="value" persistent scrollable max-width="450px">
			<v-card id="style-2">
				<v-card-title class="headline primary white--text">
					<span class="headline">New Booking</span>
				</v-card-title>
				<v-card-text>
					<v-container>
						<v-form ref="form" v-model="valid">
							<v-row>
								<v-col cols="12">
									<v-text-field v-model="booking.title" label="Booking name" dense required :rules="[rules.required]"></v-text-field>
								</v-col>
								<v-col cols="12" md="4">
									<v-text-field v-model="booking.attendees" readonly type="number" dense label="Attendees" required hide-details></v-text-field>
								</v-col>
								<v-col cols="12" md="3" class="pl-0">
									<span class="">
										<v-btn :disabled="booking.attendees == 0" icon class="ml-n1" @click="booking.attendees--">
											<v-icon>mdi-minus-circle-outline</v-icon>
										</v-btn>
										<v-btn icon class="ml-n1" @click="booking.attendees++">
											<v-icon>mdi-plus-circle-outline</v-icon>
										</v-btn>
									</span>
								</v-col>
								<v-col cols="12" md="5" class="pt-4" style="display: inline-flex;">
									<span class="pt-1 ml-n2 mr-2 body-1">Time</span>
									<vue-timepicker v-model="booking.time" hide-clear-button :minute-interval="10"></vue-timepicker>
								</v-col>
								<v-col cols="12">
									<v-textarea v-model="booking.description" label="Description" no-resize auto-grow :rows="1" hide-details></v-textarea>
								</v-col>
								<v-col cols="12" class="">
									<v-date-picker v-model="date" full-width="" header-color="primary" color="secondary" reactive></v-date-picker>
								</v-col>
							</v-row>
						</v-form>
					</v-container>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="secondary" text @click="cancel">Cancel</v-btn>
					<v-btn :disabled="!valid" color="secondary" @click="submit">Save</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import VueTimepicker from 'vue2-timepicker';
import Booking from './../models/booking';
import 'vue2-timepicker/dist/VueTimepicker.css';

export default Vue.extend({
	components: { VueTimepicker },
	props: {
		value: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			valid: null,
			show: false,
			date: null,
			booking: null,
			rules: {
				required: (value): any => !!value || 'Required'
			}
		};
	},
	watch: {
		value(newVal: boolean): void {
			this.show = newVal;
		},
		show(newVal: boolean): void {
			this.$emit('input', newVal);
		}
	},
	created() {
		this.show = this.value;
		this.reset();
	},
	updated() {
		this.$refs.form.validate();
	},
	methods: {
		reset(): void {
			this.date = new Date().toISOString().substr(0, 10);
			this.booking = new Booking('', '12:00', new Date(), 1, ``, 'Test creator');
		},
		cancel(): void {
			this.reset();
			this.$refs.form.resetValidation();
			this.show = false;
		},
		submit(): void {
			this.booking.date = new Date(this.date);
			this.$emit('submit', this.booking);
			this.reset();
			this.$refs.form.resetValidation();
			this.show = false;
		}
	}
});
</script>

<style>
input.display-time {
	max-width: 50% !important;
}

.minutes::-webkit-scrollbar-track,
.hours::-webkit-scrollbar-track,
.v-card__text::-webkit-scrollbar-track {
	-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
	border-radius: 10px;
}

.minutes::-webkit-scrollbar,
.hours::-webkit-scrollbar,
.v-card__text::-webkit-scrollbar {
	width: 8px;
	height: 10px;
	background-color: #f5f5f5 !important;
}

.minutes::-webkit-scrollbar-thumb,
.hours::-webkit-scrollbar-thumb,
.v-card__text::-webkit-scrollbar-thumb {
	border-radius: 6px;
	background-color: rgb(233, 30, 99);
	height: 120px;
}
</style>
