<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter } from 'vue-router'; // 引入 useRouter

// 定義資料結構
interface Summary {
  report_id: string;
  area: string;
  location: string;
  date: string;
  time: string;
  accident_type: string;
}

interface Accident {
  id: string;
  summary: Summary;
  title: string;
  description: string;
  document_type: string;
  bluetooth: boolean;
  hot: boolean;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

// 保存從 JSON 加載的資料
const accidentData = ref<Accident[]>([]);
const router = useRouter(); // 使用 router 進行導航

// 在組件加載後取得資料
onMounted(async () => {
  try {
    const response = await fetch("/mock/help.json");
    if (response.ok) {
      const data = await response.json();
      accidentData.value = data.data;
    } else {
      console.error("Failed to fetch data");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

// 點擊行導向到詳情頁面
const goToDetails = (id: string, showButton: boolean) => {
  router.push({ 
    name: 'DetailsPage', 
    params: { id },  // 傳遞 id
    query: { showButton: showButton ? 'true' : 'false' }  // 傳遞 showButton 參數
  });
};

// 計算屬性來篩選出有 bluetooth 的行並排序
const bluetoothAccidents = computed(() => {
  return accidentData.value
    .filter(accident => accident.bluetooth) // 僅顯示有 bluetooth 的資料
    .sort((a, b) => {
      if (a.bluetooth && a.hot) return -1;
      if (b.bluetooth && b.hot) return 1;

      if (a.bluetooth) return -1;
      if (b.bluetooth) return 1;

      if (a.hot) return -1;
      if (b.hot) return 1;

      return 0;
    });
});
</script>
<template>
  <div>
    <!-- 迴圈渲染篩選和排序後的資料，並且每行可以點擊 -->
    <div v-for="(accident) in bluetoothAccidents" :key="accident.id" class="my-3">
      <!-- 點擊行觸發 goToDetails -->
      <div @click="goToDetails(accident.id,true)" class="cursor-pointer flex justify-between text-sm my-2 mx-3">
        <div class="my-1 space-y-1.5">
          <div class="text-base font-bold">{{ accident.title }}</div>
          <div class="flex">
            <div>
              {{ accident.summary.date }} | {{ accident.summary.area }} | {{ accident.summary.accident_type }}
            </div>
          </div>
        </div>
        <div class="flex gap-2 items-center">
          <!-- 動態顯示火焰圖示 -->
          <div v-if="accident.hot" class="w-5">
            <img src="@/assets/images/fire.png" alt="Hot">
          </div>
          <!-- 動態顯示藍牙圖示 -->
          <div v-if="accident.bluetooth" class="w-5">
            <img src="@/assets/images/bluetooth.png" alt="Bluetooth">
          </div>
        </div>
      </div>
      <hr />
    </div>
  </div>
</template>
