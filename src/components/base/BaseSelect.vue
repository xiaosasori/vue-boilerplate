<template>
  <label :for="uuid" v-if="label">{{ label }}</label>
  <select
    class="field"
    :id="uuid"
    :value="modelValue"
    v-bind="{
      ...$attrs,
      onChange: ($event) => { $emit('update:modelValue', $event.target.value) }
    }"
  >
    <option
      v-for="option in options"
      :value="option"
      :key="option"
      :selected="option === modelValue"
    >{{ option }}</option>
  </select>
</template>

<script>
import { getRandomUUID } from '@/helpers'
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [String, Number],
      default: ''
    },
    options: {
      type: Array,
      required: true
    }
  },
  setup () {
    const uuid = getRandomUUID()
    return { uuid }
  }
}
</script>
