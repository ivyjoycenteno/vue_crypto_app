<template>
<div class="flex flex-row space-x-4 flex-nowrap w-full my-16">
    <StatsVue/>
</div>
<div class="flex justify-end">
    <SearchbarVue/>
</div>
<div class="mt-4">
    <TabsWrapper :origin="origin">
        <Tab title="Portfolio">No portfolio set...</Tab>
        <Tab title="Favourites"><AppFavListVue/></Tab>
        <Tab title="Coins"><AppListVue/></Tab>
    </TabsWrapper>
</div>

    <!-- <div class="rij-tab-lbl" @click="selectAuthTab(1)" :class="[ activeTab === 1 ? 'active' : '' ]">Portfolio</div>
        <div class="rij-tab-lbl" @click="activateTab(2)" :class="[ activeTab === 2 ? 'active' : '' ]">Favourites</div>
        <div class="rij-tab-lbl" @click="activateTab(3)" :class="[ activeTab === 3 ? 'active' : '' ]">Coins</div> -->
    <!-- <router-view/> -->
</template>

<script setup>
import SearchbarVue from '@/components/ui/Searchbar.vue'
import StatsVue from '@/components/stats/Stats.vue'
import Tab from '@/components/ui/Tab.vue'
import TabsWrapper from '@/components/ui/TabsWrapper.vue'
import AppListVue from '@/components/coin_market/AppList.vue'
import AppFavListVue from '@/components/coin_market/AppFavList.vue'
import CONSTANTS from '@/services/constants'

const origin = CONSTANTS.originDashBoard
// import TableVue from '@/components/coin_market/AppList.vue'
</script>