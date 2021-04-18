<template>
  <div v-show="showLoader">
    <slot />
  </div>
</template>

<script>
import { ref, watch, computed } from 'vue'
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    delay: {
      type: Number,
      default: 2000,
    },
  },
  setup (props) {
    // Flag for locking the loader show at least props.delay time
    const locked = ref(false)

    // Run any time loader should be switched on or off
    watch(
      () => props.show,
      show => {
        // Start show loader timeout
        if (show) {
          locked.value = true
          setTimeout(() => {
            locked.value = false
          }, props.delay)
        }
      }
    )

    const showLoader = computed(() => {
      return locked.value || (!locked.value && props.show)
    })

    return {
      showLoader,
    }
  },
}
</script>

<style module></style>
