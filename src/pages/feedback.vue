<template>
    <div class="row" style="margin-top:20px; justify-content:center">
        <q-card style="min-width:300px; max-width:500px; height:auto; padding:20px;">
            <div style=" font-family:customfont; font-size:xx-large; padding:20px; align-content: center;">
                We want your feedback!  
            </div>

            <q-form method="post" action="https://www.example.com/cgi-bin/FormMail.pl" 
                accept-charset="ISO-8859-1" onsubmit="var originalCharset = document.charset; 
                document.charset = 'ISO-8859-1'; window.onbeforeunload = function (){document.charset=originalCharset;};">
                <div style="padding:10px">
                    <q-input v-model="form.email" label="Email">
                        <template v-slot:before>
                            <q-icon name="mail" />
                        </template>
                    </q-input>
                </div>
                <div style="padding:10px">
                    <q-input v-model="form.subject" label="Subject">
                        <template v-slot:before>
                            <q-icon name="title" />
                        </template>
                    </q-input>
                </div>
                <div style="padding:10px">
                    <q-input v-model="form.message" filled label="Your feedback" type="textarea" name="Message" @keyup.enter="null"/>
                </div>
                
                <q-space/>
                <q-btn :href="'mailto:ticktrax.unr@gmail.com?cc=' + form.email + ' &subject=' + form.subject + '&body=' + form.message"
                    color="primary">
                    Send Email
                </q-btn>
            </q-form>
        </q-card>
    </div>
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

            form: ref({
                email: ref(''),
                subject: ref(''),
                message: ref(''),
            }),
        }
    },
}
</script>