<template>
    <div ref="table"></div>
</template>
<script setup>
import { reactive, ref, watchEffect } from 'vue'
import { TabulatorFull as Tabulator } from 'tabulator-tables'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { useCoinStore } from '@/stores/coin'
import { useI18n } from 'vue-i18n'

const { isAuthenticated } = storeToRefs(useAuthStore())
const { n } = useI18n()
const state = reactive({
    page: 1,
    pageSize: 5,
    totalPages: 0,
})

const table = ref(null)
let tabulator = ref(null) //variable to hold table
const { fetchAssets } = useCoinStore()
const bookMark = (cell, formatterParams, onRendered) => {
    return "<i class='text-left fa-regular fa-bookmark'></i>"
}


const columns = [
    {formatter: bookMark, width:40, headerSort:false},  
    {title: 'Name', field: 'name'}, 
    {title: 'Price', field: 'current_price', formatter:"money", formatterParams:{
            decimal:".",
            thousand:",",
            symbol:"$",
        }
    }, 
    {title: 'Change', field: 'ath_change_percentage', formatter:"money", formatterParams:{
            decimal:".",
            thousand:",",
        }
    }, 
    {title: 'Market cap', field: 'market_cap', formatter:"money", formatterParams:{
            decimal:".",
            thousand:",",
            precision:false,
        }
    }, 
    {title: 'Volume(24h)', field: 'total_volume', formatter:"money", formatterParams:{
            decimal:".",
            thousand:",",
            precision:false,
        }
    }, 
    {title: 'Supply', field: 'total_supply', formatter:"money", formatterParams:{
            decimal:".",
            thousand:",",
        }
    }
]

fetchAssets()

watchEffect(() => {
    state.pageSize = isAuthenticated.value ? 10 : state.pageSize

    const { assets, resultCoins } = useCoinStore()
    if (assets.length > 0) {
        tabulator.value = new Tabulator(table.value, {
            /**** Progressive load *****/
            // ajaxURL: process.env.VITE_COIN_API_URL + 'coins/markets?vs_currency=usd&order=market_cap_desc&sparkline=false', //per_page=' + state.pageSize + '&page=' + state.page + 
            // ajaxResponse: (url, params, response) => {
            //     console.log('ajax response>>', response);
            //     return { 
            //     "last_page":10, //the total number of available pages (this value must be greater than 0)
            //     "last_row":5,
            //     data: response
            // }},
            // progressiveLoad:"load",
            // progressiveLoadDelay:200,
            /********** */

            data: resultCoins && resultCoins.length > 0 ? resultCoins : assets,
            columns,
            layout:"fitColumns",
            pagination:true,
            paginationSize:state.pageSize,
            movableColumns:true,
            paginationInitialPage:state.page,
            paginationSizeSelector:[5, 10, 20, 50],
            paginationCounter: "pages",
        })
    }
})
</script>