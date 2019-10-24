<template>
	<v-card class="bookingcard" :class="{ 'pl-2': !booking.isPending(), error: booking.isCancelled(), success: booking.isApproved() }">
		<v-card>
			<v-card-title class="pt-2 pb-0">
				<v-text-field v-model="booking.title" :readonly="dense" class="title" label="Booking Name" dense single-line :rules="[rules.required]" color="secondary">
				</v-text-field>
			</v-card-title>
			<v-card-text>
				<v-row class="black--text" no-gutters="">
					<span>{{ booking.time }} <v-icon color="secondary">mdi-clock-outline</v-icon></span>
					<span class="ml-2">{{ date }} <v-icon color="secondary">mdi-calendar-month</v-icon></span>
					<v-spacer></v-spacer>
					<span>
						<span v-if="!dense">
							<v-btn :disabled="booking.attendees == 0" style="margin-right: -2px" icon x-small @click="booking.attendees--">
								<v-icon>mdi-minus-circle-outline</v-icon>
							</v-btn>
							<v-btn icon x-small @click="booking.attendees++">
								<v-icon>mdi-plus-circle-outline</v-icon>
							</v-btn>
						</span>
						<span class="mt-1">
							{{ booking.attendees }}
						</span>
						<v-icon color="secondary">mdi-account-multiple</v-icon>
					</span>
				</v-row>
				<template v-if="!dense">
					<div>
						<v-textarea v-model="booking.description" placeholder="Description..." class="body-2" no-resize dense :rows="3" solo flat hide-details></v-textarea>
					</div>
				</template>
			</v-card-text>
			<v-card-actions v-if="!dense" class="pr-1">
				<v-row no-gutters>
					<v-col class="pb-0" cols="12" sm="8">
						<v-avatar size="42">
							<v-img class="elevation-2" src="https://api.adorable.io/avatars/285/hahaha.png"></v-img>
						</v-avatar>
						{{ booking.creator }}
					</v-col>
					<v-col class="pb-0" cols="8" offset="4" offset-sm="0" sm="4">
						<span class="d-flex " :class="{ 'float-right': !$vuetify.breakpoint.xs }">
							<v-tooltip v-if="booking.isPending()" top>
								<template v-slot:activator="{ on }">
									<v-btn icon large @click="approve" v-on="on">
										<v-icon color="success">mdi-check-circle-outline</v-icon>
									</v-btn>
								</template>
								<span> Approve </span>
							</v-tooltip>
							<v-tooltip top>
								<template v-slot:activator="{ on }">
									<v-btn class="ml-1" icon large @click="cancel" v-on="on">
										<v-icon v-if="booking.isPending()" color="error">mdi-close-circle-outline</v-icon>
										<v-icon v-if="booking.isCancelled() || booking.isApproved()" color="warning lighten-2">mdi-dots-horizontal-circle-outline</v-icon>
									</v-btn>
								</template>
								<span>
									<span v-if="!booking.isPending()">Move back to Pending</span>
									<span v-else>Cancel</span>
								</span>
							</v-tooltip>
							<v-tooltip top>
								<template v-slot:activator="{ on }">
									<v-btn class="ml-1" icon large @click="deleteCard" v-on="on">
										<v-icon color="">mdi-delete-circle-outline</v-icon>
									</v-btn>
								</template>
								<span> Move to trash </span>
							</v-tooltip>
						</span>
					</v-col>
				</v-row>
			</v-card-actions>
		</v-card>
	</v-card>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import Booking from './../models/booking';
import moment from 'moment-timezone';

export default Vue.extend({
	props: {
		value: {
			type: Object as PropType<Booking>,
			default: function(): Booking {
				return new Booking('Booking Test', '00:00', new Date(), 0, `Test description`, 'Test creator');
			}
		}
	},
	data() {
		return {
			rules: {
				required: (value): any => !!value || 'Required'
			},
			dense: false,
			booking: null
		};
	},
	computed: {
		date(): string {
			// 1. Is yesterday?
			const yesterday = new Date();
			yesterday.setDate(yesterday.getDate() - 1);
			if (yesterday.toDateString() == this.booking.date.toDateString()) {
				return 'Yesterday';
			}
			// 2. Is today?
			const today = new Date();
			if (today.toDateString() == this.booking.date.toDateString()) {
				return 'Today';
			}

			// 3. Is tomorrow?
			const tomorrow = new Date();
			tomorrow.setDate(tomorrow.getDate() + 1);
			if (tomorrow.toDateString() == this.booking.date.toDateString()) {
				return 'Tomorrow';
			}
			return moment(this.booking.date).format('dddd, D MMMM');
		}
	},
	watch: {
		booking(newVal): void {
			this.$emit('input', newVal);
		},
		value(newVal): void {
			this.booking = newVal;
		}
	},
	created() {
		this.booking = this.value;
	},
	methods: {
		deleteCard(): void {
			this.$emit('delete');
		},
		approve(): void {
			this.booking.approve();
		},
		cancel(): void {
			if (this.booking.isCancelled() || this.booking.isApproved()) {
				this.booking.pending();
			} else {
				this.booking.cancel();
			}
		}
	}
});
</script>

<style>
div.v-input__slot {
	padding-left: 0px !important;
	color: red !important;
}

.bookingcard textarea {
	margin-top: 0px !important;
	padding-top: 0px !important;
	color: rgba(0, 0, 0, 0.54) !important;
	letter-spacing: 0.1px;
}
</style>
