<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter } from 'vue-router'; // 引入 useRouter

// 定義資料結構
export interface AccidentSummary {
  report_id: string;
  area: string;
  location: string;
  date: string;
  time: string;
  accident_type: string;
}

export interface Accident {
  id: string;
  summary: AccidentSummary;
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

export interface VideoSummary {
  area: string;
  location: string;
  date: string;
  time: string;
}
export interface Video {
  id: string;
  summary: VideoSummary;
  title: string;
  link: string;
  document_type: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface Spot {
  id: string;
  date: string;
  coord: {
    lat: number;
    lng: number;
  }
  detail: Video | Accident;
}

// 保存從 JSON 加載的資料
const accidentData = ref<Accident[]>([]);
const videoData = ref<Video[]>([]);

const spotList = ref<Spot[]>([]);

const router = useRouter(); // 使用 router 進行導航

// 在組件加載後取得資料
onMounted(async () => {
  try {
    const response = await fetch("/mock/help.json");
    if (response.ok) {
      const data = await response.json();
      accidentData.value = data.data as Accident[];
      accidentData.value.forEach(item => spotList.value.push({
        id: item.id,
        date: item.summary.date,
        coord: { lat: item.coordinates.latitude, lng: item.coordinates.longitude },
        detail: item
      }));
    } else {
      console.error("Failed to fetch data");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  try {
    const response = await fetch("/mock/video.json");
    if (response.ok) {
      const data = await response.json();
      videoData.value = data.data;
      videoData.value.forEach(item => spotList.value.push({
        id: item.id,
        date: item.summary.date,
        coord: { lat: item.coordinates.latitude, lng: item.coordinates.longitude },
        detail: item
      }));
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

// 計算屬性來對資料進行排序
const sortedSpots = computed(() => {
  // eslint-disable-next-line vue/no-side-effects-in-computed-properties
  return spotList.value.sort((a, b) => {
    if ('bluetooth' in a.detail && 'bluetooth' in b.detail) {
      if (a.detail.bluetooth && a.detail.hot) return -1;
      if (b.detail.bluetooth && b.detail.hot) return 1;

      if (a.detail.bluetooth) return -1;
      if (b.detail.bluetooth) return 1;

      if (a.detail.hot) return -1;
      if (b.detail.hot) return 1;
    }

      return 0;
    });
});
</script>


<template>
  <div>
    <!-- 迴圈渲染排序後的資料，並且每行可以點擊 -->
    <div v-for="(spot) in sortedSpots" :key="spot.id" class="my-3">
      <!-- 點擊行觸發 goToDetails -->
      <div @click="goToDetails(spot.id,false)" class="cursor-pointer flex justify-between text-sm my-2 mx-3">
        <div class="my-1 space-y-1.5">
          <div class="text-base font-bold">{{ spot.detail.title }}</div>
          <div class="flex">
            <div>
              {{ spot.detail.summary.date }} |
              <span v-if="spot.detail.document_type=='協尋'" class="text-red-400 font-bold">{{ spot.detail.document_type }}</span> <span v-else class="text-blue-400 font-bold">{{ spot.detail.document_type }}</span> |
              {{ spot.detail.summary.area }} | {{ 'bluetooth' in spot.detail ? spot.detail.summary.accident_type : "" }}
            </div>
          </div>
        </div>
        <div class="flex gap-2 items-center">
          <!-- 動態顯示火焰圖示 -->
          <div v-if="'bluetooth' in spot.detail && spot.detail.hot" class="w-5">
            <img src="@/assets/images/fire.png" alt="Hot">
          </div>
          <!-- 動態顯示藍牙圖示 -->
          <div v-if="'bluetooth' in spot.detail && spot.detail.bluetooth" class="w-5">
            <img src="@/assets/images/bluetooth.png" alt="Bluetooth">
          </div>
        </div>
      </div>
      <hr />
    </div>
  </div>
</template>

