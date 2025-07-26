<script lang="ts">

export default {
    mounted() {
        console.log('mounted');
        this.initHome();
    },
    data() {
        return {
            //id: this.$route.params.id,
        }
    },
    components: {},
    computed: {

    },
    methods: {
        initHome() {
            console.log('init');
        }
    }
}

</script>

<template>
    <main>
        <h1>Home</h1>
    </main>
</template>