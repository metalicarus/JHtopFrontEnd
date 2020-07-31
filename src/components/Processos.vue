<template>
    <v-card
            min-width="100%"
            max-height="100%"
            outlined

    >
        <p v-text="`Processos`"/>
        <v-simple-table height="600px" dense fixed-header >
            <template v-slot:default>
                <thead>
                    <tr>
                        <th v-for="chave in chaves" class="text-left">{{chave}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="valor in valores">
                        <td v-for="v in valor">{{v}}</td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>

    </v-card>
</template>
<script>
    export default {
        props : {
            processos : Array
        },
        computed : {
            chaves(){
                let primeiro = this.processos[0].status;
                return primeiro.chaves.map(e => e.chave)
            },
            valores(){
                return this.processos.map(e => {
                    return e.status.chaves.map(f => f.valor)
                })
            }
        },
    }
</script>