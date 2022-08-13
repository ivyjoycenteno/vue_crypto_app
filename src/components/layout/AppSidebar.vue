<template>
<div class="rij-image-pos logo-img w-36 cursor-pointer -ml-[0.3rem]"></div>
<ul class="mx-[auto] text-center text-xs">
    <li class="mb-6 cursor-pointer">
        <HomeIcon class="h-6 w-6 mx-[auto]"/>
        <span><router-link to="/">Home</router-link></span>
    </li>
    <li class="mb-6 cursor-pointer">
        <CollectionIcon class="h-6 w-6 mx-[auto]"/>
        <span>Portfolio</span>
    </li>
    <li class="mb-6 cursor-pointer">
        <PresentationChartLineIcon class="h-6 w-6 mx-[auto]"/>
        <span>Markets</span>
    </li>
    <li class="cursor-pointer">
        <CogIcon class="h-6 w-6 mx-[auto]"/>
        <span>Settings</span>
    </li>
</ul>
</template>
<script setup>
import { HomeIcon, CollectionIcon, PresentationChartLineIcon, CogIcon } from '@heroicons/vue/outline'
</script>