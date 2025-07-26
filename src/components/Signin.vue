<script lang="ts">
import useVuelidate from '@vuelidate/core';
import type { SigninDataInterface } from '../interfaces/auth.interface';
import { required } from '@vuelidate/validators';
import { reactive } from 'vue'



export default {
    setup(props, context) {
        const state = reactive({
            signinData: {
                pseudo: '',
                password: ''
            }
        });
        const rules = {
            signinData: {
                pseudo: { required },
                password: { required }
            }
        }
        const v$ = useVuelidate(rules, state);
        return { v$, state }
    },
    mounted() { },
    data(): {signinData: SigninDataInterface}
    {
        return {
            signinData: { pseudo: '', password: ''}
        }
    },
    components: {},
    computed: {},
    methods: {
        signin() {
            this.v$.$touch()
            if (this.v$.$invalid) return;
            
            this.signinData = {
                pseudo: this.state.signinData.pseudo,
                password: this.state.signinData.password
            }
            console.log(this.signinData);



        }
    }
}

</script>

<template>
    <main>
        <h1>Se connecter</h1>
        <div>
            <form @submit.prevent="signin">
                <section class="mb-3">
                    <input 
                        v-model="state.signinData.pseudo"
                        type="text"
                        placeholder="Pseudo"
                        class="form-control"
                    />
                    <small v-if="v$.signinData.pseudo.$error" class="text-danger">
                        Le pseudo est requis.
                    </small>
                </section>
                
                <section class="mb-3">
                    <input 
                        v-model="state.signinData.password"
                        type="password"
                        placeholder="Mot de passe"
                        class="form-control"
                    />
                    <small v-if="v$.signinData.password.$error" class="text-danger">
                        Le mot de passe est requis.
                    </small>
                </section>
                
                <button
                    type="submit" 
                    class="btn btn-primary btn-block"
                >
                    Connexion
                </button>
            </form>
        </div>
    </main>
</template>