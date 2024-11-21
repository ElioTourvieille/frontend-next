export type User = { roles: Role[]; id: string }

type Role = keyof typeof ROLES;
type Permission = (typeof ROLES)[Role][number]

const ROLES = {
  elite: [
    'tournament.view',
    'tournament.edit',
    'grid.create',
    'grid.share',
    'premium.filters.access',
  ],
  premium: [
    'tournament.view',
    'grid.create',
    'premium.filters.access',
  ],
  free: [
    'tournament.view',
  ],
} as const;

export function hasPermission(user: User, permission: Permission): boolean {
  return user.roles.some(role =>
    (ROLES[role] as readonly Permission[]).includes(permission)
  );
}