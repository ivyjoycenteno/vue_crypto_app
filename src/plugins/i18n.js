import { createI18n } from 'vue-i18n'

const numberFormats = {
    'en-US': {
        currency: {
            style: 'currency', currency: 'USD', notation: 'standard'
        },
        decimal: {
            style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2
        },
        percent: {
            style: 'percent', useGrouping: false
        }
    }
}

export default createI18n({
    numberFormats,
    legacy: false,
    locale: 'en-US',
    globalInjection: true
})
