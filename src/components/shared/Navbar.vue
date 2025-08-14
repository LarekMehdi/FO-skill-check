<script lang="ts">
import { useAuth } from '../../composables/useAuth';
import LogoutButton from './LogoutButton.vue';


export default {
    setup() {
        const { isLoggedIn, isAdmin, userId } = useAuth();
        return { isLoggedIn, isAdmin, userId };
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

        <section v-if="isAdmin">
            <router-link to="/question/create" class="navbar-brand">Questions</router-link>
            <router-link to="/tag" class="navbar-brand">Tags</router-link>
            <router-link to="/test" class="navbar-brand">Tests</router-link>
            <router-link to="/user" class="navbar-brand">Utilisateurs</router-link>
        </section>


        <section v-if="isLoggedIn" class="ms-auto">
            <router-link :to="`/user/${userId}`" class="navbar-brand">Profil</router-link>
            <LogoutButton />
        </section>
        
  </nav>
</template>