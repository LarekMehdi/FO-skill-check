<script lang="ts">
    export default {
        data() {
            return {}
        },
        props: {
            buttonClass: {
                type: String,
                required: false,
                default: 'btn-primary'
            },
            content: {
                type: String,
                required: true,
            },
            handleClick: {
                type: Function,
                required: true,
            }
        },
        methods: {},
    }
</script>

<template>
    <button
        type="button" 
        :class="['btn btn-block', buttonClass]"
        @click="handleClick()"
    >
        {{ content }}
    </button>
</template>