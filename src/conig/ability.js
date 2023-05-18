import { AbilityBuilder, createMongoAbility } from '@casl/ability';
export const getUserAbilities = (role) => {
  console.log('role', role);
  const { can, build } = new AbilityBuilder(createMongoAbility);
  role.permissions.forEach((permission) => {
    can(permission.action, permission.object);
  });
  return build();
};
