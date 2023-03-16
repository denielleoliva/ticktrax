<template>
    <div class="col-lg-3 col-md-3 col-xs-6 col-sm-6">
      <q-item>
        <q-item-section top avatar>
          <q-avatar ><img :src="iconLink" alt="tick marker"> </q-avatar>
        </q-item-section>
        <q-item-section>
          <div v-if="isLoading">
          <q-item-label class="text-h6 text-green-6 text-bold">
            <q-spinner-dots class="text-h4" style="margin-bottom: -10px" color="primary"/>
          </q-item-label>
            <q-item-label caption class="text-right">{{ props.loadingMsg }}</q-item-label>
          </div>
          <div v-else>
          <q-item-label class="text-h6 text-green-6 text-bold">{{ counter.toLocaleString() }}</q-item-label>

          <q-item-label caption>{{ props.subtitle }}</q-item-label>
          </div>
        </q-item-section>
      </q-item>
    </div>
<!--  <div class="col-lg-3 col-md-3 col-xs-6 col-sm-6">-->
<!--    <q-item>-->
<!--      <q-item-section top class="q-pr-md">-->
<!--        <q-avatar><img src="pest.png" alt="tick marker"></q-avatar>-->
<!--      </q-item-section>-->
<!--      <transition-group name="fade" mode="out-in">-->
<!--        <q-item-section style="height: 60px; display: flex; align-items: center;" v-bind:key="isLoading">-->
<!--          <div v-if="isLoading" style="flex: 1;">-->
<!--            <q-item-label class="q-pa-none" style="vertical-align: middle;">-->
<!--              <q-spinner-dots class="text-h4" color="primary"/>-->
<!--              <q-item-label caption style="vertical-align: middle;">Collecting ticks...</q-item-label>-->
<!--            </q-item-label>-->
<!--          </div>-->
<!--          <div v-else style="flex: 1;">-->
<!--            <q-item-label class="text-h6 text-green-6 text-bold">{{ counter.toLocaleString() }}</q-item-label>-->
<!--            <q-item-label caption>Ticks reported</q-item-label>-->
<!--          </div>-->
<!--        </q-item-section>-->
<!--      </transition-group>-->
<!--    </q-item>-->
<!--  </div>-->
</template>

<script setup>
import { Dark } from 'quasar';
import {defineProps, onMounted, nextTick, watch, ref} from 'vue';

const props = defineProps(['tickCount', 'isLoadingTickData', 'subtitle', 'loadingMsg']);
const counter = ref(props.tickCount);
const isLoading = ref(props.isLoadingTickData);
const iconLink = ref('pest.png')
onMounted(function () {
  nextTick(() => {
    watch(() => props.tickCount, (value, oldValue) => {
      counter.value = oldValue;
      animateNumber(oldValue, value);
    });
  })
});

watch(() => Dark.isActive, val => {
  iconLink.value = val ? 'pest_darkmode.png': 'pest.png';
});

function animateNumber(startValue, endValue) {
  const duration = 2000; // 1 second
  const range = Math.abs(endValue - startValue);
  const increment = (endValue > startValue ? 1 : -1) * range / (duration / 60);
  let current = startValue;
  const animate = () => {
    current += increment;
    if ((endValue > startValue && current >= endValue) || (endValue < startValue && current <= endValue)) {
      counter.value = endValue;
    } else {
      counter.value = Math.round(current);
      requestAnimationFrame(animate);
    }
  };
  requestAnimationFrame(animate);
}



</script>

<style lang="sass" scoped>
.results
  -webkit-text-size-adjust: 100%
  -webkit-tap-highlight-color: rgba(0,0,0,0)
  font-family: "Helvetica Neue",Helvetica,Arial,sans-serif
  font-size: 14px
  line-height: 1.42857143
  color: #333
  box-sizing: border-box



</style>
