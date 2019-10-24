<template>
	<v-card color="secondary">
		<v-col>
			<v-sheet height="64">
				<v-toolbar flat color="white">
					<v-btn class="mr-4" color="secondary" @click="setToday">
						Today
					</v-btn>
					<v-btn fab text small @click="prev">
						<v-icon small>mdi-chevron-left</v-icon>
					</v-btn>
					<v-btn fab text small @click="next">
						<v-icon small>mdi-chevron-right</v-icon>
					</v-btn>
					<v-toolbar-title>{{ title }}</v-toolbar-title>
					<v-spacer></v-spacer>
					<v-btn-toggle v-model="type" dense class="mr-2" color="secondary">
						<v-btn value="day">
							<span class="hidden-sm-and-down">Day</span>
							<v-icon>mdi-calendar</v-icon>
						</v-btn>
						<v-btn value="week">
							<span class="hidden-sm-and-down">Week</span>
							<v-icon>mdi-calendar-range</v-icon>
						</v-btn>
						<v-btn value="month">
							<span class="hidden-sm-and-down">Month</span>
							<v-icon>mdi-calendar-month</v-icon>
						</v-btn>
					</v-btn-toggle>
				</v-toolbar>
			</v-sheet>
			<v-sheet height="600">
				<v-calendar
					ref="calendar"
					v-model="focus"
					color="secondary"
					:events="bookingEvents"
					:event-color="getEventColor"
					:event-margin-bottom="3"
					:now="today"
					:type="type"
					@click:event="showEvent"
					@click:more="viewDay"
					@click:date="viewDay"
					@change="updateRange"
				></v-calendar>
				<v-menu v-model="selectedOpen" :close-on-content-click="false" :activator="selectedElement" offset-x max-width="350">
					<v-card class="pa-1" color="primary" width="350">
						<BookingCard v-model="selectedBooking" @delete="deleteBooking"></BookingCard>
					</v-card>
				</v-menu>
			</v-sheet>
		</v-col>
	</v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import BookingCard from './BookingCard.vue';
import moment from 'moment-timezone';

export default Vue.extend({
	components: { BookingCard },
	props: {
		bookings: {
			type: Array,
			default: function(): [] {
				return [];
			}
		}
	},
	data: () => ({
		selectedBooking: null,
		today: new Date().toISOString().substring(0, 10),
		focus: new Date().toISOString().substring(0, 10),
		type: 'month',
		typeToLabel: {
			month: 'Month',
			week: 'Week',
			day: 'Day'
		},
		start: null,
		end: null,
		selectedEvent: {},
		selectedElement: null,
		selectedOpen: false
	}),
	computed: {
		bookingEvents(): any[] {
			const colors = ['red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'cyan', 'teal', 'green', 'lime', 'amber', 'orange', 'deep-orange'];
			const bookingEvents = [];
			for (let booking of this.bookings) {
				booking.name = booking.title;
				booking.start = moment(booking.date).format('YYYY-MM-DD') + ' ' + booking.time;
				booking.end = moment(booking.date).format('YYYY-MM-DD');
				booking.color = colors[Math.floor(Math.random() * colors.length)];
				bookingEvents.push(booking);
			}
			return bookingEvents;
		},
		title(): string {
			const { start, end } = this;
			if (!start || !end) {
				return '';
			}

			const startMonth = this.monthFormatter(start);
			const endMonth = this.monthFormatter(end);
			const suffixMonth = startMonth === endMonth ? '' : endMonth;

			const startYear = start.year;
			const endYear = end.year;
			const suffixYear = startYear === endYear ? '' : endYear;

			const startDay = start.day + this.nth(start.day);
			const endDay = end.day + this.nth(end.day);

			switch (this.type) {
				case 'month':
					return `${startMonth} ${startYear}`;
				case 'week':
				case '4day':
					return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`;
				case 'day':
					return `${startMonth} ${startDay} ${startYear}`;
			}
			return '';
		},
		monthFormatter(): void {
			return this.$refs.calendar.getFormatter({
				timeZone: 'UTC',
				month: 'long'
			});
		}
	},
	mounted() {
		this.$refs.calendar.checkChange();
	},
	methods: {
		deleteBooking(): void {
			this.bookings.splice(this.bookings.findIndex(i => i == this.selectedBooking), 1);
		},
		viewDay({ date }): void {
			this.focus = date;
			this.type = 'day';
		},
		getEventColor(event): any {
			return event.color;
		},
		setToday(): void {
			this.focus = this.today;
		},
		prev(): void {
			this.$refs.calendar.prev();
		},
		next(): void {
			this.$refs.calendar.next();
		},
		showEvent({ nativeEvent, event }): void {
			const open = (): void => {
				this.selectedBooking = event;
				this.selectedElement = nativeEvent.target;
				setTimeout(() => (this.selectedOpen = true), 10);
			};

			if (this.selectedOpen) {
				this.selectedOpen = false;
				setTimeout(open, 10);
			} else {
				open();
			}

			nativeEvent.stopPropagation();
		},
		updateRange({ start, end }): void {
			// You could load events from an outside source (like database) now that we have the start and end dates on the calendar
			this.start = start;
			this.end = end;
		},
		nth(d): any {
			return d > 3 && d < 21 ? 'th' : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][d % 10];
		}
	}
});
</script>
