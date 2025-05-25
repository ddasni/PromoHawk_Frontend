<template>
  <div class="config-item">
    <label class="label-switch">{{ label }}</label>
    <input
      type="checkbox"
      :checked="modelValue"
      @change="updateValue"
      class="switch"
    />
  </div>
</template>

<script setup>
defineProps({
  label: String,
  modelValue: Boolean,
})

const emit = defineEmits(['update:modelValue'])

function updateValue(event) {
  emit('update:modelValue', event.target.checked)
}
</script>

<style scoped>
.label-switch {
  font-size: 16px;
  color: #333;
}

.switch {
  width: 22px;
  height: 22px;
  accent-color: #007bff;
  cursor: pointer;
}

.config-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}
</style>

