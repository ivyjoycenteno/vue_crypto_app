<template>
<div class="tab-content" v-show="activeTab === props.title">
   <slot></slot>
</div>
</template>
<script setup>
import { useTabStore } from '@/stores/tab'
import { storeToRefs } from 'pinia'

const props = defineProps(['title'])
const { activeTab } = storeToRefs(useTabStore())

</script>