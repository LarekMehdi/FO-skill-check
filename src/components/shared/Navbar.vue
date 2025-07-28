<script lang="ts">
import { useAuth } from '../../composables/useAuth';
import LogoutButton from './LogoutButton.vue';


export default {
    setup() {
        const { isLoggedIn, isAdmin } = useAuth();
        return { isLoggedIn, isAdmin };
    },
    mounted() {
        this.initNavbar();
    },
    data() {
        return {}
    },
    components: {
        LogoutButton
    },
    computed: {

    },
    methods: {
        initNavbar() {

        }
    }
}

</script>

<template>
    <nav class="navbar fixed-top navbar-expand navbar-dark bg-dark px-3">
        <router-link to="/" class="navbar-brand">Accueil</router-link>
        <router-link v-if="!isLoggedIn" to="/signin" class="navbar-brand">Se connecter</router-link>
        <router-link v-if="!isLoggedIn" to="/signup" class="navbar-brand">Créer un compte</router-link>

        <section class="ms-auto">
            <LogoutButton v-if="isLoggedIn"/>
        </section>
        
  </nav>
</template>