import { defineStore } from "pinia"
import api from '@/services/api'
import { toRaw } from "vue"

export const useCoinStore = defineStore('coin-store', {
    state: () => ({
        assets: [],
        trendingAsset: null,
        totalMarketCap: [],
        mCapChange1dUSD: 0,
        topDefiCoin: null,
        topDefiCoinDominance: 0,
        totalCoins: 0,
        resultCoins: null,
        error: null
    }),
    getters: {
        getTotalCoins: (state) => toRaw(state.totalCoins),
        getCryptos: (state) => toRaw(state.assets),
        getTrendingCrypto: (state) => state.trendingAsset,
        getTopGainer: (state) => {
            const asset = {}
            if(state.assets.length > 0) {
                Object.assign( asset, state.assets.reduce( (prev, current) => {
                    return prev.price_change_percentage_24h > current.price_change_percentage_24h ? prev : current
                }))
            }
            return asset
        },
        getMostTraded: (state) => {
            const asset = {}
            if(state.assets.length > 0) {
                const topMCap = state.assets.find(r => r.market_cap_rank === 1)
                Object.assign(asset, topMCap)
            }
            return asset
        },
        getTotalMarketCap: (state) => {
            if(state.totalMarketCap.length > 0) {
                return state.totalMarketCap.reduce( (p, n ) => p + n, 0 )
            }
            return 0
        }
    },
    actions: {
        async fetchGlobalCoinStats() {
            await api.get(process.env.VITE_COIN_API_URL + 'global')
            .then(r => {
                const { data } = r.data
                if (data) {
                    const { market_cap_change_percentage_24h_usd, total_market_cap, active_cryptocurrencies } = data
                    this.mCapChange1dUSD = market_cap_change_percentage_24h_usd
                    this.totalMarketCap = Object.values(total_market_cap)
                    this.totalCoins = active_cryptocurrencies
                }
            })
            .catch(e => {
                console.log(e)
                this.error = e
            })
        },
        async fetchAssets(page = 1, pageSize = 100) {
            try {
                await api.get(process.env.VITE_COIN_API_URL + 'coins/markets?vs_currency=usd&order=market_cap_desc&per_page=' + pageSize + '&page=' + page + '&sparkline=false')
                .then( r => this.assets = r.data )
            }
            catch (e) {
                console.log('store error>>', e)
                this.error = e
            }
        },
        async fetchTrendingAsset() {
            await api.get(process.env.VITE_COIN_API_URL + 'search/trending')
            .then(r => r.data.coins[0].item)
            .then( async (item) => {
                const { id } = item
                this.trendingAsset = Object.assign( {}, this.trendingAsset, item)
                await api.get(process.env.VITE_COIN_API_URL + 'simple/price?vs_currencies=usd&ids=' + id)
                .then(s => s.data[id])
                .then(d => this.trendingAsset.value = Object.assign( this.trendingAsset, item, d))
                .catch(e => {
                    console.log(e)
                    this.error = e
                })
            })
            .catch(e => {
                console.log(e)
                this.error = e
            })
            
        },
        async fetchDefiStats() {
            await api.get(process.env.VITE_COIN_API_URL + 'global/decentralized_finance_defi')
            .then(r => {
                const { data } = r.data
                if (data) {
                    const { top_coin_name, top_coin_defi_dominance } = data
                    this.topDefiCoin = top_coin_name
                    this.topDefiCoinDominance = top_coin_defi_dominance
                }
            })
            .catch(e => {
                console.log(e)
                this.error = e
            })
        },
        async searchCoins(str) {
            await api.get(process.env.VITE_COIN_API_URL + 'search?query=' + str)
            .then(r => r.data)
            .then(r => r.coins)
            .then(r => this.resultCoins = r)
            .catch(e => {
                console.log(e)
                this.error = e
            })
        },
        resetSearchQry() {
            this.resultCoins = ''
        }
    }
})