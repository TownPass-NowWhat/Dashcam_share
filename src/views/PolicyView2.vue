<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { useConnectionMessage } from '@/composables/useConnectionMessage';
import { useHandleConnectionData } from '@/composables/useHandleConnectionData';
import { useFormStore } from '@/stores/form';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import HeaderView from '@/components/organisms/HeaderView.vue'
import type { User } from '@/stores/user';

const router = useRouter();          // 獲取 Vue Router 的實例

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

// const route = useRoute();

export interface Service {
  link?: string,
  icon?: URL,
  title?: string,
  desc?: string,
}
const serviceList = ref<Service[]>([])

serviceList.value.push({
  link: "videoreport", //TODO: 記得換link
  icon: new URL("@/assets/images/ring.svg", import.meta.url),
  title: "影像協尋回報",
  desc: "回應有無影片可協助其他使用者，回應後可累積積分"
}, {
  link: "integral", //TODO: 記得換link
  icon: new URL("@/assets/images/stars.svg", import.meta.url),
  title: "聯盟榮譽積分",
  desc: "積分若達一定分數後，將獲得聯盟榮譽勳章，並置頂您的車禍影片協尋"
})
</script>

<template>
  <main>
    <div class="m-1" v-for="service in serviceList" :key="service.title">
      <RouterLink :to="{ name: service.link }" class="flex items-center p-4 px-6 mb-1 rounded-lg gap-4">
        <img :src="service.icon.href" class="transition-transform mr-4 h-11" v-if="service.icon != undefined">
        <div>
          <h2 class="font-semibold mb-2 text-lg">{{ service.title }}</h2>
          <p class="text-sm">{{ service.desc }}</p>
        </div>
      </RouterLink>
    </div>
  </main>
</template>
