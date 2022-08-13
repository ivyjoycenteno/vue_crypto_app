<template>
    <div class="flex justify-between my-auto h-[60vh]">
        <div class="w-1/2 flex text-center border-gray-200/60 border-2 rounded-bl-3xl rounded-tl-3xl">
            <div class="m-auto w-1/2">
                <h1 class="text-header font-medium mb-5 text-black">Sign in to Rij Crypto Market</h1>
                <form @submit.prevent="onSubmit">
                    <div class="flex flex-col mb-6">
                        <UserIcon class="h-4 w-4 creds-ico-pos"/>
                        <input type="text" v-model="state.usernameOrEmail" placeholder="Username or Email" class="border-gray-200/95 bg-gray-200/60 outline-none pl-8 py-2 rounded mb-4"/>
                        <LockClosedIcon class="h-4 w-4 creds-ico-pos"/>
                        <input type="password" v-model="state.password" placeholder="Password" class="border-gray-200/95 bg-gray-200/60 outline-none pl-8 py-2 rounded"/>
                    </div>
                    <button class="bg-teal-500/90 py-3 text-white rounded-full w-1/2 font-medium">SIGN IN</button>
                </form>
            </div>
        </div>
        <div class="flex bg-gray-200/60 w-1/2 rounded-br-3xl rounded-tr-3xl">
            <div class="m-auto w-1/2 text-center">
                <h1 class="text-header font-medium text-center text-black mb-5">Hello there!</h1>
                <p>Rij crypto market lets you view trends on crypto world.</p>
                <p class="mb-5">Sign up and get started today.</p>
                <button class="border-2 border-teal-600/60 py-3 rounded-full w-1/2 font-medium" @click="$router.push('signup')">SIGN UP</button>
            </div>
        </div>
    </div>
    
</template>
<script setup>
import { UserIcon, LockClosedIcon } from '@heroicons/vue/outline'
import { useAuthStore } from '@/stores/auth'
import { reactive } from 'vue'

const state = reactive({
    usernameOrEmail: '',
    password: ''
})

const onSubmit = () => {
    const { login } = useAuthStore()
    if(state.usernameOrEmail && state.password) {
        login({usernameOrEmail: state.usernameOrEmail, password: state.password})
    }
}

</script>