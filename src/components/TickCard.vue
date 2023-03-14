<template>
    <div class="q-pa-md row items-start q-gutter-md" style="justify-content:center;">
        <q-card class="tickCard shadow-10">
            <q-img img style="max-height:500px; max-width:300px;" :ratio="1"
                src="../assets/tickimage_card.jpg">
            </q-img>
            <div class="caption">
                <div class="title">
                    Who's in the Family?
                </div>
                <div class="body">
                    Ticks are considered to be closely related to 
                    spiders and scorpions. 
                </div>
            </div>
        </q-card>
        
        <q-card class="tickCard shadow-10">
            <q-img img style="max-height:500px; max-width:300px;" :ratio="1"
                src="../assets/forest-g6c87391d7_1920.jpg"/>
            <div class="caption">
                <div class="title">
                    Favorite Places
                </div>
                <div class="body">
                    Unlike soft ticks, hard ticks can mainly be found
                    in the woods. Keep an eye out on your next hike!
                </div>
            </div>
        </q-card>

        <q-card class="tickCard shadow-10">
            <q-img img style="max-height:500px; max-width:300px;" :ratio="1"
                src="../assets/bird_card.jpg"/>
            <div class="caption">
                <div class="title">
                    Soaring High
                </div>
                <div class="body">
                    Soft ticks are more sensitive than hard ticks. 
                    Soft ticks like to hang out in caves, cabins,
                    and birds.
                </div>
            </div>
        </q-card>

        <q-card class="tickCard shadow-10">
            <q-img img style="max-height:500px; max-width:300px;" :ratio="1"
                src="../assets/english-cocker-spaniel-gb3a107538_1920.jpg"/>
            <div class="caption">
                <div class="title">
                    Furry Friends
                </div>
                <div class="body">
                    Ticks like to target pets and humans alike.
                    They use their jumping ability to get onto their hosts.
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