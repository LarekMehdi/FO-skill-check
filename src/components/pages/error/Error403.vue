<script lang="ts">
import image403 from '../../../assets/error403.png'
    export default {
        setup() {
            return { image403 }
        },
        data() {
            return {}
        },
        methods: {

        },
        components: {

        },
    }
</script>

<template>
    <img 
        :src="image403" 
        alt="Un loup montrant les dents signifiant que la resource n'est pas accessible" 
        class="img-fluid my-3 d-block mx-auto" 
        style="max-width: 500px;"
    />
</template>