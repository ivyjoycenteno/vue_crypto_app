<template>
<div class="rij-thumbnail min-h-[234px] p-4">
<h1 class="text-header font-medium">{{data.header}}</h1>
<img :src="data.image" class="w-24 h-24"/>
<!-- <div :style="{backgroundImage: data.image}"  class="rij-image-pos w-36 -ml-[0.3rem] h-20 relative bg-[image:url(var(--image-url))]"></div> -->
<div class="flex items-center"><h1 class="text-header">{{data.name}}</h1><span class="text-tSub mt-[0.4rem] ml-2 capitalize">{{data.symbol}}</span></div>
<h1 class="text-header font-semiBold font-lato text-black">{{data.figure}}</h1>
<span class="font-thin text-gray-400/70">{{data.description}}</span>
</div>
</template>
<script setup>
import { watchEffect } from 'vue';
import { useI18n } from 'vue-i18n'

const props = defineProps(['data'])
const { n } = useI18n()

watchEffect(() => {
    if(props.data && props.data.figure) {
        const { figSymbol, figure } = props.data
        props.data.figure = n(figure, figSymbol)
    }
})

</script>
