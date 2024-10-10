<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router'; // 引入 useRouter 來導航

// 定義資料結構
interface Coordinates {
  latitude: number;
  longitude: number;
}

interface Monitor {
  monitor_id: string;
  road_name: string;
  address: string;
  unit_category: string;
  unit: string;
  unit_contact_phone: string;
  unit_email: string;
  coordinates: Coordinates;
  area: string;
  road_type: string;
}

// 保存從 JSON 加載的資料
const monitorData = ref<Monitor[]>([]);
const router = useRouter(); // 使用 router 進行導航

// 在組件加載後取得資料
onMounted(async () => {
  try {
    const response = await fetch("/mock/monitor.json"); // 假設你的 JSON 文件位於這裡
    if (response.ok) {
      const data = await response.json();
      monitorData.value = data.data; // 更新為監視器資料
    } else {
      console.error("Failed to fetch data");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

// 點擊行導向到詳情頁面
const goToDetails = (monitor_id: string) => {
  router.push({ name: 'monitorDetails', params: { monitor_id } }); // 導向到 /details/:monitor_id 頁面
};

// 計算屬性來對資料進行排序
const sortedMonitors = computed(() => {
  // eslint-disable-next-line vue/no-side-effects-in-computed-properties
  return monitorData.value.sort((a, b) => {
    return a.monitor_id.localeCompare(b.monitor_id); // 根據 monitor_id 進行排序
  });
});
</script>

<template>
  <div>
    <!-- 迴圈渲染排序後的監視器資料，並且每行可以點擊 -->
    <div v-for="(monitor) in sortedMonitors" :key="monitor.monitor_id" class="my-3">
      <!-- 點擊行觸發 goToDetails -->
      <div @click="goToDetails(monitor.monitor_id)" class="cursor-pointer flex justify-between text-sm my-2 mx-3">
        <div class="my-1 space-y-1.5">
          <div class="text-base font-bold">{{ monitor.road_name }}</div>
          <div class="flex text-sm items-center">
            <div><img src="@/assets/images/map-marker.svg" alt="Map Marker" class="mr-2"/></div>
            <div>{{ monitor.address }}</div>
          </div>
          <div class="text-grey-700">
            {{ monitor.area }} | {{ monitor.unit }} | {{ monitor.road_type }}
          </div>
        </div>
      </div>
      <hr />
    </div>
  </div>
</template>
