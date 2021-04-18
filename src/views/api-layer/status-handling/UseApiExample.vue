<template>
  <div class="mx-4 mb-4 bg-white border border-gray-300 rounded-lg shadow-md md:mx-0">
    <div class="block p-4 text-xl font-medium font-heading md:text-xl">useApi example</div>
    <div class="px-4 pb-4">
      <!-- Idle -->
      <div v-if="fetchDogStatusIdle">
        Press the button to fetch a nice dog.
      </div>
      <!-- Pending -->
      <span v-show="fetchDogStatusPending">Loading....</span>
      <!-- Error -->
      <div v-if="fetchDogStatusError">
        <div class="flex flex-col">
          <p class="mb-4">There was a problem while fetching a dog.</p>
          <div>
            <BaseButton variant="primary-outline" @click.prevent="fetchData"
              >Try again
            </BaseButton>
          </div>
        </div>
      </div>
      <!-- Success -->
      <div v-if="fetchDogStatusSuccess">
        <img v-if="dog" :class="$style.animalImage" :src="dog" alt="dog" />
        <p v-else>Hey, you did not fetch any nice pictures!</p>
      </div>
    </div>
    <div class="px-4 pt-2 pb-4">
      <BaseButton class="mb-4" @click.prevent="fetchData">Fetch dog</BaseButton>
      <ApiStatusButtonActions :status="status" @change-status="setStatus" />
    </div>
  </div>
</template>

<script>
import { useApi } from '@/api/composables/useApi'
import { fetchDog } from '@/api/animalApi'
import ApiStatusButtonActions from './components/ApiStatusButtonActions'
export default {
  name: 'UseApiExample',
  components: {
    ApiStatusButtonActions,
  },
  setup () {
    const {
      data: dog,
      status,
      setStatus,
      exec: fetchData,
      fetchDogStatusIdle,
      fetchDogStatusPending,
      fetchDogStatusSuccess,
      fetchDogStatusError,
    } = useApi('fetchDog', fetchDog, {
      responseAdapter: response => response.data.message,
    })

    return {
      dog,
      status,
      setStatus,
      fetchDogStatusIdle,
      fetchDogStatusPending,
      fetchDogStatusSuccess,
      fetchDogStatusError,
      fetchData,
    }
  },
}
</script>

<style module>
.animalImage {
  @apply h-64 w-full object-contain;
}
</style>
