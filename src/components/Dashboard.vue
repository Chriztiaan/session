<template>
	<div>
		<v-container>
			<v-row no-gutters>
				<v-spacer></v-spacer>
				<CreateDialog v-model="dialog" @submit="addBooking"></CreateDialog>
				<v-fab-transition>
					<v-btn class="mr-2" color="secondary" dark top right @click="dialog = true">
						<v-icon>mdi-plus</v-icon>
					</v-btn>
				</v-fab-transition>
				<v-fab-transition>
					<v-btn color="secondary" dark top right @click="switchMode">
						<v-icon>{{ modeIcon }}</v-icon>
					</v-btn>
				</v-fab-transition>
			</v-row>
			<v-slide-y-transition hide-on-leave>
				<div v-if="mode == 'list'">
					<v-row>
						<v-col v-for="(card, index) in data" :key="index" cols="12" md="6" lg="4">
							<BookingCard v-model="data[index]" @delete="deleteBooking(index)"></BookingCard>
						</v-col>
					</v-row>
				</div>
			</v-slide-y-transition>
			<v-slide-y-transition hide-on-leave>
				<div v-if="mode == 'calendar'">
					<v-row>
						<v-col cols="12" md="6" lg="4">
							<BookingCard></BookingCard>
						</v-col>
						<v-col cols="12" md="6" lg="4">
							<BookingCard></BookingCard>
						</v-col>
						<v-col cols="12" md="6" lg="4">
							<BookingCard></BookingCard>
						</v-col>
					</v-row>
				</div>
			</v-slide-y-transition>
		</v-container>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import BookingCard from './BookingCard.vue';
import Booking from './../models/booking';
import CreateDialog from './CreateDialog.vue';

export default Vue.extend({
	components: { BookingCard, CreateDialog },
	data() {
		return {
			dialog: false,
			mode: '',
			modeIcon: '',
			data: [
				new Booking('Booking 1', '14:00', 'Today', 2, ``, 'Christiaan Landman'),
				new Booking(
					'Booking 2',
					'16:30',
					'Today',
					4,
					`This is a regular client that would like to be waitered by Kevin. This is just test text. So what would the point be?`,
					'Christiaan Landman'
				),
				new Booking('Meetup with the bois @ Ginos', '12:00', 'Saturday', 6, `Heine wants to see everyone again.`, 'Christiaan Landman')
			]
		};
	},
	watch: {
		data: {
			handler: function(newVal): void {
				// We should post the entry that got updated in the child component...
				console.log(newVal);
			},
			deep: true
		}
	},
	created() {
		this.switchMode();
	},
	methods: {
		switchMode(): void {
			const list = 'list';
			const calendar = 'calendar';
			if (this.mode == calendar || this.mode == '') {
				this.mode = list;
				this.modeIcon = 'mdi-calendar-text';
			} else {
				this.mode = calendar;
				this.modeIcon = 'mdi-calendar-month';
			}
		},
		addBooking(booking: Booking): void {
			this.data.push(booking);
		},
		deleteBooking(index: number): void {
			this.data.splice(index, 1);
		}
	}
});
</script>

<style scoped></style>
