import { computed } from "vue";
import { useAuthStore } from "../stores/auth.store";

export function useAuth() {
    const authStore = useAuthStore(); 

    const isLoggedIn = computed(() => !!authStore.user?.id);
    const isAdmin = computed(() => authStore.user?.role === 'ADMIN');
    const userId = computed(() => authStore.user?.id);

    return {
        authStore,
        isLoggedIn,
        isAdmin,
        userId,
    }
}