<template>
  <div class="relative">
    <div
      v-show="isGlobalSpinnerVisible"
      class="fixed top-0 bottom-0 left-0 right-0 z-40 flex items-center justify-center min-h-screen bg-gray-900 min-w-screen bg-opacity-40"
    >
      <div
        class="flex items-center justify-center w-64 h-48 bg-white rounded-lg"
      >
        <!-- Spinner -->
        <svg
          class="w-12 h-12 text-indigo-700 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    </div>
    <slot />
  </div>
</template>

<script>
import { ref, readonly, provide, inject } from 'vue'

// Unique symbol used for provide/inject
export const GLOBAL_SPINNER = Symbol('GLOBAL_SPINNER')

// To be used to access state and methods to change state
export const useGlobalSpinner = () => {
  const value = inject(GLOBAL_SPINNER)

  if (!value) {
    throw new Error(
      'useGlobalSpinner must be used inside of the <GlobalSpinnerProvider /> component.'
    )
  }

  return value
}

export default {
  setup () {
    const isGlobalSpinnerVisible = ref(false)

    // Methods to update the state
    const setGlobalSpinnerOn = () => (isGlobalSpinnerVisible.value = true)
    const setGlobalSpinnerOff = () => (isGlobalSpinnerVisible.value = false)
    const toggleGlobalSpinner = () =>
      (isGlobalSpinnerVisible.value = !isGlobalSpinnerVisible.value)

    // Provide the state and methods to change it
    provide(GLOBAL_SPINNER, {
      isGlobalSpinnerVisible: readonly(isGlobalSpinnerVisible),
      setGlobalSpinnerOn,
      setGlobalSpinnerOff,
      toggleGlobalSpinner,
    })

    // Return the state so the overlay with spinner can be shown
    // when set to true
    return {
      isGlobalSpinnerVisible,
    }
  },
}
</script>

<style module></style>
