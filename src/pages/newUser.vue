<template>
    <q-page class="q-pa-xl" style="">
        <div class="text-primary q-mb-xl" align="center" style="font-family:customfont; font-size:xx-large">
            Welcome to ticktrax
        </div>
        <div align="center">
            <q-img src="../assets/ticktrax.png" width="100px"/>
        </div>
        <div class="row fixed-center" style="width:80%">
            <q-btn class="bg-primary text-white q-ma-md" style="width:100%" @click="$router.push('/signin')">
                log in
            </q-btn>
            <q-btn class="bg-grey text-white q-ma-md" style="width:100%" @click="$router.push('/register')">
                sign up
            </q-btn>
        </div>
    </q-page>
</template>

<script>
import { ref } from 'vue'

export default{
    data () {
        return {

        }
    },
    setup () 
    {
        return {
            subjectLabel: ref('Subject'),
            
            form: ref({
                email: ref(''),
                subject: ref(''),
                message: ref(''),
            }),
        }
    },
    methods: {
        setSubject(subject) {
            this.form.subject = subject 
            this.subjectLabel = subject
        }
    }
}
</script>
