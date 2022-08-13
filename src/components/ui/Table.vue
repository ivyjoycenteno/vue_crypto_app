<template>
    <div ref="table"></div>
</template>
<script setup>
import { onMounted, ref, watchEffect } from 'vue'
import { TabulatorFull as Tabulator } from 'tabulator-tables'

const props = defineProps(['data'])
const table = ref(null)
let tabulator = ref(null)

onMounted(() => {
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

            data: props.data.assets,
            columns: props.data.columns,
            layout:"fitColumns",
            pagination:true,
            paginationSize:props.data.pageSize,
            movableColumns:true,
            paginationInitialPage:props.data.page,
            paginationSizeSelector:[5, 10, 20, 50],
            paginationCounter: "pages",
        })
})

</script>