<template>
  <div>
    <div class="block mx-4 mb-4 text-2xl font-medium md:mx-0 font-heading ">API Status Handling</div>
    <ApiStatusHandling />
    <UseApiExample />
  </div>
</template>

<script>
import ApiStatusHandling from './ApiStatusHandling'
import UseApiExample from './UseApiExample'
export default {
  name: 'ApiStatusExample',
  components: {
    ApiStatusHandling,
    UseApiExample
  },
  data () {
    return {}
  },
  computed: {},
  methods: {}
}
</script>

<style module></style>
