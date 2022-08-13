import { defineStore } from "pinia"
import { useAuthStore } from "./auth"
import CONSTANTS from "@/services/constants"

const { isAuthenticated } = useAuthStore()
export const useTabStore = defineStore('tab-store', {
    state: () => ({
        activeTab: isAuthenticated ? CONSTANTS.portfolioTab : CONSTANTS.coinListTab
    }),
    actions: {
        activateTab(tab) {
            this.activeTab = tab
        }
    }
})