<template>
  <div id="app" class="bg-gray-100">
    <!-- <GlobalSpinnerProvider> -->
      <ExamplesLayout>
        <div id="nav"></div>
        <router-view />
      </ExamplesLayout>
    <!-- </GlobalSpinnerProvider> -->
  </div>
</template>
<script>
import ExamplesLayout from '@/layout/ExamplesLayout'
// import GlobalSpinnerProvider from '@/components/common/spinner/GlobalSpinnerProvider.vue'
// import { setUser } from '@/services/stateful/userService'

/**
 * Set user name for Managing State / Stateful Services example
 */
// setUser({
//   name: 'William',
// })

export default {
  components: {
    ExamplesLayout,
  //   GlobalSpinnerProvider,
  },
}
</script>
