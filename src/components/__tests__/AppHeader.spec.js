import { render, screen, getByText } from '@testing-library/vue'
import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, test } from 'vitest'
import AppHeader from '../layout/AppHeader.vue'

describe('AppHeader', () => {
    beforeEach(() => {
        // creates a fresh pinia and make it active so it's automatically picked
        // up by any useStore() call without having to pass it to it:
        // `useStore(pinia)`
        setActivePinia(createPinia())
    })

    it('if user not logged in do not show logout', async () => {
        // set
        render(AppHeader)
        // const logout = await screen.findByText('login')
        // assert
        expect(screen.getByText('Login'))
    })
})