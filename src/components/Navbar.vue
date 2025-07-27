<script lang="ts">
import { useAuthStore } from '../stores/auth.store';


export default {
    setup() {
        const authStore = useAuthStore();
        return { authStore };
    },
    mounted() {
        this.initNavbar();
    },
    data() {
        return {}
    },
    components: {

    },
    computed: {
        isLoggedIn() {
            if (this.authStore.user?.id) return true;
            return false;
        },
    },
    methods: {
        initNavbar() {
            console.log('init');
        }
    }
}

</script>

<template>
    <nav class="navbar fixed-top navbar-expand navbar-dark bg-dark px-3">
        <router-link to="/" class="navbar-brand">Accueil</router-link> |
        <router-link v-if="!isLoggedIn" to="/signin" class="navbar-brand">Se connecter</router-link> |
        <router-link v-if="!isLoggedIn" to="/signup" class="navbar-brand">Créer un compte</router-link> |
  </nav>
</template>