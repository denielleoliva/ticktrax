<template>
    <div class="q-pa-md row items-start q-gutter-md">
        <q-card>
            <div class="row q-pt-lg">
                <q-space/>
                <q-img img style="max-height:350px; max-width:300px;" :ratio="1"
                    src="https://www.healthvermont.gov/sites/default/files/images/2019/01/hs_id_vzd_blackleggedtick.jpg"/>
                <q-space/>
            </div>

            <q-card-section class="q-pa-md">
                <div class="tickName">
                    Blacklegged tick (Ixodes scapularis)
                </div>
                <div class="caption">
                    throughout Vermont wooded area
                    and fields with tall grass and brush
                </div>
                <!-- <div>  Blacklegged tick(Ixodes scapularis)</div>
                <div>  throughout Vermont wooded areas 
                        and fields with tall grass and brush</div> -->
            </q-card-section>
        </q-card>
        
        <q-card>
            <div class="row q-pt-lg">
                <q-space/>
                <q-img img style="max-height:300px; max-width:300px;" :ratio="1"
                    src="https://www.healthvermont.gov/sites/default/files/images/2019/01/hs_id_vzd_browndogtick.jpg"/>
                <q-space/>
            </div>
            <!-- <q-img style="height:25%; width:25%" ratio="1"
                src="https://www.healthvermont.gov/sites/default/files/images/2019/01/hs_id_vzd_browndogtick.jpg"
                /> -->

            <q-card-section>
                <div class="tickName">
                    Lone star tick (Ambylomma americanum)
                </div>
                <div class="caption">
                    wherever humans and dogs live including indoors, unlike other tick species
                </div>
                <!-- <div>Blacklegged tick (Ixodes scapularis)</div>
                <div>  throughout Vermont wooded area
                        and fields with tall grass and brush</div> -->
            </q-card-section>
        </q-card>
    </div>
  </template>

<script setup>

</script>

<style>
.tickName{
    font-size: medium;
    font-weight: bold;
    justify-content: center;
}
.caption{
    font-size: small;
    justify-content: center;
}
</style>