
<template>
    <div >
      <div class="c-dashboardInfo">
        <div class="wrap">
          <h4 class="c-dashboardInfo__title" >{{$props.item.title}}
            <q-btn flat color="grey" icon="info" dense >
              <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                {{ $props.item.tooltipMsg }}
              </q-tooltip>
            </q-btn>
          </h4>
          <span class="hind-font text-weight-medium text-h5 c-dashboardInfo__count">{{ $props.item.value }}</span>
        </div>
      </div>
    </div>



</template>

<script>
import {defineComponent} from 'vue';
export default defineComponent({
  name: "CardSocial",
  props: {
    item: {
      required: true,
    },
    icon_position: {
      required: false,
      default: "left"
    }
  },
  data: function() {
    return {lorem: 'hello'}
  },
  computed: {
    items: function () {
      return [
        {
          title: "Total ticks reported",
          icon: "person",
          value: "10,500",
          color1: "rgb(92, 171, 125, 0.7)",
          color2: "rgb(92, 171, 125)"
        },
        {
          title: "Recent tick reports",
          icon: "bar_chart",
          value: "1,020",
          color1: "rgb(92, 171, 125, 0.7)",
          color2: "rgb(92, 171, 125)"
        },
        {
          title: "Total registered users",
          icon: "people",
          value: "5,000",
          color1: "rgb(92, 171, 125, 0.7)",
          color2: "rgb(92, 171, 125)"
        },
        {
          title: "Server availability",
          icon: "public",
          value: "91.26%",
          color1: "rgb(92, 171, 125, 0.7)",
          color2: "rgb(92, 171, 125)"
        }

      ];
    }
  }
})
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 225px

.c-dashboardInfo
  margin-bottom: 15px
  .wrap
    background: #ffffff
    box-shadow: 2px 10px 20px rgba(0, 0, 0, 0.1)
    border-radius: 7px
    text-align: center
    position: relative
    overflow: hidden
    padding: 5px 25px 20px
    height: 100%
    &:after
      display: block
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 10px
      content: ""
  span
    display: block
  .wrap
    &:after
      background: linear-gradient(82.59deg, #00c48c 0%, #00a173 100%)
.c-dashboardInfo__title,
.c-dashboardInfo__subInfo
  color: #6c6c6c
  font-size: 1.18em

.body--dark .c-dashboardInfo__title
  color: #cccccc
.c-dashboardInfo__count
  font-weight: 600
  font-size: 2.5em
  line-height: 32px
  padding-bottom: 10px
  color: #323c43

.body--dark .c-dashboardInfo__count
  color: #ffffff


.MuiSvgIcon-root-19
  fill: currentColor
  width: 1em
  height: 1em
  display: inline-block
  font-size: 24px
  transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms
  user-select: none
  flex-shrink: 0

.body--dark .wrap
  background: #1D1D1D


</style>


