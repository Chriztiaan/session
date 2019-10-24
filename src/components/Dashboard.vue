<template>
	<div>
		<v-container>
			<v-row no-gutters>
				<span class="headline mt-2"> {{ title }} </span>
				<v-spacer></v-spacer>
				<CreateDialog v-model="dialog" @submit="addBooking"></CreateDialog>
				<v-fab-transition>
					<v-tooltip bottom>
						<template v-slot:activator="{ on }">
							<v-btn class="mr-2" color="secondary" dark top right @click="dialog = true" v-on="on">
								<v-icon>mdi-plus</v-icon>
							</v-btn>
						</template>
						<span>Create new booking</span>
					</v-tooltip>
				</v-fab-transition>
				<v-fab-transition>
					<v-tooltip bottom>
						<template v-slot:activator="{ on }">
							<v-btn color="secondary" dark top right @click="switchMode" v-on="on">
								<v-icon>{{ modeIcon }}</v-icon>
							</v-btn>
						</template>
						<span v-if="mode == 'calendar'">View booking list</span>
						<span v-else>View calendar</span>
					</v-tooltip>
				</v-fab-transition>
			</v-row>
			<v-divider class="mt-2"></v-divider>
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
						<v-col cols="12">
							<Calendar :bookings="data"></Calendar>
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
import Calendar from './Calendar.vue';

export default Vue.extend({
	components: { BookingCard, CreateDialog, Calendar },
	data() {
		return {
			dialog: false,
			mode: '',
			title: '',
			modeIcon: '',
			data: [
				new Booking('Booking 1', '14:00', new Date(), 2, ``, 'Christiaan Landman'),
				new Booking(
					'Booking 2',
					'16:30',
					new Date('2019-10-16'),
					4,
					`This is a regular client that would like to be waitered by Kevin. This is just test text. So what would the point be?`,
					'Christiaan Landman'
				),
				new Booking('Meetup with the bois @ Ginos', '12:00', new Date(), 6, `Heine wants to see everyone again.`, 'Christiaan Landman')
			]
		};
	},
	watch: {},
	created() {
		this.switchMode();
	},
	methods: {
		switchMode(): void {
			const list = 'list';
			const calendar = 'calendar';
			// || this.mode == ''
			if (this.mode == calendar) {
				this.mode = list;
				this.title = 'Bookings';
				this.modeIcon = 'mdi-calendar-month';
			} else {
				this.mode = calendar;
				this.title = 'Calendar';
				this.modeIcon = 'mdi-calendar-text';
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
