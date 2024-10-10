<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'; // 使用 useRoute 來獲取路由參數
import DetailRow from '@/components/atoms/BaseDetailRow.vue';

// 定義假資料的類型
interface Summary {
  area: string;
  location: string;
  date: string;
  time: string;
}

interface Accident {
  id: string;
  summary: Summary;
  title: string;
  document_type: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  link: string; // 新增 link 欄位
}

const route = useRoute();
const accidentId = route.params.id as string; // 獲取事故 id

const accidentDetail = ref<Accident | null>(null); // 為 accidentDetail 指定類型

// 加載事故詳細資料
onMounted(async () => {
    try {
        const response = await fetch(`/mock/monitor.json`); // 載入假資料的路徑
        const data = await response.json();
        accidentDetail.value = data.data.find((item: Accident) => item.id === accidentId) || null;
    } catch (error) {
        console.error('Error loading accident details:', error);
    }
});
</script>

<template>
  <div v-if="accidentDetail" class="mx-4 my-3">
    <div class="flex justify-between items-center">
      <div class="flex gap-2 my-1">
        <div class="text-base font-bold">{{ accidentDetail.title }}</div>
      </div>
    </div>
    
    <!-- 顯示報案細節 -->
    <div class="text-sm my-1.5 space-y-1.5">
      <DetailRow label="事故地區" :value="accidentDetail.summary.area" />
      <DetailRow label="事故地點" :value="accidentDetail.summary.location" />
      <DetailRow label="日期" :value="accidentDetail.summary.date" />
      <DetailRow label="時間" :value="accidentDetail.summary.time" />
    </div>

    <hr>

    <!-- 顯示事故說明 -->
    <div class="my-3 mx-4 space-y-1.5">
      <div class="font-bold">事故說明</div>
      <div>
        <p>這是一個假設的描述內容，描述了事故的情況。</p>
      </div>
    </div>

    <hr />

    <!-- 顯示 link 圖片 -->
    <div class="my-3 mx-4">
      <div class="font-bold">相關影片</div>
      <img :src="`/assets/images/${accidentDetail.link}`" alt="Accident Video" class="mt-2 w-full" />
    </div>

    <div class="fixed bottom-7 w-screen flex flex-col items-center space-y-4">
    <!-- 提供影像協助按鈕 -->
    <button
        class="bg-primary-500 w-[87%] h-12 flex items-center justify-center text-center text-white font-bold py-2 px-4 rounded-md">
      提供影像協助
    </button>
    </div>
  </div>
</template>
