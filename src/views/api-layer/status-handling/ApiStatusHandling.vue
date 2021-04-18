<template>
  <div class="mx-4 mb-4 bg-white border border-gray-300 rounded-lg shadow-md md:mx-0">
    <div class="block p-4 text-xl font-medium font-heading md:text-xl">Fetch Dog API states</div>
    <div class="px-4 pb-4">
      <!-- Idle -->
      <div v-if="fetchDogStatusIdle">
        Press the button to fetch a nice dog.
      </div>
      <!-- Pending -->
      <span v-show="fetchDogStatusPending">Loading...</span>
      <!-- Error -->
      <div v-if="fetchDogStatusError">
        <div class="flex flex-col">
          <p class="mb-4">There was a problem while fetching a dog.</p>
          <div>
            <BaseButton variant="primary-outline" @click.prevent="fetchData"
              >Try again</BaseButton
            >
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
      <ApiStatusButtonActions
        :status="fetchDogStatus"
        @change-status="fetchDogStatus = $event"
      />
    </div>
  </div>
</template>

<script>
import { fetchDog } from '@/api/animalApi'
import { apiStatus, apiStatusComputedFactory } from '@/api'
import ApiStatusButtonActions from './components/ApiStatusButtonActions'

const { IDLE, SUCCESS, PENDING, ERROR } = apiStatus

export default {
  name: 'ApiStatusHandling',
  components: {
    ApiStatusButtonActions
  },
  data () {
    return {
      dog: null,
      fetchDogStatus: IDLE
    }
  },
  computed: {
    ...apiStatusComputedFactory(['fetchDogStatus', 'updateDogStatus'])
  },
  methods: {
    async fetchData () {
      try {
        this.fetchDogStatus = PENDING
        const response = await fetchDog()
        this.dog = response.data.message
        this.fetchDogStatus = SUCCESS
      } catch (error) {
        console.error(error)
        this.fetchDogStatus = ERROR
      }
    },
    setFetchDogStatus (status) {
      this.fetchDogStatus = status
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

.animalImage {
  @apply h-64 w-full object-contain;
}
</style>
