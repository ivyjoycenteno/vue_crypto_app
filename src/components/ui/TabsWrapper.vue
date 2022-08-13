<template>
    <div class="tabs flex flex-row space-x-24 justify-start border-b border-b-gray-300">
        <div class="rij-tab-lbl" 
            v-for="title in tabs" 
            :key="title"
            :class="[ activeTab === title ? 'active' : '' ]"
            @click="selectTab(title)">
                {{ title }}
        </div>
    </div>
    <slot></slot>

</template>
<script setup>
import { useSlots, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useTabStore } from '@/stores/tab'
import { useAuthStore } from '@/stores/auth'
import CONSTANTS from '@/services/constants'
import router from '../../router'

const { activateTab } = useTabStore()
const { activeTab } = storeToRefs(useTabStore())

const props = defineProps(['origin'])

const slots = useSlots()
const tabs = ref(slots.default().map( tab => tab.props.title))
const { isAuthenticated } = storeToRefs(useAuthStore())

const selectTab = (tab) => {
    if (props.origin === CONSTANTS.originDashBoard) {
        if (!isAuthenticated.value && tab === CONSTANTS.portfolioTab) {
            router.push('/login')
        } else {
            setActivatedTab(tab)
        }
    } else {
        setActivatedTab(tab)
    }
}

const setActivatedTab = (tab) => {
    activateTab(tab)
    activeTab.value = tab
}

</script>