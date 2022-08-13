<template>
<div class="flex w-full flex-row">
    <div class="self-center w-full text-right">
        <a v-if="isAuthenticated" href="#" class="mr-3"><router-link to="/logout">Logout</router-link></a>
        <span v-else>
            <a href="#" class="mr-3"><router-link to="/login">Login</router-link></a> | 
            <a href="#" class="ml-3"><router-link to="/signup">Signup</router-link></a>
        </span>
    </div>
</div>
</template>
<script setup>

import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

const { isAuthenticated } = storeToRefs(useAuthStore())

</script>