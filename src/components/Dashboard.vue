<template>
	<div>
		<v-container>
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
				<v-col cols="12" md="6" lg="4">
					<ListCard></ListCard>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import BookingCard from './BookingCard.vue';
import ListCard from './ListCard.vue';

export default Vue.extend({
	components: { BookingCard, ListCard }
});
</script>

<style scoped></style>
