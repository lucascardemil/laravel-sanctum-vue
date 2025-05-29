import Noty from 'noty'

export default {
    install(app) {
        app.config.globalProperties.$noty = function ({ text, type = 'alert' }) {
            return new Noty({
                text,
                type,
                layout: 'topRight',
                timeout: 2500,
                progressBar: true,
                theme: 'mint'
            }).show()
        }
    }
}
