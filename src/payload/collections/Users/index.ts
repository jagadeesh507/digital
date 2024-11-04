import { CollectionConfig } from 'payload'

import { isAdminOrCurrentUser } from './access/isAdminOrCurrentUser.js'
import { authorAccessAfterUpdate } from './hooks/authorAccessAfterUpdate.js'
import { handleUserRoles } from './hooks/handleUserRoles.js'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    group: 'Auth',
    useAsTitle: 'email',
  },
  auth: {
    cookies: {
      secure: true,
    },
  },
  hooks: {
    beforeChange: [authorAccessAfterUpdate, handleUserRoles],
  },
  access: {
    admin: async ({ req }) => {
      // added author also to access the admin-panel
      if (req.user) {
        const userRole: string[] = req?.user?.role || []

        const hasAccess = userRole.some(role =>
          ['admin', 'author'].includes(role),
        )

        return hasAccess
      }

      return false
    },
    read: () => true,
    create: () => true,
    update: isAdminOrCurrentUser,
    delete: isAdminOrCurrentUser,
  },
  fields: [
    {
      name: 'displayName',
      label: 'Display Name',
      type: 'text',
      saveToJWT: true,
      // access: {
      //   update: adminOrCurrentUserFieldAccess,
      // },
    },
    // slugField({
    //   fieldToUse: 'username',
    //   overrides: {
    //     name: 'username',
    //     label: 'Username',
    //     type: 'text',
    //     saveToJWT: true,
    //     required: true,
    //     unique: true,
    //     admin: {
    //       readOnly: false,
    //       position: undefined,
    //     },
    //   },
    // }),
    {
      name: 'imageUrl',
      type: 'upload',
      relationTo: 'media',
      // access: {
      //   update: adminOrCurrentUserFieldAccess,
      // },
    },
    // only admin can update the role field
    {
      name: 'role',
      type: 'select',
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Author',
          value: 'author',
        },
        {
          label: 'User',
          value: 'user',
        },
      ],
      // access: {
      //   create: isAdminFieldAccess,
      //   update: isAdminFieldAccess,
      // },
      saveToJWT: true,
      defaultValue: 'user',
      required: true,
      hasMany: true,
    },
    {
      name: 'emailVerified',
      type: 'date',
      // access: {
      //   create: isAdminFieldAccess,
      //   update: isAdminFieldAccess,
      // },
    },
  ],
}
