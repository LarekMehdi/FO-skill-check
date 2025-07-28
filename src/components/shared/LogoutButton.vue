<script lang="ts">
import { useAuthStore } from '../../stores/auth.store';

    export default {
        setup() {
            const authStore = useAuthStore();
            return {
                authStore
            }
        },
        data() {
            return {

            }
        },
        methods: {
            logout() {
                this.authStore.clearAuth();
                this.$router.push('/signin');
            }
        }
    }
</script>

<template>
    <button @click="logout" class="btn btn-danger">Se déconnecter</button>
</template>

