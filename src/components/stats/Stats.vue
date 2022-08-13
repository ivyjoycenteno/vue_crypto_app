<template>
<StatBoxVue :data="topGainer"/>
<StatBoxVue :data="mostTrending"/>
<StatBoxVue :data="mostTraded"/>
<div class="flex flex-col justify-between w-1/4">
    <div class="rij-thumbnail min-h-[47%] rounded-b-none w-full p-4">
        <h1 class="text-header font-semiBold font-lato text-black">{{state.totalMarketCap}}</h1>
        <div class="font-lato font-medium">{{state.marketCapChange}} %</div>
        <div>Market Capitalization</div>
    </div>
    <div class="rij-thumbnail min-h-[47%] rounded-t-none w-full p-4">
        <h1 class="text-header font-semiBold text-black">{{state.topDefiCoinName}}</h1>
        <div class="font-lato font-medium">{{state.topDefiDom}} %</div>
        <div>Top DEFI Coin</div>

    </div>
</div>
</template>
<script setup>
import StatBoxVue from '@/components/stats/StatBox.vue'
import { useCoinStore } from '@/stores/coin'
import { reactive, ref, toRefs, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'

const { n } = useI18n()

const state = reactive({
    topDefiCoinName: '',
    topDefiDom: '',
    marketCapChange: '',
    totalMarketCap: ''
})

const stateAsRefs = toRefs(state)
const mostTrending = ref({
    header: 'Most Trending',
    description: '$ current price',
    figSymbol: 'currency'
})
const mostTraded = ref({
    header: 'Most Traded',
    description: '% of the price change',
    figSymbol: 'decimal'
})
const topGainer = ref({
    header: 'Top Gainer',
    description: '% of the price change',
    figSymbol: 'decimal'
})
const { fetchTrendingAsset, fetchGlobalCoinStats, fetchDefiStats } = useCoinStore()

fetchTrendingAsset()
fetchGlobalCoinStats()
fetchDefiStats()

const mapData = (data, propFigure = 'price_change_percentage_24h', propImage = 'image' ) => {
    const { name, symbol } = data
    return { name, symbol, figure: data[propFigure], image: data[propImage] }
}

watchEffect(() => {
    const { getTopGainer, getTrendingCrypto, getMostTraded, getTotalMarketCap, topDefiCoin, topDefiCoinDominance, mCapChange1dUSD } = useCoinStore()

    if (getTrendingCrypto && getTrendingCrypto.value) {
        Object.assign( mostTrending.value, mapData(getTrendingCrypto, 'usd', 'large') )
    }

    if (getTopGainer) {
        Object.assign( topGainer.value, mapData(getTopGainer) )
    }

    if (getMostTraded) {
        Object.assign( mostTraded.value, mapData(getMostTraded) )
    }

    if (getTotalMarketCap) {
        stateAsRefs.totalMarketCap.value = getTotalMarketCap
    }

    if (mCapChange1dUSD) {
        stateAsRefs.marketCapChange.value = mCapChange1dUSD
    }

    if (topDefiCoin) {
        stateAsRefs.topDefiCoinName.value = topDefiCoin
    }

    if (topDefiCoinDominance) {
        stateAsRefs.topDefiDom.value = topDefiCoinDominance
    }

    if (state.totalMarketCap) {
        state.totalMarketCap = n(state.totalMarketCap, 'decimal')
    }

    if (state.marketCapChange) {
        state.marketCapChange = n(state.marketCapChange, 'decimal')
    }

    if (state.topDefiDom) {
        state.topDefiDom = n(state.topDefiDom, 'decimal')
    }

})
</script>