<template>
	<div>
		<v-app-bar color="primary" dark>
			<v-app-bar-nav-icon></v-app-bar-nav-icon>

			<v-toolbar-title>Sessions</v-toolbar-title>

			<div class="flex-grow-1"></div>

			<v-btn icon class="mx-2">
				<v-icon>mdi-magnify</v-icon>
			</v-btn>

			<v-menu left bottom>
				<template v-slot:activator="{ on }">
					<v-btn class="ml-2 mr-4" icon v-on="on">
						<v-avatar color="secondary" size="42">
							<span class="white--text headline">CL</span>
						</v-avatar>
					</v-btn>
				</template>

				<v-list>
					<v-list-item v-for="n in 5" :key="n" @click="() => {}">
						<v-list-item-title>Option {{ n }}</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-menu>
		</v-app-bar>
	</div>
</template>
