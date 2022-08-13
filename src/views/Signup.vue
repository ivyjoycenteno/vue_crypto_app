<template>
    <div class="flex justify-between my-auto h-[60vh]">
        <div class="w-1/2 flex text-center border-gray-200/60 border-2 rounded-bl-3xl rounded-tl-3xl">
            <div class="m-auto w-1/2">
                <h1 class="text-header font-medium mb-5 text-black">Create account</h1>
                <form @submit.prevent="onSubmit">
                    <div class="flex flex-col mb-6">
                        <IdentificationIcon class="h-4 w-4 creds-ico-pos"/>
                        <input type="text" v-model="state.name" placeholder="Name" class="border-gray-200/95 bg-gray-200/60 outline-none pl-8 py-2 rounded mb-4"/>
                        
                        <MailIcon class="h-4 w-4 creds-ico-pos"/>
                        <input type="text" v-model="state.email" placeholder="Email" class="border-gray-200/95 bg-gray-200/60 outline-none pl-8 py-2 rounded mb-4"/>
                        
                        <UserIcon class="h-4 w-4 creds-ico-pos"/>
                        <input type="text" v-model="state.username" placeholder="Username" class="border-gray-200/95 bg-gray-200/60 outline-none pl-8 py-2 rounded mb-4"/>
                        
                        <LockClosedIcon class="h-4 w-4 creds-ico-pos"/>
                        <input type="password" v-model="state.password" placeholder="Password" class="border-gray-200/95 bg-gray-200/60 outline-none pl-8 py-2 rounded"/>
                    </div>
                    <button class="bg-teal-500/90 py-3 text-white rounded-full w-1/2 font-medium">SIGN UP</button>
                </form>
            </div>
        </div>
        <div class="flex bg-gray-200/60 w-1/2 rounded-br-3xl rounded-tr-3xl">
            <div class="m-auto w-1/2 text-center">
                <h1 class="text-header font-medium text-center text-black mb-5">Welcome back!</h1>
                <p>Be informed of the latest in crypto world and view vast of cryptocurrencies in Rij crypto market.</p>
                <p class="mb-5">Sign in your account and keep connected.</p>
                <button class="border-2 border-teal-600/60 py-3 rounded-full w-1/2 font-medium" @click="$router.push('login')">SIGN IN</button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { IdentificationIcon, UserIcon, MailIcon, LockClosedIcon } from '@heroicons/vue/outline'
import { useAuthStore } from '@/stores/auth'
import { reactive } from 'vue'

const state = reactive({
    name: '',
    email: '',
    username: '',
    password: ''
})


const onSubmit = () => {
    const { signup } = useAuthStore()
    if(state.username && state.email && state.password)
        signup({name: state.name, username: state.username, email: state.email, password: state.password})
}

</script>