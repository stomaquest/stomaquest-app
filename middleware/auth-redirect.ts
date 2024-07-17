export default defineNuxtRouteMiddleware((to) => {
  const { loggedIn } = useAuth();
  if (!loggedIn) {
    navigateTo('/api/login', { external: true });
  }
});
