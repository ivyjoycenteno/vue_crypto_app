<template>
<div class="w-36 flex items-center bg-gradient-to-r from-zinc-200">
    <SidebarVue/>
</div>
<div class="px-12 py-4 flex flex-col w-full">
    <TopbarVue/>
    <router-view/>
</div>
</template>

<script setup>
import SidebarVue from '@/components/layout/AppSidebar.vue'
import TopbarVue from '@/components/layout/AppHeader.vue'
</script>