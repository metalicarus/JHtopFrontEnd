<template>
    <v-card width="100%" outlined>
        <p v-text="`Comandos`"/>
        <v-row>
            <v-col>
                <v-list-item v-for="comando in this.comandos(0, 4)" dense>
                    <v-list-item-content>
                        <v-list-item-subtitle class="lawngreen--text">{{comando}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-col>
            <v-col>
                <v-list-item v-for="comando in this.comandos(5, 9)" dense>
                    <v-list-item-content>
                        <v-list-item-subtitle class="lawngreen--text">{{comando}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-col>
            <v-col>
                <v-list-item v-for="comando in this.comandos(10, 14)" dense>
                    <v-list-item-content>
                        <v-list-item-subtitle class="lawngreen--text">{{comando}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-col>
            <v-col>
                <v-list-item v-for="comando in this.comandos(15, 19)" dense>
                    <v-list-item-content>
                        <v-list-item-subtitle class="lawngreen--text">{{comando}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
    export default {
        props : {
            processos : Array
        },
        methods : {
            comandos(inicio, final){
                if(this.processos.length === 1) {
                    return this.processos.map(e => {
                        return e.command.command;
                    });
                }
                else {
                    let array = this.processos.map(e => {
                        return e.command.command;
                    });
                    let result = [];
                    array.forEach((e, i) => {
                        if(i >= inicio && i<= final){
                            result.push(e)
                        }
                    });
                    return result;
                }

            },
        }
    }
</script>
