<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'; 
import DetailRow from '@/components/atoms/BaseDetailRow.vue';
import { Dialog, TransitionRoot, TransitionChild } from '@headlessui/vue';
import type { Accident, Video, Spot } from '@/components/molecules/HelpDataRow.vue';

const route = useRoute();
const spotId = route.params.id as string; 
const showButton = route.query.showButton === 'true';

const jsonData = ref<Accident | Video>();
const spot = ref<Spot | null>(null);

// 彈窗控制狀態
const isDialogOpen = ref(false);

// 加載事故詳細資料
onMounted(async () => {
    try {
        const response = await fetch(`/mock/help.json`);
        const data = await response.json();

        jsonData.value = data.data.find((item: Accident) => item.id === spotId) || null;
        if (jsonData.value == null) {
            const response = await fetch(`/mock/video.json`);
            const data = await response.json();
            jsonData.value = data.data.find((item: Video) => item.id === spotId) || null;
        }
        if (jsonData.value == undefined)
            return;
        spot.value = {
            id: jsonData.value.id,
            date: jsonData.value.summary.date,
            coord: { lat: jsonData.value.coordinates.latitude, lng: jsonData.value.coordinates.longitude },
            detail: jsonData.value
        };
    } catch (error) {
        console.error('Error loading accident details:', error);
    }
});

const openDialog = () => {
    isDialogOpen.value = true;
};

const closeDialog = () => {
    isDialogOpen.value = false;
};
</script>

<template>
    <div v-if="spot != null" class="mx-4 my-3">
        <!-- 詳細信息顯示區域 -->
        <div class="flex justify-between items-center">
            <div class="flex gap-2 my-1">
                <div class="text-base font-bold">{{ spot.detail.title }}</div>
            </div>
        </div>

        <!-- 根據是否有 bluetooth 屬性來顯示不同的信息 -->
        <div v-if="'bluetooth' in spot.detail">
            <div class="text-sm my-1.5 space-y-1.5">
                <DetailRow label="報案編號" :value="spot.detail.summary.report_id" />
                <DetailRow label="事故地區" :value="spot.detail.summary.area" />
                <DetailRow label="事故地點" :value="spot.detail.summary.location" />
                <DetailRow label="日期" :value="spot.detail.summary.date" />
                <DetailRow label="時間" :value="spot.detail.summary.time" />
                <DetailRow label="交通事故類別" :value="spot.detail.summary.accident_type" />
            </div>

            <hr>
            <div class="my-3 mx-4 space-y-1.5">
                <div class="font-bold">事故說明</div>
                <div>
                    <p>{{ spot.detail.description }}</p>
                </div>
            </div>
        </div>

        <!-- 無 bluetooth 屬性的內容展示 -->
        <div v-else class="h-fit">
            <div class="text-sm my-1.5 space-y-1.5">
                <DetailRow label="事故地區" :value="spot.detail.summary.area" />
                <DetailRow label="事故地點" :value="spot.detail.summary.location" />
                <DetailRow label="日期" :value="spot.detail.summary.date" />
                <DetailRow label="時間" :value="spot.detail.summary.time" />
            </div>
            <div class="pt-4 flex justify-center items-center">
                <img :src="spot.detail.link" alt="image" class="w-full rounded-md">
            </div>
            <div class="px-4 flex justify-center items-center">
                <button
                    class="box-border bg-primary-500 fixed bottom-7 w-10/12 h-12 nw text-white font-bold rounded-md">
                    下載影片
                </button>
            </div>
               
        </div>

    </div>

    <!-- 底部的按鈕區域 -->
    <div v-if="spot && 'bluetooth' in spot.detail" class="fixed bottom-7 w-screen flex flex-col items-center space-y-4">
        <!-- 提供影像協助按鈕 -->
        <RouterLink :to="{ name: 'upload2' }"
            class="bg-primary-500 w-[87%] h-12 flex items-center justify-center text-center text-white font-bold py-2 px-4 rounded-md">
            提供影像協助
        </RouterLink>

        <!-- 無法提供影像按鈕，點擊後打開彈窗 -->
        <button v-if="showButton" @click="openDialog"
            class="border border-primary-500 text-primary-500 w-[87%] h-12 flex items-center justify-center text-center font-bold py-2 px-4 rounded-md bg-white">
            無法提供影像
        </button>
    </div>

    <!-- 成功提交的彈窗 -->
    <TransitionRoot appear :show="isDialogOpen" as="template">
        <Dialog as="div" class="relative z-10" @close="closeDialog">
            <!-- 背景半透明遮罩 -->
            <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>

            <!-- 對話框外層 -->
            <div class="fixed inset-0 z-10 overflow-y-auto">
                <!-- 使用 flexbox 使內容垂直和水平居中 -->
                <div class="flex min-h-full items-center justify-center p-4 text-center">
                    <!-- 在 TransitionChild 上添加 `as="div"` -->
                    <TransitionChild
                        as="div"
                        enter="ease-out duration-300"
                        enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95"
                    >
                        <!-- DialogPanel 的內容也居中 -->
                        <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 shadow-xl transition-all flex flex-col items-center justify-center">
                            <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900 text-center">
                                謝謝您的回報
                            </DialogTitle>
                            
                            <!-- 圖片區域 -->
                            <div class="flex items-center justify-center mt-2 text-center w-60 h-60">
                                <img src="@/assets/images/success.svg" alt="成功提交" class="w-28 h-28 object-contain" />
                            </div>

                            <div class="mt-4">
                                <RouterLink :to="{ name: 'videoreport' }">
                                    <button @click="closeDialog" class="bg-primary-500 text-white font-bold py-2 px-4 rounded-md">
                                        確認
                                    </button>
                            </RouterLink>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

