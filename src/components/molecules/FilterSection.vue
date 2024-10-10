<script setup lang="ts">
import { ref, defineEmits } from 'vue'

const emit = defineEmits(['close', 'apply'])

export interface FilterItem {
    name: string;
    data: {
        [key: string]: boolean | false;
    };
}

const props = defineProps<{
    modelValue: boolean,
    values: FilterItem[]
}>()

const localFilters = ref(props.values.map(d => ({ ...d })) as FilterItem[])


const resetFilters = () => {
    localFilters.value.forEach(f => Object.keys(f.data).forEach(key => f.data[key] = false))
}

const applyFilters = () => {
    const filters: { [key: string]: string[] } = {};
    localFilters.value.forEach(filter => {
        Object.keys(filter.data).forEach(key => {
            if (filter.data[key]) {
                if (!(filter.name in filters))
                    filters[filter.name] = []
                // Only keep the keys where the value is true
                filters[filter.name].push(key);
            }
        });

    });
    emit('apply', filters)
    close()
}

const close = () => {
    emit('close', false);
}
</script>

<template>
    <div v-if="modelValue" class="fixed inset-0 bg-black bg-opacity-50 flex flex-col justify-end overscroll-none">
        <div class=" w-screen flex h-[8%] flex-row items-center justify-end">
            <div class="bg-white px-3 h-full flex items-center pt-1 ">
                <button class="bg-primary-500 p-1 rounded-lg h-10 w-10 flex justify-center items-center "
                    @click="close">
                    <img src="@/assets/images/filter.svg" alt="篩選器" />
                </button>
            </div>
        </div>
        <div class="bg-white w-screen h-[92%] max-w-screen flex flex-col">
            <div class="flex-1 overflow-y-auto pt-2 scroll-smooth">
                <div class="p-2 px-4" v-for="filter in localFilters" :key="filter.name">
                    <h3 class="text-xl font-semibold mb-2">{{ filter.name }}</h3>
                    <div class="grid grid-cols-2 gap-3 mb-4 px-3">
                        <button v-for="key in Object.keys(filter.data)" :key="key"
                            @click="filter.data[key] = !filter.data[key]" :class="[
                                'h-14 py-2 px-4 rounded-md text-md',
                                filter.data[key] ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-800'
                            ]">
                            {{ key }}
                        </button>
                    </div>
                </div>
            </div>
            <div class="flex gap-4 p-3 px-6 w-scree h-20" style="box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.1);">
                <button @click="resetFilters"
                    class="w-1/3 px-4 py-2 border-2 border-primary-500 text-primary-500 rounded-md">
                    重設
                </button>
                <button @click="applyFilters" class="flex-1 px-4 py-2 bg-primary-500 text-white rounded-md">
                    搜尋
                </button>
            </div>
        </div>
    </div>
</template>