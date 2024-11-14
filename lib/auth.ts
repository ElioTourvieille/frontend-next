export type User = { roles: Role[]; id: string }

type Role = keyof typeof ROLES;
type Permission = (typeof ROLES)[Role][number]

const ROLES = {
  elite: [
    'admin.view',
    'admin.edit',
    'admin.delete',
    'admin.add',
    'admin.import',
    'admin.export',
  ],
  premium: [
    'user.view',
    'user.edit',
    'user.delete',
    'user.add',
    'user.import',
    'user.export',
  ],
  free: [
    'user.view',
    'user.edit',
    'user.delete',
    'user.add',
  ],
} as const;

export function hasPermission(user: User, permission: Permission) {
    return user.roles.some(role => 
        (ROLES[role] as readonly Permission[]).includes(permission)
    );
}