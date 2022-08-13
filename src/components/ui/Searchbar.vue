<template>
<SearchIcon class="h-5 w-5 search-ico-pos"/>
<input type="text" v-model="searchStr" placeholder="Search..." class="border-gray-200/95 bg-gray-200/60 outline-none pl-8 py-2 rounded min-w-[25%] -ml-4"/>
</template>
<script setup>
import { SearchIcon } from '@heroicons/vue/outline'
import { useCoinStore } from '@/stores/coin'
import { ref, watchEffect } from 'vue';

const searchStr = ref('')

watchEffect(() => {
    const { searchCoins, resetSearchQry } = useCoinStore()

    if (searchStr.value && searchStr.value.length > 2) {
        searchCoins(searchStr.value)
    } else {
        resetSearchQry()
    }
})

</script>