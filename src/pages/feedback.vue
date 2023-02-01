<template>
    <div class="feedbackPage row">
        <!-- <q-card style="min-width:300px; max-width:500px; height:auto; padding:20px; background-color:#5CAB7D; margin-bottom:20px">
            <div style="font-size:xx-large; font-weight:bolder; color:white; padding:20px; align-content: center;">
                We want your feedback!  
            </div>
        </q-card>
        <q-space/> -->
        <q-card style="min-width:300px; max-width:500px; height:auto; padding:20px;">
            <div style=" font-family:customfont; font-size:xx-large; padding:20px; align-content: center;">
                We want your feedback!  
            </div>

            <q-form method="post" action="https://www.example.com/cgi-bin/FormMail.pl" 
                accept-charset="ISO-8859-1" onsubmit="var originalCharset = document.charset; 
                document.charset = 'ISO-8859-1'; window.onbeforeunload = function (){document.charset=originalCharset;};">
                <div style="padding:10px">
                    <q-input type="name" label="Name" name="realname">
                        <template v-slot:before>
                            <q-icon name="person" />
                        </template>
                    </q-input>
                    <q-input label="Email">
                        <template v-slot:before>
                            <q-icon name="mail" />
                        </template>
                    </q-input>
                </div>
                <div style="padding:10px">
                    <q-input filled label="Your feedback" type="textarea" name="Message" @keyup.enter="null"/>
                </div>
                
                <q-space/>
                <q-btn type="submit" value="Send" style="place-self:end; margin:10px; background-color:#5CAB7D;" color="info">
                    submit
                </q-btn>
                <input type="hidden" name="recipient" value="ticktrax.unr@gmail.com" />
                <input type="hidden" name="subject" value="Subject" />
                <input type="hidden" name="redirect"  value="https://www.example.com/thanks.html" />
                <input type="hidden" name="missing_fields_redirect"  value="https://www.example.com/error.html" />
                <input type="hidden" name="required" value="realname,email,Message" />

            </q-form>
        </q-card>
    </div>
    <!-- <q-card class="q-pa-md row items-start q-gutter-md shadow-10 feedbackPage" style="justify-self:center">
        <div style="font-size:xx-large; font-weight:bolder; padding:20px">
            We want your feedback!  
        </div>
        https://www.inmotionhosting.com/support/email/how-to-send-email-from-a-web-page/
        <q-form method="post" action="https://www.example.com/cgi-bin/FormMail.pl" 
            accept-charset="ISO-8859-1" onsubmit="var originalCharset = document.charset; 
            document.charset = 'ISO-8859-1'; window.onbeforeunload = function (){document.charset=originalCharset;};">

            <div style="padding:10px">
                <q-input type="name" label="Name" name="realname">
                    <template v-slot:before>
                        <q-icon name="person" />
                    </template>
                </q-input>
                <q-input label="Email">
                    <template v-slot:before>
                        <q-icon name="mail" />
                    </template>
                </q-input>
                <q-input filled label="Email" name="email" prefix="Email:"/> 
            </div>
            <div style="padding:10px">
                <q-input filled label="Your feedback" autogrow name="Message" @keyup.enter="null"/>
            </div>
            
            <q-space/>
            <q-btn type="submit" value="Send" style="place-self:end; background-color:#5CAB7D">
                submit
            </q-btn>
            <input type="hidden" name="recipient" value="ticktrax.unr@gmail.com" />
            <input type="hidden" name="subject" value="Subject" />
            <input type="hidden" name="redirect"  value="https://www.example.com/thanks.html" />
            <input type="hidden" name="missing_fields_redirect"  value="https://www.example.com/error.html" />
            <input type="hidden" name="required" value="realname,email,Message" />

        </q-form>
    </q-card> -->
</template>

<style scoped>
.feedbackPage{
    justify-content:center;
    margin:20px;
    padding:20px;
}
</style>