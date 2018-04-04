export default function auth (next, src, args, context) {
  console.log("AUTH RESOLVER CALLED:: ", args);
  const { roles } = context; // We asume has roles of current user in context;
  const expectedRoles = args.roles || [];
  if (expectedRoles.length === 0 || expectedRoles.some((r) => roles.includes(r))) {
    // Call next to continues process resolver.
    return next();
  }

  // We has two options here. throw an error or return null (if field is nullable).
  throw new Error(`You are not authorized. Expected roles: ${expectedRoles.join(', ')}`);
}