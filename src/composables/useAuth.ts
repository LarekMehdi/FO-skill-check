import { computed } from "vue";
import { useAuthStore } from "../stores/auth.store";

export function useAuth() {
    const authStore = useAuthStore(); 

    const isLoggedIn = computed(() => !!authStore.user?.id);
    const isAdmin = computed(() => authStore.user?.role === 'ADMIN');

    return {
        authStore,
        isLoggedIn,
        isAdmin,
    }
}