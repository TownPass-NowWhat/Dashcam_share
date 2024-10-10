<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { useConnectionMessage } from '@/composables/useConnectionMessage';
import { useHandleConnectionData } from '@/composables/useHandleConnectionData';
import { useFormStore } from '@/stores/form';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import type { User } from '@/stores/user';

const store = useFormStore();

store.reset();

const userStore = useUserStore();

const { user } = storeToRefs(userStore);

const handleUserInfo = (event: { data: string }) => {
  const result: { name: string; data: User } = JSON.parse(event.data);

  user.value = result.data;
};

useConnectionMessage('userinfo', null);

useHandleConnectionData(handleUserInfo);

const route = useRoute();

export interface Service {
  link?: string,
  icon?: URL,
  title?: string,
  desc?: string,
}
const serviceList = ref<Service[]>([{
  link: "security-cam-map",
  icon: new URL("@/assets/images/security-camera.svg", import.meta.url),
  title: "監視器地圖",
  desc: "查看可提供幫助的監視器"
}, {
  link: "dash-cam-map",
  icon: new URL("@/assets/images/pin-marker.svg", import.meta.url),
  title: "行車紀錄共享地圖",
  desc: "可於此查詢其他使用者公開的事故影像"
}, {
  link: "policy",
  icon: new URL("@/assets/images/traffic-jam.svg", import.meta.url),
  title: "交通互助聯盟",
  desc: "加入後可接收其他使用者發布的請求。"
}, 
// {
//   link: "expand",
//   icon: new URL("@/assets/images/stars.svg", import.meta.url),
//   title: "展開列表(刻板用)",
//   desc: "展開列表(刻板用)"
// },{
//   link: "monitorexpand",
//   icon: new URL("@/assets/images/stars.svg", import.meta.url),
//   title: "監視器展開列表(刻板用)",
//   desc: "監視器展開列表(刻板用)"
// },
])
</script>

<template>
  <main>
    <div class="p-2" v-for="service in serviceList" :key="service.title">
      <RouterLink :to="{ name: service.link }" class="flex items-center p-4 px-6 rounded-lg gap-4">
        <img :src="service.icon.href" class="transition-transform" v-if="service.icon != undefined">
        <div>
          <h2 class="font-semibold">{{ service.title }}</h2>
          <p class="text-sm">{{ service.desc }}</p>
        </div>
      </RouterLink>
    </div>
  </main>
</template>
