<template>
  <div class="flex flex-col">
    <div class="flex justify-between mb-4">
      <p>Set API status</p>
      <p>Current status: {{ status }}</p>
    </div>
    <div class="flex space-x-2">
      <BaseButton
        @click.prevent="$emit('change-status', apiStatus.IDLE)"
        :class="$style.idleButton"
        >Idle</BaseButton
      >
      <BaseButton
        @click.prevent="$emit('change-status', apiStatus.PENDING)"
        :class="$style.pendingButton"
        >Pending</BaseButton
      >
      <BaseButton
        @click.prevent="$emit('change-status', apiStatus.SUCCESS)"
        :class="$style.successButton"
        >Success</BaseButton
      >
      <BaseButton
        @click.prevent="$emit('change-status', apiStatus.ERROR)"
        :class="$style.errorButton"
        >Error</BaseButton
      >
    </div>
  </div>
</template>
<script>
import { apiStatus } from '@/api'

export default {
  props: {
    status: {
      type: Symbol,
      required: true
    }
  },
  created () {
    this.apiStatus = apiStatus
  }
}
</script>
<style lang="scss" module>
.idleButton {
  @apply bg-indigo-100 text-indigo-700 border border-indigo-700;

  &:hover {
    @apply text-indigo-800 bg-indigo-100;
  }
}

.pendingButton {
  @apply bg-green-100 text-green-700 border border-green-700;
  &:hover {
    @apply text-green-800 bg-green-200;
  }
}

.successButton {
  @apply bg-green-600 text-green-100;

  &:hover {
    @apply bg-green-700;
  }
}

.errorButton {
  @apply bg-red-700;
  &:hover {
    @apply bg-red-800;
  }
}
</style>
