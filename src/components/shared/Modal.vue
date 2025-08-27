<script lang="ts">
import ButtonCustom from '../ui/ButtonCustom.vue';
import ButtonSubmit from '../ui/ButtonSubmit.vue';

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
            },
            isLarge: {
                type: Boolean,
                required: false,
                default: false,
            },
            isCancelOnLeft: {
                type: Boolean,
                required: false,
                default: true,
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
        watch: {
            'visible'(newVal: boolean) {
                if (newVal) {
                    document.body.style.overflow = 'hidden';
                    // const scrollY = window.scrollY;
                    // document.body.style.position = 'fixed';
                    // document.body.style.top = `-${scrollY}px`;
                    // document.body.dataset.scrollY = scrollY.toString();
                } else {
                    document.body.style.overflow = '';
                    // const scrollY = document.body.dataset.scrollY ? parseInt(document.body.dataset.scrollY) : 0;
                    // document.body.style.position = '';
                    // document.body.style.top = '';
                    // window.scrollTo(0, scrollY);
                }
            }
        },
        emits: ['close', 'submit'],
        components: {
            ButtonCustom,
            ButtonSubmit,
        }
    }
</script>

<template>
    <section v-if="visible" class="modal-backdrop" @click.self="close">
        <article :class="['modal-content', { 'modal-content-large': isLarge }]">

            <h3>{{ title }}</h3>

            <form @submit.prevent="submit">
                <slot name="content"></slot>

                <aside class="row my-3">
                    <section class="col text-start">
                        <ButtonCustom 
                            v-if="isCancelOnLeft"
                            content="Annuler"
                            buttonClass="btn-danger"
                            @click="close"
                        />
                        <ButtonSubmit 
                            v-else
                            :content="submitLabel"
                        />
                    </section>
                    <section class="col text-end">
                        <ButtonSubmit 
                            v-if="isCancelOnLeft"
                            :content="submitLabel"
                        />
                        <ButtonCustom 
                            v-else
                            content="Annuler"
                            buttonClass="btn-danger"
                            @click="close"
                        />
                    </section>
                </aside>
            </form>

            

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
        max-height: 80vh;
        overflow-y: auto;
    }
    .modal-content-large {
        max-width: 1000px;
        max-height: 80vh;
    }
</style>