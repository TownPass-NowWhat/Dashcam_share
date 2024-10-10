<script setup lang="ts">
// 接收父組件傳入的 props
defineProps({
  label: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  }
});
</script>
<template>
    <div class="flex justify-between">
      <div>{{ label }}</div>
      <div>{{ value }}</div>
    </div>
  </template>
  
