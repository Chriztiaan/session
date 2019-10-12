<template>
	<div>
		<v-container>
			<v-row no-gutters>
				<v-spacer></v-spacer>
				<v-fab-transition>
					<v-btn class="mr-2" color="secondary" dark top right>
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

export default Vue.extend({
	components: { BookingCard },
	data() {
		return {
			mode: '',
			modeIcon: ''
		};
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
		}
	}
});
</script>

<style scoped></style>
