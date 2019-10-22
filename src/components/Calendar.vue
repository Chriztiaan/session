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
				<v-menu v-model="selectedOpen" :close-on-content-click="false" :activator="selectedElement" offset-x>
					<v-card class="pa-1" color="primary" width="350">
						<BookingCard></BookingCard>
					</v-card>
				</v-menu>
			</v-sheet>
		</v-col>
	</v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import BookingCard from './BookingCard.vue';
import Booking from './../models/booking';
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
		selectedOpen: false,
		events: [
			{
				name: 'Vacation',
				details: 'Going to the beach!',
				start: '2019-10-29 09:10',
				end: '2019-10-29',
				color: 'blue'
			},
			{
				name: 'Meeting',
				details: 'Spending time on how we do not have enough time',
				start: '2019-01-07 09:00',
				end: '2019-01-07 09:30',
				color: 'indigo'
			},
			{
				name: 'Large Event',
				details: 'This starts in the middle of an event and spans over multiple events',
				start: '2018-12-31',
				end: '2019-01-04',
				color: 'deep-purple'
			},
			{
				name: '3rd to 7th',
				details: 'Testing',
				start: '2019-01-03',
				end: '2019-01-07',
				color: 'cyan'
			},
			{
				name: 'Big Meeting',
				details: 'A very important meeting about nothing',
				start: '2019-01-07 08:00',
				end: '2019-01-07 11:30',
				color: 'red'
			},
			{
				name: 'Another Meeting',
				details: 'Another important meeting about nothing',
				start: '2019-01-07 10:00',
				end: '2019-01-07 13:30',
				color: 'brown'
			},
			{
				name: '7th to 8th',
				start: '2019-01-07',
				end: '2019-01-08',
				color: 'blue'
			},
			{
				name: 'Lunch',
				details: 'Time to feed',
				start: '2019-01-07 12:00',
				end: '2019-01-07 15:00',
				color: 'deep-orange'
			},
			{
				name: '30th Birthday',
				details: 'Celebrate responsibly',
				start: '2019-01-03',
				color: 'teal'
			},
			{
				name: 'New Year',
				details: 'Eat chocolate until you pass out',
				start: '2019-01-01',
				end: '2019-01-02',
				color: 'green'
			},
			{
				name: 'Conference',
				details: 'The best time of my life',
				start: '2019-01-21',
				end: '2019-01-28',
				color: 'grey darken-1'
			},
			{
				name: 'Hackathon',
				details: 'Code like there is no tommorrow',
				start: '2019-01-30 23:00',
				end: '2019-02-01 08:00',
				color: 'black'
			},
			{
				name: 'event 1',
				start: '2019-01-14 18:00',
				end: '2019-01-14 19:00',
				color: '#4285F4'
			},
			{
				name: 'event 2',
				start: '2019-01-14 18:00',
				end: '2019-01-14 19:00',
				color: '#4285F4'
			},
			{
				name: 'event 5',
				start: '2019-01-14 18:00',
				end: '2019-01-14 19:00',
				color: '#4285F4'
			},
			{
				name: 'event 3',
				start: '2019-01-14 18:30',
				end: '2019-01-14 20:30',
				color: '#4285F4'
			},
			{
				name: 'event 4',
				start: '2019-01-14 19:00',
				end: '2019-01-14 20:00',
				color: '#4285F4'
			},
			{
				name: 'event 6',
				start: '2019-01-14 21:00',
				end: '2019-01-14 23:00',
				color: '#4285F4'
			},
			{
				name: 'event 7',
				start: '2019-01-14 22:00',
				end: '2019-01-14 23:00',
				color: '#4285F4'
			}
		]
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
	created() {
		console.log(this.bookingEvents);
	},
	mounted() {
		this.$refs.calendar.checkChange();
	},
	methods: {
		viewDay({ date }): void {
			this.focus = date;
			this.type = 'day';
		},
		getEventColor(event) {
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
			const open = () => {
				this.selectedEvent = event;
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
