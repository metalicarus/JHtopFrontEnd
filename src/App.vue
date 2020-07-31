<template>
    <v-app id="inspire">
        <div class="text-center">
            <v-overlay :value="overlay" :absolute="true">
                <v-progress-circular indeterminate size="64"></v-progress-circular>
                <p>Em busca de novos processos. Aguarde...</p>
            </v-overlay>
        </div>
        <v-main>
            <v-container
                class="fill-height"
                fluid
            >
                <v-row class="mb-6" >
                    <v-col sm="12" md="6" cols>
                        <Comandos :processos="messages" class="blocos"/>
                    </v-col>
                    <v-col sm="12" md="6" cols>
                        <Linhas :processos="messages" class="blocos"/>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col sm="12" md="6" lg="6">
                        <Logo/>
                    </v-col>
                    <v-col sm="12" md="6" lg="6">
                        <Processos :processos="messages" class="blocos" />
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
        <v-footer app>
            <span>&copy; {{ano}}</span>
        </v-footer>
    </v-app>
</template>

<script>
import Processos from './components/Processos'
import processo from './resources/processos.json'
import Comandos from "./components/Comandos";
import Linhas from "./components/Linhas";
import Logo from "./components/Logo";
export default {
    components : {
        Processos,
        Comandos,
        Linhas,
        Logo
    },
    mounted() {
        this.overlay = true;
    },
    beforeMount() {
        this.iniciarPusher();
        this.pegarConexoes();
        this.rotacao();
    },
    data : () => ({
        timer : null,
        client : Pusher,
        messages : [],
        colunaProcessos : {
            sm : 12,
            md : 6,
            lg : 6,
            offset : 6
        },
        overlay : false
    }),
    created () {
        this.$vuetify.theme.dark = true
    },
    computed : {
        ano :  function(){
            return new Date().getFullYear();
        },
    },
    methods : {
        rotacao : function(){
            if(this.messages.length === 0){
                this.messages.push(processo.processo)
            }
            let primeiro = this.messages[0]
            this.messages.shift();
            this.messages.push(primeiro);
            setTimeout(() => this.rotacao(), 4500);
        },
        iniciarPusher(){
            console.log(process.env.VUE_APP_PUSHER)
            this.client = new Pusher(process.env.VUE_APP_PUSHER, {
                cluster: 'us2'
            });
        },
        pegarConexoes(){
            let vm = this;
            let channel = this.client.subscribe('processo');
            channel.bind('novo-processo', function(data) {
                vm.overlay = false;
                (!vm.verificarPid(data.processo.status.chaves[5].valor)) ? vm.messages.push(data.processo) : 0;
            });
        },
        verificarPid(pid){
            return this.messages.some(processo => processo.status.chaves[5].valor === pid);
        },
    }
}
</script>
<style>
    @import url('https://fonts.googleapis.com/css2?family=Ubuntu+Mono:wght@700&display=swap');

    table{
        color: lawngreen;
        font-family: 'Ubuntu Mono', monospace;
    }
    ::-webkit-scrollbar {
        width: 5px;
        height: 5px;
    }
    ::-webkit-scrollbar-track {
        background: #f1f1f1;
    }
    ::-webkit-scrollbar-thumb {
        background: lawngreen;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
    .blocos{

    }
    .blocos > p {
        opacity: 0;
        font-family: 'Ubuntu Mono', monospace;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
        font-size: 55px;
        z-index: 12;
        transition: 0.8s;
    }
    .blocos:hover > div{
        opacity: 0.4;
        transition: 0.5s;
    }
    .blocos:hover > p{
        opacity: 1;
        transition: 0.8s;
    }
</style>