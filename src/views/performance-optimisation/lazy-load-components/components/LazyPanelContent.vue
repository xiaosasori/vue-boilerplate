<template>
  <div class="flex flex-col items-center justify-center h-screen p-8">
    <h2 class="mb-4 text-2xl font-semibold">Welcome to the side panel modal</h2>
    <p class="mb-4">I was successfully lazy loaded!</p>
    <BaseButton @click.prevent="$emit('close-panel')">Close panel</BaseButton>
  </div>
</template>

<script>
export default {
  emits: ['close-panel'],
}
</script>

<style module></style>
