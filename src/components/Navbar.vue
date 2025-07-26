<script lang="ts">

export default {
    mounted() {
        this.initNavbar();
    },
    data() {
        return {}
    },
    components: {},
    computed: {

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
        <router-link to="/signin" class="navbar-brand">Se connecter</router-link> |
        <router-link to="/signup" class="navbar-brand">Créer un compte</router-link> |
  </nav>
</template>