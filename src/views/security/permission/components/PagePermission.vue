<template>
  <div class="mx-4 bg-white border border-gray-300 rounded-lg shadow-md md:mx-0">
    <div class="block p-4 text-xl font-medium font-heading md:text-xl">Page permission</div>
    <div class="px-4 pb-4">
      <ul class="mb-4">
        <li>
          - Set Moderator role to access page for moderators, but not admin
        </li>
        <li>- Set Admin role to access both moderators and admins page</li>
        <li>
          - Set Moderator and Admin roles to "false" to be redirected to the
          {{'<Forbidden />'}} page.
        </li>
      </ul>
      <div class="space-x-4">
        <BaseButton
          variant="primary-outline"
          tag="router-link"
          to="/security/permission/moderator"
          >Go to moderator</BaseButton
        >
        <BaseButton
          variant="primary-outline"
          tag="router-link"
          to="/security/permission/admin"
          >Go to admin</BaseButton
        >
      </div>

      <router-view />
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style module></style>
