<script lang="ts">
import { useAuth } from '../../composables/useAuth';

    export default {
        setup() {
            const { authStore } = useAuth();
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

