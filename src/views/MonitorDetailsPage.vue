<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'; // 使用 useRoute 來獲取路由參數
import DetailRow from '@/components/atoms/BaseDetailRow.vue'; // 引入 DetailRow 組件

// 定義監視器資料的類型
export interface Monitor {
  monitor_id: string;
  road_name: string;
  address: string;
  unit_category: string;
  unit: string;
  unit_contact_phone: string;
  unit_email: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  area: string;
  road_type: string;
}

const route = useRoute();
const monitorId = route.params.monitor_id as string; // 從路由參數中獲取 monitor_id
console.log(monitorId);

// 獲取當前網址的路徑
// const path = window.location.pathname;
// const monitorId = path.split('/').pop(); // 獲取路徑中的最後一個片段
// console.log(monitorId);

const monitorDetail = ref<Monitor | null>(null); // 保存監視器的詳細資料

// 在組件加載後取得對應的監視器資料
onMounted(async () => {
  try {
    const response = await fetch('/mock/monitor.json'); // 加載監視器資料
    const data = await response.json();
    monitorDetail.value = data.data.find((item: Monitor) => item.monitor_id === monitorId) || null;
  } catch (error) {
    console.error('Error loading monitor details:', error);
  }
});
</script>

<template>
  <div v-if="monitorDetail" class="mx-4 my-3">

    <div class="my-1 space-y-1.5">
      <div class="text-base font-bold">{{ monitorDetail.road_name }}</div>
      <div class="flex text-sm items-center">
        <div><img src="@/assets/images/map-marker.svg" alt="Map Marker" class="mr-2" /></div>
        <div>{{ monitorDetail.address }}</div>
      </div>
      <div class="text-grey-700">
        {{ monitorDetail.area }} | {{ monitorDetail.unit }} | {{ monitorDetail.road_type }}
      </div>
    </div>
    <hr />

    <div class="text-sm my-1.5 space-y-1.5">
      <div class="font-bold">管理單位資料</div>
      <DetailRow label="管理單位" :value="monitorDetail.unit" />
      <DetailRow label="連絡電話" :value="monitorDetail.unit_contact_phone" />
      <DetailRow label="Email" :value="monitorDetail.unit_email" />
    </div>
  </div>

  <div v-else>
    <p>Loading...</p>
  </div>
</template>
