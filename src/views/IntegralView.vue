<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
// import { useGoogleMapsStore } from '@/stores/googleMaps'; // 保留有意義的 imports
// import axios from 'axios';
// import { MarkerClusterer, SuperClusterAlgorithm } from '@googlemaps/markerclusterer';
// import greenDotIconUrl from '/public/images/map/youbike/mappin-green.svg';
// import defaultFocusIconUrl from '/public/images/map/icon_mappin-garbagetruck-green-pressed.svg';
// import { mappingFormatter, getNestedValue } from '@/utils/spot-formatter';
import BaseButton from '@/components/atoms/BaseButton.vue';

const isChecked = ref(false); // 綁定 checkbox 的狀態

// 根據需要調整這部分的邏輯
</script>

<template>
<div class="bg-primary-100 p-5 rounded-lg mt-4 ml-6 mr-6 flex justify-between items-center">
  <p class="text-md font-bold">您的積分</p>
  <div class="flex items-center">
    <img src="@/assets/images/blue_shield.svg" alt="award" class="w-9 h-9 mr-2" />
    <p class="text-4xl text-gray-950 font-semibold">72</p>
  </div>
</div>
<div class="space-y-0">
  <!-- List Item 1 -->
  <div class="p-5 mt-4 ml-6 mr-6 flex justify-between items-center border-b border-gray-300">
    <div>
      <p class="text-gray-900 font-medium font-semibold">回應影像協尋</p>
      <p class="text-gray-500 text-sm">2024-09-02</p>
    </div>
    <div class="flex items-center">
      <img src="@/assets/images/blue_shield.svg" alt="award" class="w-5 h-5 mr-2" />
      <div class="w-8">
        <p class="text-gray-950 text-lg font-semibold">+2</p>
      </div>
    </div>
  </div>
  <div class="p-5 mt-4 ml-6 mr-6 flex justify-between items-center border-b border-gray-300">
    <div>
      <p class="text-gray-900 font-medium font-semibold">回應影像協尋</p>
      <p class="text-gray-500 text-sm">2024-09-02</p>
    </div>
    <div class="flex items-center">
      <img src="@/assets/images/blue_shield.svg" alt="award" class="w-5 h-5 mr-2" />
      <div class="w-8">
        <p class="text-gray-950 text-lg font-semibold">+2</p>
      </div>
    </div>
  </div>
  <div class="p-5 mt-4 ml-6 mr-6 flex justify-between items-center border-b border-gray-300">
    <div>
      <p class="text-gray-900 font-medium font-semibold">回應影像協尋</p>
      <p class="text-gray-500 text-sm">2024-09-02</p>
    </div>
    <div class="flex items-center">
      <img src="@/assets/images/blue_shield.svg" alt="award" class="w-5 h-5 mr-2" />
      <div class="w-8">
        <p class="text-gray-950 text-lg font-semibold">+2</p>
      </div>
    </div>
  </div>

  <div class="p-5 mt-4 ml-6 mr-6 flex justify-between items-center border-b border-gray-300">
    <div>
      <p class="text-gray-900 font-medium font-semibold">未回應影像協尋</p>
      <p class="text-gray-500 text-sm">2024-09-02</p>
    </div>
    <div class="flex items-center">
      <img src="@/assets/images/red_shield.svg" alt="award" class="w-5 h-5 mr-2" />
      <div class="w-8 text-center">
        <p class="text-gray-950 text-lg font-semibold">-1</p>
      </div>
    </div>
  </div>
  
  <div class="p-5 mt-4 ml-6 mr-6 flex justify-between items-center border-b border-gray-300">
    <div>
      <p class="text-gray-900 font-medium font-semibold">回應影像協尋</p>
      <p class="text-gray-500 text-sm">2024-09-02</p>
    </div>
    <div class="flex items-center">
      <img src="@/assets/images/blue_shield.svg" alt="award" class="w-5 h-5 mr-2" />
      <div class="w-8">
        <p class="text-gray-950 text-lg font-semibold">+2</p>
      </div>
    </div>
  </div>

  <div class="p-5 mt-4 ml-6 mr-6 flex justify-between items-center border-b border-gray-300">
    <div>
      <p class="text-gray-900 font-medium font-semibold">未回應影像協尋</p>
      <p class="text-gray-500 text-sm">2024-09-02</p>
    </div>
    <div class="flex items-center">
      <img src="@/assets/images/red_shield.svg" alt="award" class="w-5 h-5 mr-2" />
      <div class="w-8 text-center">
        <p class="text-gray-950 text-lg font-semibold">-1</p>
      </div>
    </div>
  </div>
  <div class="p-5 mt-4 ml-6 mr-6 flex justify-between items-center border-b border-gray-300">
    <div>
      <p class="text-gray-900 font-medium font-semibold">未回應影像協尋</p>
      <p class="text-gray-500 text-sm">2024-09-02</p>
    </div>
    <div class="flex items-center">
      <img src="@/assets/images/red_shield.svg" alt="award" class="w-5 h-5 mr-2" />
      <div class="w-8 text-center">
        <p class="text-gray-950 text-lg font-semibold">-1</p>
      </div>
    </div>
  </div>
  <div class="p-5 mt-4 ml-6 mr-6 flex justify-between items-center border-b border-gray-300">
    <div>
      <p class="text-gray-900 font-medium font-semibold">回應影像協尋</p>
      <p class="text-gray-500 text-sm">2024-09-02</p>
    </div>
    <div class="flex items-center">
      <img src="@/assets/images/blue_shield.svg" alt="award" class="w-5 h-5 mr-2" />
      <div class="w-8">
        <p class="text-gray-950 text-lg font-semibold">+2</p>
      </div>
    </div>
  </div>

  <div class="p-5 mt-4 ml-6 mr-6 flex justify-between items-center border-b border-gray-300">
    <div>
      <p class="text-gray-900 font-medium font-semibold">未回應影像協尋</p>
      <p class="text-gray-500 text-sm">2024-09-02</p>
    </div>
    <div class="flex items-center">
      <img src="@/assets/images/red_shield.svg" alt="award" class="w-5 h-5 mr-2" />
      <div class="w-8 text-center">
        <p class="text-gray-950 text-lg font-semibold">-1</p>
      </div>
    </div>
  </div>
  <div class="p-5 mt-4 ml-6 mr-6 flex justify-between items-center border-b border-gray-300">
    <div>
      <p class="text-gray-900 font-medium font-semibold">回應影像協尋</p>
      <p class="text-gray-500 text-sm">2024-09-02</p>
    </div>
    <div class="flex items-center">
      <img src="@/assets/images/blue_shield.svg" alt="award" class="w-5 h-5 mr-2" />
      <div class="w-8">
        <p class="text-gray-950 text-lg font-semibold">+2</p>
      </div>
    </div>
  </div>
  <div class="p-5 mt-4 ml-6 mr-6 flex justify-between items-center border-b border-gray-300">
    <div>
      <p class="text-gray-900 font-medium font-semibold">回應影像協尋</p>
      <p class="text-gray-500 text-sm">2024-09-02</p>
    </div>
    <div class="flex items-center">
      <img src="@/assets/images/blue_shield.svg" alt="award" class="w-5 h-5 mr-2" />
      <div class="w-8">
        <p class="text-gray-950 text-lg font-semibold">+2</p>
      </div>
    </div>
  </div>
  <div class="p-5 mt-4 ml-6 mr-6 flex justify-between items-center border-b border-gray-300">
    <div>
      <p class="text-gray-900 font-medium font-semibold">回應影像協尋</p>
      <p class="text-gray-500 text-sm">2024-09-02</p>
    </div>
    <div class="flex items-center">
      <img src="@/assets/images/blue_shield.svg" alt="award" class="w-5 h-5 mr-2" />
      <div class="w-8">
        <p class="text-gray-950 text-lg font-semibold">+2</p>
      </div>
    </div>
  </div>
  <div class="p-5 mt-4 ml-6 mr-6 flex justify-between items-center border-b border-gray-300">
    <div>
      <p class="text-gray-900 font-medium font-semibold">回應影像協尋</p>
      <p class="text-gray-500 text-sm">2024-09-02</p>
    </div>
    <div class="flex items-center">
      <img src="@/assets/images/blue_shield.svg" alt="award" class="w-5 h-5 mr-2" />
      <div class="w-8">
        <p class="text-gray-950 text-lg font-semibold">+2</p>
      </div>
    </div>
  </div>

  <div class="p-5 mt-4 ml-6 mr-6 flex justify-between items-center border-b border-gray-300">
    <div>
      <p class="text-gray-900 font-medium font-semibold">未回應影像協尋</p>
      <p class="text-gray-500 text-sm">2024-09-02</p>
    </div>
    <div class="flex items-center">
      <img src="@/assets/images/red_shield.svg" alt="award" class="w-5 h-5 mr-2" />
      <div class="w-8 text-center">
        <p class="text-gray-950 text-lg font-semibold">-1</p>
      </div>
    </div>
  </div>
  <div class="p-5 mt-4 ml-6 mr-6 flex justify-between items-center border-b border-gray-300">
    <div>
      <p class="text-gray-900 font-medium font-semibold">回應影像協尋</p>
      <p class="text-gray-500 text-sm">2024-09-02</p>
    </div>
    <div class="flex items-center">
      <img src="@/assets/images/blue_shield.svg" alt="award" class="w-5 h-5 mr-2" />
      <div class="w-8">
        <p class="text-gray-950 text-lg font-semibold">+2</p>
      </div>
    </div>
  </div>

  <div class="p-5 mt-4 ml-6 mr-6 flex justify-between items-center border-b border-gray-300">
    <div>
      <p class="text-gray-900 font-medium font-semibold">未回應影像協尋</p>
      <p class="text-gray-500 text-sm">2024-09-02</p>
    </div>
    <div class="flex items-center">
      <img src="@/assets/images/red_shield.svg" alt="award" class="w-5 h-5 mr-2" />
      <div class="w-8 text-center">
        <p class="text-gray-950 text-lg font-semibold">-1</p>
      </div>
    </div>
  </div>
  <div class="p-5 mt-4 ml-6 mr-6 flex justify-between items-center border-b border-gray-300">
    <div>
      <p class="text-gray-900 font-medium font-semibold">回應影像協尋</p>
      <p class="text-gray-500 text-sm">2024-09-02</p>
    </div>
    <div class="flex items-center">
      <img src="@/assets/images/blue_shield.svg" alt="award" class="w-5 h-5 mr-2" />
      <div class="w-8">
        <p class="text-gray-950 text-lg font-semibold">+2</p>
      </div>
    </div>
  </div>
  <div class="p-5 mt-4 ml-6 mr-6 flex justify-between items-center border-b border-gray-300">
    <div>
      <p class="text-gray-900 font-medium font-semibold">回應影像協尋</p>
      <p class="text-gray-500 text-sm">2024-09-02</p>
    </div>
    <div class="flex items-center">
      <img src="@/assets/images/blue_shield.svg" alt="award" class="w-5 h-5 mr-2" />
      <div class="w-8">
        <p class="text-gray-950 text-lg font-semibold">+2</p>
      </div>
    </div>
  </div>
  <div class="p-5 mt-4 ml-6 mr-6 flex justify-between items-center border-b border-gray-300">
    <div>
      <p class="text-gray-900 font-medium font-semibold">回應影像協尋</p>
      <p class="text-gray-500 text-sm">2024-09-02</p>
    </div>
    <div class="flex items-center">
      <img src="@/assets/images/blue_shield.svg" alt="award" class="w-5 h-5 mr-2" />
      <div class="w-8">
        <p class="text-gray-950 text-lg font-semibold">+2</p>
      </div>
    </div>
  </div>
  <div class="p-5 mt-4 ml-6 mr-6 flex justify-between items-center border-b border-gray-300">
    <div>
      <p class="text-gray-900 font-medium font-semibold">回應影像協尋</p>
      <p class="text-gray-500 text-sm">2024-09-02</p>
    </div>
    <div class="flex items-center">
      <img src="@/assets/images/blue_shield.svg" alt="award" class="w-5 h-5 mr-2" />
      <div class="w-8">
        <p class="text-gray-950 text-lg font-semibold">+2</p>
      </div>
    </div>
  </div>
  <div class="p-5 mt-4 ml-6 mr-6 flex justify-between items-center border-b border-gray-300">
    <div>
      <p class="text-gray-900 font-medium font-semibold">回應影像協尋</p>
      <p class="text-gray-500 text-sm">2024-09-02</p>
    </div>
    <div class="flex items-center">
      <img src="@/assets/images/blue_shield.svg" alt="award" class="w-5 h-5 mr-2" />
      <div class="w-8">
        <p class="text-gray-950 text-lg font-semibold">+2</p>
      </div>
    </div>
  </div>
  <div class="p-5 mt-4 ml-6 mr-6 flex justify-between items-center border-b border-gray-300">
    <div>
      <p class="text-gray-900 font-medium font-semibold">回應影像協尋</p>
      <p class="text-gray-500 text-sm">2024-09-02</p>
    </div>
    <div class="flex items-center">
      <img src="@/assets/images/blue_shield.svg" alt="award" class="w-5 h-5 mr-2" />
      <div class="w-8">
        <p class="text-gray-950 text-lg font-semibold">+2</p>
      </div>
    </div>
  </div>
  <div class="p-5 mt-4 ml-6 mr-6 flex justify-between items-center border-b border-gray-300">
    <div>
      <p class="text-gray-900 font-medium font-semibold">回應影像協尋</p>
      <p class="text-gray-500 text-sm">2024-09-02</p>
    </div>
    <div class="flex items-center">
      <img src="@/assets/images/blue_shield.svg" alt="award" class="w-5 h-5 mr-2" />
      <div class="w-8">
        <p class="text-gray-950 text-lg font-semibold">+2</p>
      </div>
    </div>
  </div>
  <div class="p-5 mt-4 ml-6 mr-6 flex justify-between items-center border-b border-gray-300">
    <div>
      <p class="text-gray-900 font-medium font-semibold">未回應影像協尋</p>
      <p class="text-gray-500 text-sm">2024-09-02</p>
    </div>
    <div class="flex items-center">
      <img src="@/assets/images/red_shield.svg" alt="award" class="w-5 h-5 mr-2" />
      <div class="w-8 text-center">
        <p class="text-gray-950 text-lg font-semibold">-1</p>
      </div>
    </div>
  </div>
</div>

</template>

<style scoped></style>