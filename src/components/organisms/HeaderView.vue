<script setup lang="ts">

const props = withDefaults(defineProps<{ title?: string; cross?: boolean; return?: string }>(), {
    title: "交通互助聯盟",
    cross: true,
    return: undefined
});
</script>

<template>
    <header class="flex items-center bg-primary-500 h-9 box-border">
        <RouterLink :to="{ name: props.return }" v-if="props.return != undefined">
            <img src="@/assets/images/prev-icon.svg" class="w-4 h-4 mx-3.5">
        </RouterLink>
        <div v-else class="h-4 w-4 mx-3.5"></div>
        <p class="text-base flex-grow text-center text-white font-semibold">{{ props.title }}</p>
        <RouterLink :to="{ name: 'home' }" v-if="props.cross">
            <img src="@/assets/images/cross-icon.svg" class="w-4 h-4 mx-3.5">
        </RouterLink>
        <div v-else class="h-4 w-4 mx-3.5"></div>
    </header>
</template>