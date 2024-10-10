<script setup lang="ts">
import HelpDataRow from '@/components/molecules/HelpDataRow.vue';

</script>

<template>
  <div class="mx-4 my-3">
    <div class="flex justify-between items-center">
      <div class="flex gap-2">
        <div class="text-base font-bold">台北市</div>
        <div class="border-2 border-primary-500 text-primary-500 rounded-full p-1 text-xs">40筆相關結果</div>
      </div>
      <div><button class="bg-primary-500 w-8 rounded p-1"><img src="../assets/images/icon-tune.png" alt=""></button>
      </div>
    </div>
    <div class="text-sm my-1.5 space-y-1.5">
      <div class="flex justify-between">
        <div>圖標類別</div>
        <div>全選</div>
      </div>
      <div class="flex justify-between">
        <div>地區</div>
        <div>全選</div>
      </div>
    </div>
    <hr>
    <HelpDataRow></HelpDataRow>

  </div>
</template>
