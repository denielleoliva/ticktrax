<template>
    <div class="q-pa-md q-gutter-sm">
        <q-btn color="primary" @click="chooseFiltertype = true">
            Filter
            <q-icon name="filter_alt"/>
        </q-btn>
        <q-dialog id="setFilterDialog" class="row" style="" color="primary" v-model="chooseFiltertype">
            <q-card style="width:50%; height:50%;">
                <q-btn style="margin:10px;" color="primary" @click="filterTypeDateRange = true">
                    By date range
                    <q-icon class="pa-4" name="date_range"/>
                </q-btn>
                <q-btn style="margin:10px" color="primary">
                    By location range
                </q-btn>
                <q-chip>
                    filter: {{ dateRange }}
                </q-chip>
                <q-btn @click="sendQuery(dateRange)">
                    confirm filter
                </q-btn>
                <q-space/>
            </q-card>
        </q-dialog>
        <q-dialog color="primary" v-model="filterTypeDateRange">
            <q-card>
                <q-date color="primary" v-model="dateRange" range emit-immediately>
                    <q-btn @click="setQuery(dateRange)">
                        confirm range
                    </q-btn>
                </q-date>
            </q-card>
        </q-dialog>
        <q-dialog class="row" color="primary" v-model="filterTypeMapRange">
            <!-- map box api here obtain an area -->
            <!-- <q-date v-model="mapRange" range/> -->
        </q-dialog>
    </div>
</template>


<script>
import { ref } from 'vue'

export default {
    setup () {
        return {
            chooseFiltertype: ref(false),
            errorPop: ref(false),
            filterTypeDateRange: ref(false),
            chooseDateRange: ref(false),
            filterTypeMapRange: ref(false),
            dateRange: ref({ from: '', to: '' })
        }
    },
    methods: {
        sendQuery(query){
            if(query.from !== "" && query.to !== "")
            {
                //  closes the dialog
                this.chooseFiltertype = false
                //  send query information to api

                //  display the returned data
            }
            else
            {
                console.log(query)

                //  find the dialog via its id
                const element = document.getElementById("setFilterDialog")

                //  add the animation
                element.classList.add("error")
            }
        },
        setQuery(query){
            console.log(query)

            this.filterTypeDateRange = false
        }
    }
}
</script>

<style scoped>

.error{
    animation-name: errorAnimate;
    animation-duration: 5s;

    border:200px;
}

@keyframes errorAnimate {
    0%      {color: black; left: 5px;}
    100%    {color: red; left: 10px;}
}

</style>