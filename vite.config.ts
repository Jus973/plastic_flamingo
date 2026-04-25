import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        shop: resolve(__dirname, 'shop/index.html'),
        cart: resolve(__dirname, 'cart/index.html'),
        checkout: resolve(__dirname, 'checkout/index.html'),
        account: resolve(__dirname, 'account/index.html'),
        accountSettings: resolve(__dirname, 'account/settings/index.html'),
        signup: resolve(__dirname, 'signup/index.html'),
        orderStatus: resolve(__dirname, 'order-status/index.html'),
        stressCircular: resolve(__dirname, 'stress/circular/index.html'),
        stressCircularA: resolve(__dirname, 'stress/circular/a/index.html'),
        stressCircularB: resolve(__dirname, 'stress/circular/b/index.html'),
        stressRageDecoy: resolve(__dirname, 'stress/rage-decoy/index.html'),
        stressHiddenMenu: resolve(__dirname, 'stress/hidden-menu/index.html'),
        stressIconBar: resolve(__dirname, 'stress/icon-bar/index.html'),
        stressManyLinks: resolve(__dirname, 'stress/many-links/index.html'),
        stressSlow: resolve(__dirname, 'stress/slow/index.html'),
      },
    },
  },
})
