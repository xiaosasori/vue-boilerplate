<template>
  <div class="mx-4 bg-white border border-gray-300 rounded-lg shadow-md md:mx-0">
    <div class="block p-4 text-xl font-medium font-heading md:text-xl">Content permission example </div>
    <div class="px-4 pb-4">
      <p>
        This example shows how to use the {{'<Permission />'}} component for the
        comments section with these rules:
      </p>
      <ul :dclass="$style.comments">
        <li>Only authenticated users should be able to see comments section</li>
        <li>
          Only comment owner, moderator, or admin should see the edit link
        </li>
      </ul>

      <p class="mb-3 font-bold">Comments</p>
      <!-- This section is shown only if a user is logged-in -->
      <Permission :roles="['logged-in']">
        <div class="space-y-3">
          <div
            class="flex items-center justify-between h-16 p-3 border shadow"
            v-for="comment of comments"
            :key="comment.id"
          >
            <span>{{ comment.message }}</span>
            <!--
              The edit button is shown only if a user is
              an owner of this comment, a moderator, or an admin
            -->
            <Permission
              :roles="['owner', 'moderator', 'admin']"
              :entityOwnerId="comment.authorId"
            >
              <div
                class="px-4 py-1 text-blue-900 bg-blue-100 border border-blue-900 rounded-md"
              >
                <span class="font-bold">Edit</span>
              </div>
            </Permission>
          </div>
        </div>
        <!-- This content is shown if user has no access to the content -->
        <template #no-access>
          <div class="text-red-700 bg-red-100 border-red-700">You must be logged in to see comments...</div>
        </template>
      </Permission>
    </div>
  </div>
</template>

<script>
import Permission from '@/components/common/permission/Permission'
export default {
  components: {
    Permission,
  },
  data () {
    return {
      comments: [
        {
          id: 1,
          authorId: 1,
          message: 'This is a great comment by user with id 1',
        },
        {
          id: 2,
          authorId: 2,
          message: 'I was posted by a different user, the one with id 2.',
        },
        {
          id: 3,
          authorId: 1,
          message: 'I also was posted by the user with id 1.',
        },
        {
          id: 4,
          authorId: 3,
          message: 'Lorem ipsum from user with id 3.',
        },
      ],
    }
  },
}
</script>

<style lang="scss" module>
.comments {
  @apply mb-4;
  li {
    &::before {
      content: '- ';
    }
  }
}
</style>
