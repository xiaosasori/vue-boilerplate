import { getUser } from '@/composables/useUser'

/**
 * Return an array method for check type
 *
 * For one-of we only need to find one record, so .some is sufficient
 * For all-of we want to match all roles, so we use .every
 */
const permissionCheckTypeMethods = {
  'one-of': roles => roles.some,
  'all-of': roles => roles.every,
}

export const checkPermission = (roles, config = {}) => {
  /**
   * By default the type is 'one-of'
   * entityOwnerId is only needed when checking if a user
   * is an owner of an entity such as comment, post, etc
   */
  const { type = 'one-of', entityOwnerId } = config

  // Get an array method for checking permissions
  const checkMethod =
    permissionCheckTypeMethods?.[type] || permissionCheckTypeMethods['one-of']

  const user = getUser()
  const userRoles = user.value?.roles || []

  /**
   * Initialise checkMethod to get reference to .some or .every
   * We need to bind the 'roles' array to make sure these functions are
   * run in the context of the array prototype.
   */
  const hasAccess = checkMethod(roles).bind(roles)(role => {
    // Checks if user created a record
    if (role === 'owner') {
      return user.value?.id === entityOwnerId
    }

    // Checks if user is authenticated
    if (role === 'logged-in') {
      return Boolean(user.value?.id)
    }

    // Checks other roles
    return userRoles.includes(role)
  })

  // console.log('PERMISSION_DEBUG', {
  //   hasAccess,
  //   requiredRoles: roles,
  //   userRoles,
  //   type,
  //   entityOwnerId,
  // })

  return hasAccess
}
