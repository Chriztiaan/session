<template>
	<v-card :class="{ 'pl-2': !booking.isPending(), error: booking.isCancelled(), success: booking.isApproved() }">
		<v-card>
			<v-card-title>{{ booking.title }} </v-card-title>
			<v-card-text>
				<v-row class="black--text" no-gutters="">
					<span>{{ booking.time }} <v-icon color="secondary">mdi-clock-outline</v-icon></span>
					<span class="ml-2">{{ booking.date }} <v-icon color="secondary">mdi-calendar-month</v-icon></span>
					<v-spacer></v-spacer>
					<span>{{ booking.attendees }} <v-icon color="secondary">mdi-account-multiple</v-icon></span>
				</v-row>
				<template v-if="!dense">
					{{ booking.information }}
				</template>
			</v-card-text>
			<v-card-actions v-if="!dense" class="pr-1">
				<v-row no-gutters>
					<v-col class="pb-0" cols="12" sm="8">
						<v-avatar size="42">
							<v-img
								class="elevation-2"
								src="https://avataaars.io/?accessoriesType=Prescription02&avatarStyle=Transparent&clotheColor=Gray02&clotheType=Hoodie&eyeType=Default&eyebrowType=DefaultNatural&facialHairType=Blank&hairColor=BrownDark&mouthType=Default&skinColor=Light&topType=ShortHairShortRound"
							></v-img>
						</v-avatar>
						{{ booking.creator }}
					</v-col>
					<v-col class="pb-0" cols="8" offset="4" offset-sm="0" sm="4">
						<span class="d-flex " :class="{ 'float-right': !$vuetify.breakpoint.xs }">
							<v-btn v-if="booking.isPending()" icon large @click="approve">
								<v-icon color="success">mdi-check-circle-outline</v-icon>
							</v-btn>
							<v-btn class="ml-1" icon large @click="cancel">
								<v-icon v-if="booking.isPending()" color="error">mdi-close-circle-outline</v-icon>
								<v-icon v-if="booking.isCancelled() || booking.isApproved()" color="warning lighten-2">mdi-dots-horizontal-circle-outline</v-icon>
							</v-btn>
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

export default Vue.extend({
	props: {
		bookingProp: {
			type: Object as PropType<Booking>,
			default: function(): Booking {
				return new Booking(
					'Booking Name',
					'16:30',
					'Today',
					4,
					`This is a regular client that would like to be waitered by Kevin.
				
				This is just test text. So what would the point be?`,
					'Christiaan Landman'
				);
			}
		}
	},
	data() {
		return {
			dense: false,
			booking: null
		};
	},
	created() {
		this.booking = this.bookingProp;
	},
	methods: {
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
