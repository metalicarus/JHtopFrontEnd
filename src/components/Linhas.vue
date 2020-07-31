<template>
    <v-card
            outlined
            width="100%"
            max-height="100%"
    >
        <p v-text="`Distribuição e uso de memória`"/>
        <v-card-text>
            <v-sheet color="rgba(0, 0, 0, .12)">
                <v-sparkline
                        :value="linhas"
                        height="44"
                        padding="10"
                        stroke-linecap="round"
                        line-width="2"
                        :smooth="false"
                        :gradient="[`lawngreen`]"
                        auto-draw
                >
                </v-sparkline>
                <p>
                    Processo: {{processos[0].status.chaves[0].valor}}
                </p>
            </v-sheet>
            <div>
                <v-progress-linear
                        v-model="processos[0].status.chaves[0].valor.length * Math.random()"
                        color="#7cfc00"
                        height="25"
                ></v-progress-linear>
            </div>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        props : {
            processos : Array
        },
        data: () => ({
            value: [
                35,
                99,
                675,
                42,
                200,
                300,
                150,
            ],
        }),
        computed : {
            linhas(){
                let retorno = [];
                this.processos.forEach(e => {
                    retorno.push(Math.floor((Math.random() * 100) + 1));
                });
                return retorno;
            },
        },
    }
</script>