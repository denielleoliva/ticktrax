<template>
    <div class="q-pa-md row items-start q-gutter-md" style="justify-content:center;">
        <q-card class="tickCard shadow-10">
            <q-img img style="max-height:500px; max-width:300px;" :ratio="1"
                src="https://cdn.quasar.dev/img/parallax2.jpg">
                <!-- src="https://www.healthvermont.gov/sites/default/files/images/2019/01/hs_id_vzd_blackleggedtick.jpg"/> -->
            </q-img>
            <div class="caption">
                <div class="title">
                    <!-- Blacklegged tick -->
                    temp pic 1
                </div>
                <div class="subtitle"> 
                    <!-- Ixodes scapularis -->
                    bridge
                </div>
                <div class="body">
                    Lorem ipsum dolor sit amet, 
                    consectetur adipiscing elit, 
                    sed do eiusmod tempor incididunt 
                    ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud 
                    exercitation ullamco laboris nisi ut 
                    aliquip ex ea commodo consequat.
                    <!-- Throughout Vermont wooded area
                    and fields with tall grass and brush -->
                </div>
            </div>
        </q-card>
        
        <q-card class="tickCard shadow-10">
            <q-img img style="max-height:500px; max-width:300px;" :ratio="1"
                src="https://cdn.quasar.dev/img/mountains.jpg"/>
                <!-- src="https://www.healthvermont.gov/sites/default/files/images/2019/01/hs_id_vzd_browndogtick.jpg" -->
            <div class="caption">
                <div class="title">
                    <!-- Lone star tick  -->
                    temp pic 2
                </div>
                <div class="subtitle">
                    <!-- Ambylomma americanum -->
                    large hill
                </div>
                <div class="body">
                    Lorem ipsum dolor sit amet, 
                    consectetur adipiscing elit, 
                    sed do eiusmod tempor incididunt 
                    ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud 
                    exercitation ullamco laboris nisi ut 
                    aliquip ex ea commodo consequat.
                </div>
            </div>
        </q-card>
    </div>
  </template>

<script setup>

</script>

<style>
.body{
    font-size: smaller;
    justify-content: center;
}
.caption {
    max-height:200px;
    margin:5px;
    padding:5px;
}
.tickCard{
    max-height:500px;
    max-width:300px;
    border:2px;
    border-color:black;
    border-radius:20px;
}
.title{
    font-size: medium;
    font-weight: bolder;
    justify-content: center;
}
.subtitle{
    font-size: small;
    font-style: italic;
    font-weight: bold;
    justify-content: center;
}
</style>