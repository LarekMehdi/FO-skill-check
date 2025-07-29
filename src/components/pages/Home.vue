<script lang="ts">
import { useAuth } from '../../composables/useAuth';
import logo from '../../assets/logo-skill-check.png'


export default {
    setup() {
        const { authStore, isLoggedIn, isAdmin } = useAuth();
        return { 
            authStore,
            isLoggedIn,
            isAdmin,
            logo,
        };
    },
    mounted() {
        
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
            
        }
    }
}

</script>

<template>
    <main class="mt-5">
        
        <img :src="logo" alt="Logo SkillCheck" class="img-fluid my-3 d-block mx-auto" style="max-width: 200px;"/>
        
        <div v-if="!isLoggedIn">
            <h3>Votre plateforme d'entraînement aux tests techniques</h3>
            <p>
                Vous préparez un entretien ou souhaitez évaluer vos compétences techniques? SkillCheck est conçu pour vous aider à progresser efficacement.
            </p>
            <p>
                <strong>Des tests ciblés: </strong><br/>
                Entraînez-vous avec des questions minutées regroupées par thématique ou niveau de difficulté. Chaque test est conçu pour simuler les conditions réelles des épreuves techniques.
            </p>
            <p>
                <strong>Ajout de contenu par les admins: </strong><br/>
                De nouvelles questions et tests sont régulièrement ajoutés pour couvrir un large éventail de sujets.
            </p>
            <p>
                <strong>Suivi personnalisé: </strong><br/>
                Consultez vos résultats détaillés, suivez votre progression et identifiez vos axes d’amélioration.

            </p>
            <p>
                <strong>Statistiques globales: </strong><br/>
                Comparez vos performances à celles des autres utilisateurs sur chaque test.
            </p>
            
            <h6 class="text-primary">
                <strong>Prêt à tester vos compétences ? Créez un compte, lancez un test et améliorez-vous dès aujourd’hui!</strong>
            </h6>
        </div>

        <div v-if="isAdmin">

        </div>

        <div v-else>

        </div>
    </main>
</template>