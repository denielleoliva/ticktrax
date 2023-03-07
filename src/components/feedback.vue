<template>
    <div class="col-lg-7 col-md-7 col-xs-12 col-sm-12 q-pb-sm" >
        <q-card class="q-pa-lg">
            <div class="text-h6">Feedback</div>
            <div class="text-subtitle2 text-weight-light">Help us improve TickTrax!</div>
            <q-form>
                <div>
                    <q-input v-model="form.email" label="Email">
                        <template v-slot:before>
                            <q-icon name="mail" />
                        </template>
                    </q-input>
                    <q-input v-model="form.subject" label="Subject">
                        <template v-slot:before>
                            <q-icon name="title" />
                        </template>
                    </q-input>
                </div>
                <div class="q-py-md">
                    <q-input v-model="form.message" filled label="Your feedback" name="Message" autogrow />
                </div>
            </q-form>
            <div align="right">
                <q-btn :href="'mailto:ticktrax.unr@gmail.com?cc=' + form.email + ' &subject=' + form.subject + '&body=' + form.message"
                    color="primary">
                    Send Email
                </q-btn>
            </div>

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
