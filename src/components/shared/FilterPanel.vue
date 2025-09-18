<script lang="ts">
import type { PropType } from 'vue';
import type { GenericFilter } from '../../interfaces/filter.interface';
import ButtonCustom from '../ui/ButtonCustom.vue';

    export default {
        props: {
            isActive: {
                type: Boolean,
                required: true,
            },
            filter: {
                type: Object as PropType<GenericFilter>,
                required: true,
            }
        },
        emits: ["onClose", "onFilter", "onReset"],
        methods: {

        },
        components: {
            ButtonCustom,
        },
    }
</script>

<template>
    <transition name="drawer-overlay" class="mt-5">
        <article 
            v-if="isActive"
            class="overlay"
            @click.self="$emit('onClose')"
        >
            <section class="drawer">
                <header class="drawer-header">
                    <h3>Filtres</h3>
                </header>
                
                <section class="drawer-content">

                    <slot name="content"></slot>

                    <div class="filter-actions pointer">
                        <i @click="$emit('onReset')" class="pi  pi-refresh text-secondary" style="font-size: 2rem"></i>

                        <div class="filter-btn">
                            <ButtonCustom 
                                content="Filtrer"
                                buttonClass="btn-primary"
                                @click="$emit('onFilter', filter)"
                            />
                        </div>
                    </div>

                </section>
            </section>

        </article>
    </transition>
</template>


<style scoped>
    .overlay {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.4);
        display: flex;
        justify-content: flex-end;
        z-index: 1000;
    }

    .drawer {
        background: #fff;
        width: 400px;
        height: 100%;
        display: flex;
        flex-direction: column;
        box-shadow: -2px 0 6px rgba(0,0,0,0.2);
    }

    .drawer-header, .drawer-footer {
        padding: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .drawer-footer {
        justify-content: space-between;
        border-top: 1px solid #eee;
        border-bottom: none;
    }

    .drawer-content {
        flex: 1;
        overflow-y: auto;
        padding: 1rem;
    }

    .drawer-overlay-enter-active, .drawer-overlay-leave-active {
        transition: opacity 0.3s ease;
    }

    .drawer-overlay-enter-active .drawer, 
    .drawer-overlay-leave-active .drawer {
        transition: transform 0.3s ease;
    }

    .drawer-overlay-enter-from, .drawer-overlay-leave-to {
        opacity: 0;
    }

    .drawer-overlay-enter-from .drawer, 
    .drawer-overlay-leave-to .drawer {
        transform: translateX(100%);
    }

    .filter-btn {
        display: flex;
        justify-content: flex-end;
        width: 50%;
        margin-left: auto;
    }

    .filter-btn :deep(button) {
        width: 100% !important;
    }

    .filter-actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 5rem;
    }

</style>