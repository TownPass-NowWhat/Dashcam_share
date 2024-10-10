<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
// import { useGoogleMapsStore } from '@/stores/googleMaps'; // 保留有意義的 imports
import axios from 'axios';
// import { MarkerClusterer, SuperClusterAlgorithm } from '@googlemaps/markerclusterer';
// import greenDotIconUrl from '/public/images/map/youbike/mappin-green.svg';
// import defaultFocusIconUrl from '/public/images/map/icon_mappin-garbagetruck-green-pressed.svg';
// import { mappingFormatter, getNestedValue } from '@/utils/spot-formatter';
import BaseButton from '@/components/atoms/BaseButton.vue';


const router = useRouter();          // 獲取 Vue Router 的實例

// 定義一個變數來存儲 API 是否成功返回
// const apiSuccess = ref(false);

const isChecked = ref(false); // 綁定 checkbox 的狀態


async function checkAndRedirect() {
  try {
    
    // 調用後端 API 檢查參數
    axios.get('http://127.0.0.1:5000/api/status')
      .then(response => {
        console.log(response.data);

        if (response.data.firstTime) {
          console.log('參數為 true，停留在當前頁面');
        } else {
          console.log('參數為 false，跳轉至其他頁面');
          router.push({ name: 'policy2' }); // 跳轉至其他頁面
        }
      })
      .catch(error => {
        console.error(error);
      });

    // const response = await axios.get('http://127.0.0.1:5000/api/status');

    
  } catch (error) {
    console.error('API 調用失敗:', error);
  }
}

// 組件加載時調用 API
onMounted(() => {
  // checkAndRedirect();
});

// 調用 API 的函數
async function update_userData() {
  // try {
  //   // 調用 API  
  //   // https://glowworm-wealthy-alpaca.ngrok-free.app/  
  //   // https://wise-mainly-hare.ngrok-free.app
  //   // https://localhost:5000/
  //   // https://127.0.0.1:5000/
  //   // axios.defaults.baseURL = 'http://127.0.0.1:5000';

  //   axios.get('http://127.0.0.1:5000/api/update')
  //     .then(response => {
  //       // 檢查 API 回傳的狀態碼是否為 200
  //       if (response.status === 200) {
  //         console.log('API 返回 200，繼續執行程式');
  //         // apiSuccess.value = true;
  //         router.push({ name: 'policy2' });
  //       }
  //     })
  //     .catch(error => {
  //     console.error(error);
  //   });
  // } catch (error) {
  //   console.error('API 調用失敗:', error);
  // }
  
  router.push({ name: 'policy2' });
}


// 跳轉至policy2的函數
const goToPolicy2 = () => {
  if (isChecked.value) { // 只有在 checkbox 勾選時，才調用 API
    update_userData();
  }
  // router.push({ name: 'policy2' });
};

// 根據需要調整這部分的邏輯
</script>

<template>
  <div class="bg-grey-100 p-4 rounded-lg mt-4 ml-6 mr-6 space-y-1.5">
    <h3 class="text-lg text-black">何謂交通互助聯盟</h3>
    <p class="text-sm text-gray-600">透過藍芽技術，紀錄聯盟成員間的接觸紀錄，<br>當車禍發生後，系統將通知當時附近的聯盟成員，詢問是否有車禍相關的影片。</p>
    <p class="text-sm text-gray-600">成員們彼此互相幫助，協助提供車禍畫面，系統的精準推播，讓您能為交通正義盡一份心力！</p>
  </div>
  <div class="bg-grey-100 p-4 rounded-lg mt-4 ml-6 mr-6 space-y-1.5">
    <h3 class="text-lg text-black">交通互助聯盟執行規範</h3>
    <p class="text-sm text-gray-600">成為交通互助聯盟的成員後，需常態性開啟<span class="text-primary-500 font-bold"> 藍芽功能 </span>，台北通將以匿名的方式記錄您與其他成員的接觸紀錄。</p>
    <p class="text-sm text-gray-600">當您將收到發生於您附近的車禍影片協尋時，您將需要回應是否有相關影片。</p>
    <p class="text-sm text-gray-600"><span class="font-bold">聯盟榮譽積分</span>預設為50分，每回應一次<span class="text-red-500 font-bold"> 協尋 </span>加2分，若未回應則扣1分。</p>
    <p class="text-sm text-gray-600">積分大於100分後，將獲得<span class="text-secondary-600 font-bold"><img
          src="@/assets/images/award.png" alt="award" class="inline-block w-5 h-5 ml-1 align-middle">聯盟榮譽勳章</span></p>
    <p class="text-sm text-gray-600">未來您的車禍影片協尋，將置頂於搜尋列表中。</p>
  </div>
  <div class="flex items-center mt-4 ml-6 mr-6 pl-1">
    <input type="checkbox" id="agreement" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" v-model="isChecked"/>
    <label for="agreement" class="text-sm text-gray-700 ml-2">
      我<span class="text-primary-500 font-semibold">已閱讀並同意</span>遵守以上內容
    </label>
  </div>
  <!-- class="grid grid-cols-1 gap-x-2 px-6 font-semibold" -->
  <!-- class="fixed bottom-0 left-0 w-full bg-blue-500 text-white p-4" -->
  <div class="grid grid-cols-1 fixed bottom-5 left-0 w-full p-4 font-semibold">
    <BaseButton
      :disabled="!isChecked"
      @click="goToPolicy2"
      class="w-full"
      :class="{'bg-gray-400': !isChecked, 'bg-primary-500': isChecked}"
    >
      確定加入
    </BaseButton>
  </div>
</template>

<style scoped></style>
