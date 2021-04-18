<template>
  <div class="mx-4 md:mx-0">Aborting requests</div>
  <div class="mx-4 bg-white border border-gray-300 rounded-lg shadow-md md:mx-0">
    <div class="block p-4 text-xl font-medium font-heading md:text-xl">API Layer - cancel request example with Axios</div>
    <div class="px-4 pb-4">
      <p class="mb-4">
        Here you can test request cancellation. You can fetch a new quote, but
        if you turn on the Abort toggle, the request will be cancelled.
      </p>
      <div class="flex items-center space-x-4" :class="[quote && 'mb-4']">
        <label class="font-semibold">Abort</label>
        <BaseToggleSwitch v-model="abortRequests" />
      </div>
      <p v-if="quote">{{ quote }}</p>
    </div>
    <div class="px-4 pt-2 pb-4">
      <BaseButton @click.prevent="onFetchQuoteHandler">Fetch quote</BaseButton>
    </div>
  </div>
</template>

<script>
import { fetchRandomQuote } from '@/api/quoteApi'
import { withAsync } from '@/helpers'
import { useToast } from 'vue-toastification'
const toast = useToast()

export default {
  data () {
    return {
      // Flag used to force aborting requests
      abortRequests: false,
      // Store a quite fetched from quotes API via fetchQuote method
      quote: '',
    }
  },
  methods: {
    /**
     * Initialise fetching a quote and
     * immediately abort the request if abortRequests is truthy
     */
    onFetchQuoteHandler () {
      this.fetchQuote()
      if (this.abortRequests) this.$options.abort?.()
    },
    async fetchQuote () {
      const { response, error } = await withAsync(fetchRandomQuote, {
        abort: cancel => (this.$options.abort = cancel),
      })

      // Remove all success/error toasts
      toast.clear()

      // fetchRandomQuote error
      if (error) {
        this.handleQuoteError(error)
        return
      }

      // fetchRandomQuote success
      this.quote = response.data.content
      toast.success('Request was successful!')
    },
    /**
     * Show a toast message on fetchQuote error
     */
    handleQuoteError (error) {
      if (error.aborted) {
        toast.error('Request aborted!')
      } else {
        toast.error('Oops, error!')
      }
    },
  },
}
</script>

<style module></style>
