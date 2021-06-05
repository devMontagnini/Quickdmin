export const EntityRoutes: { title: string, path: string, hasMany?: boolean }[] = [
  { title: 'Configurações', path: 'config' },
  { title: 'Usuários', path: 'users', hasMany: true },
  { title: 'Produtos', path: 'products', hasMany: true }
];