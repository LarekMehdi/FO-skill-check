<script lang="ts">
import ButtonCustom from '../ui/ButtonCustom.vue';

    export default {
        props: {
            visible: {
                type: Boolean,
                required: true,
            },
            title: {
                type: String,
                required: false,
                default: '',
            },
            submitLabel: {
                type: String,
                required: false,
                default: 'Sauvegarder'
            }
        },
        methods: {
            close() {
                this.$emit('close');
            },
            submit() {
                this.$emit('submit');
            }
        },
        emits: ['close', 'submit'],
        components: {
            ButtonCustom,
        }
    }
</script>

<template>
    <section v-if="visible" class="modal-backdrop" @click.self="close">
        <article class="modal-content">

            <h3>{{ title }}</h3>

            <slot name="content"></slot>

            <aside class="row my-3">
                <section class="col text-start">
                    <ButtonCustom 
                        content="Annuler"
                        buttonClass="btn-danger"
                        @click="close"
                    />
                </section>
                <section class="col text-end">
                    <ButtonCustom 
                        :content="submitLabel"
                        @click="submit"
                    />
                </section>
            </aside>
            
        </article>
    </section>
</template>

<style scoped>
    .modal-backdrop {
        position: fixed;
        top: 0; left: 0;
        width: 100vw; height: 100vh;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .modal-content {
        background: white;
        border-radius: 8px;
        padding: 1.5rem;
        max-width: 600px;
        width: 100%;
    }
</style>