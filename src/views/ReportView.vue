<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import ApplyServiceInfoForm from '@/components/molecules/ApplyServiceInfoForm.vue';
import BaseButton from '@/components/atoms/BaseButton.vue';
import { Dialog, DialogPanel, DialogTitle, TransitionRoot, TransitionChild } from '@headlessui/vue';
import { useFormStore } from '@/stores/form';
import formJSON from '../../public/mock/report_form.json';

const triggerValidate = ref(false);  // 用於觸發表單驗證
const isDialogOpen = ref(false);     // 控制彈窗是否顯示
const router = useRouter();          // 獲取 Vue Router 的實例

const store = useFormStore();
const { formFormat } = storeToRefs(store);
formFormat.value = formJSON;

const form = ref<{ form: any; isValidate: boolean }>();  // 單個表單

// 送出通報的動作
const onSubmitClick = () => {
  console.log('送出按鈕被點擊'); // 調試輸出
  triggerValidate.value = true;

  console.log('表單驗證狀態:', form.value?.isValidate); // 調試表單是否通過驗證

  // if (form.value?.isValidate) {
  //   // 表單驗證通過後顯示成功彈窗
  //   console.log('表單驗證成功，顯示彈窗');
  //   isDialogOpen.value = true;

  //   // TODO: 將表單數據發送給後端 API
  // } else {
  //   console.log('表單驗證失敗');
  // }
  isDialogOpen.value = true;
};

// 當步驟改變時，自動滾動到頁面頂部
watch(isDialogOpen, () => {
  if (window) {
    window.scrollTo({
      top: 0
    });
  }
});

// 導航到影像需求頁面
const goToVideo = () => {
  isDialogOpen.value = false; // 關閉彈窗
  router.push("/details/A20240907005?showButton=false"); // 導航到影像需求頁面
};
</script>

<template>
  <div class="pb-8">
    <form @submit.stop="">
      <div class="w-full h-0 bg-grey-50"></div>
      <ApplyServiceInfoForm
        :triggerValidate="triggerValidate"
        @onFormChange="(value) => (form = value)"
      />
      <div class="grid grid-cols-1 gap-x-2 px-2 font-semibold">
        <BaseButton @click="onSubmitClick">送出通報</BaseButton>
      </div>
    </form>

    <!-- 成功提交的彈窗 -->
    <TransitionRoot appear :show="isDialogOpen" as="template">
    <Dialog as="div" class="relative z-10" @close="isDialogOpen = false">
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
                通報成功
              </DialogTitle>
              
              <!-- 使用圖片替換文字 -->
              <div class="flex items-center justify-center mt-2 text-center w-60 h-60">
                <img src="@/assets/images/success.svg" alt="成功提交" class="w-28 h-28 object-contain" />
              </div>

              <div class="mt-4">
                <BaseButton @click="goToVideo">確認</BaseButton> <!-- 點擊確認跳轉回首頁 -->
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
  </div>
</template>
