<script setup lang="ts">
import { ref, reactive, onMounted, watch, computed } from 'vue';
import { storeToRefs } from 'pinia';
import BaseInput from '@/components/atoms/BaseInput.vue';
import BaseSelect from '@/components/atoms/BaseSelect.vue';
import BaseMultipleSelect from '@/components/atoms/BaseMultipleSelect.vue';
import BaseTextarea from '@/components/atoms/BaseTextarea.vue';
import BaseRadio from '@/components/atoms/BaseRadio.vue';
import BaseCheckbox from '@/components/atoms/BaseCheckbox.vue';
import DatePicker from '@/components/molecules/DateTimePicker.vue';
import UploadSection from '@/components/molecules/UploadSection.vue';
import { useFormStore } from '@/stores/form';
import { city } from '@/zipcode/city';
import { county } from '@/zipcode/county';



// 接收父組件傳入的屬性
const props = withDefaults(
  defineProps<{
    triggerValidate?: boolean;
  }>(),
  {
    triggerValidate: false
  }
);

// 定義事件傳遞方法
const emit = defineEmits(['onFormChange']);

const store = useFormStore();

const { formFormat } = storeToRefs(store);

const isExpand = ref(true);

// 用來追蹤必填字段
const formValidateFieldMap = computed(() => 
  new Map(
    formFormat.value.data.form_format.map((item: { field: any; required: any }) => [
      item.field,
      item.required
    ])
  )
);


// 反應式表單數據
const form = reactive<any>({});

// 初始化表單字段
const handleForm = () => {
  formFormat.value.data.form_format.forEach((item: any) => {
    switch (item.type) {
      case 'input':
      case 'select_1':
      case 'select_2':
      case 'textarea':
      case 'select':
        form[item.field] = '';
        break;
      case 'multiple_select':
      case 'checkbox_group':
        form[item.field] = [];
        break;
      case 'date_picker':
        form[item.field] = null;
        break;
      default:
        form[item.field] = '';
    }
  });
};

// 在組件掛載時初始化表單
onMounted(() => {
  handleForm();
});

// 動態監聽表單數據的變化
watch(
  () => form,
  () => {
    const isValidate = Object.keys(form).every((key) => {
      const required = formValidateFieldMap.value.get(key);
      const value = form[key];

      // 驗證邏輯：必填字段不為空，且針對不同類型字段有不同邏輯
      if (required) {
        if (Array.isArray(value)) {
          return value.length > 0;  // 對於多選或複選，檢查是否至少有一個選項被選中
        }
        return !!value;  // 對於單一輸入框，檢查是否有值
      }
      return true;  // 非必填項目
    });

    // 傳遞表單數據與驗證結果給父組件
    emit('onFormChange', {
      isValidate,
      form
    });
  },
  { deep: true }
);

// 選擇縣市與鄉鎮區的邏輯
const countyOptions = computed(() => county.map((item) => ({ label: item.name, value: item.id })));
const cityOptions = computed(() =>
  form.county
    ? city
        .filter((item) => item.county === form.county)
        .map((item) => ({ label: item.city, value: item.city }))
    : []
);

// 重置城市選項當縣市變化時
watch(
  () => form.county,
  () => {
    form.city = '';
  }
);
</script>

<template>
  <section>
    <div class="py-5 px-4">
      <button class="w-full flex justify-between items-center" @click.prevent="isExpand = !isExpand">
        <div class="flex items-end">
          <img src="@/assets/images/fill-in.svg" class="transition-transform" />
          <span class="text-primary-500 font-bold ml-2">填寫交通事故資料</span>
        </div>
        <img src="@/assets/images/down-icon-primary.svg" class="transition-transform" :class="{'rotate-180': isExpand}" />
      </button>
      <div class="grid grid-rows-[0fr] transition-all" :class="{'grid-rows-[1fr]': isExpand}">
        <div class="overflow-hidden flex flex-col gap-4 pt-5">
          <!-- 動態渲染表單 -->
          <div v-for="(item, index) in formFormat.data.form_format" :key="index">
            <!-- type = input -->
            <div v-if="item.type === 'input'" class="flex flex-col">
              <label :for="item.field" class="field-label font-semibold">{{ item.label }}<span v-if="item.required">*</span></label>
              <BaseInput v-model="form[item.field]" :id="item.field" class="w-full" :label="item.label" :triggerValidate="props.triggerValidate" :required="true" :placeholder="`${item.placeholder}`" />
            </div>
            <!-- type = select_1 (縣市) -->
            <div v-else-if="item.type === 'select_1'" class="flex flex-col">
              <label :for="item.field" class="field-label font-semibold">{{ item.label }}<span v-if="item.required">*</span></label>
              <BaseSelect v-model="form.county" :selectId="item.field" :required="item.required" :options="countyOptions" :triggerValidate="props.triggerValidate" :default-selected="item.default_option" class="w-full" />
            </div>
            <!-- type = select_2 (鄉鎮市區) -->
            <div v-else-if="item.type === 'select_2'" class="flex flex-col">
              <label :for="item.field" class="field-label font-semibold">{{ item.label }}<span v-if="item.required">*</span></label>
              <BaseSelect v-model="form.city" :selectId="item.field" :required="item.required" :options="cityOptions" :triggerValidate="props.triggerValidate" :default-selected="item.default_option" class="w-full" />
            </div>
            <!-- type = date_picker -->
            <div v-else-if="item.type === 'date_picker'" class="flex flex-col">
              <p class="field-label font-semibold">{{ item.label }}<span v-if="item.required">*</span></p>
              <DatePicker v-model="form[item.field]" :required="item.required" :triggerValidate="props.triggerValidate" />
            </div>
            <!-- type = upload -->
            <div v-else-if="item.type === 'upload'" class="flex flex-col">
              <UploadSection :file-max="item.upload_max_files" :title="item.label" :required="item.required" :triggerValidate="props.triggerValidate" />
            </div>
            <!-- radio  -->
            <!-- <div class="flex flex-wrap gap-4">
              <BaseRadio
                v-for="option in item.options"
                :key="option.value"
                :radioName="item.field"
                :radioId="option.value"
                :radioText="option.label"
                :required="item.required"
                :triggerValidate="props.triggerValidate"
                v-model="form[item.field]"
              />
            </div> -->
            <div v-else-if="item.type === 'checkbox_group'" class="flex flex-col">
              <!-- <label :for="item.field" class="field-label">
                {{ item.label }}<span v-if="item.required">*</span>
              </label> -->
              
              <div class="flex flex-wrap gap-2">
                <!-- 遍歷每個選項，並使用 BaseCheckbox 組件渲染 -->
                <BaseCheckbox
                  class="font-semibold py-5"
                  v-for="option in item.options"
                  :key="option.value"
                  :option="option"
                  v-model="form[item.field]"
                  :required="item.required"
                  :triggerValidate="props.triggerValidate"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
