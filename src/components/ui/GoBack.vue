<script lang="ts">
    export default {
        props: {
            buttonClass: {
                type: String,
                required: false,
                default: '',
            }
        },
        methods: {
            goBack() {
                if (window.history.length > 1) {
                    this.$router.back();
                } else {
                    this.$router.push('/');
                }
            }
        },
    }
</script>

<template>
    <section :class="buttonClass">
        <i @click="goBack" class="pi pi-chevron-left text-secondary pointer" style="font-size: 2rem"></i>
    </section>
    
</template>