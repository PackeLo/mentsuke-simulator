// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: [
    '~/assets/tailwind/output.css'
  ],
  app: {
    head: {
      meta: [
        // <meta name="viewport" content="width=device-width, initial-scale=1">
        { name: 'charset', content: 'UTF-8' },
        { name: 'description', content: 'ページ数を入力するだけで簡単に、中綴じ製本の面付けをシミュレーションします。製本作業の目安にご利用ください。' },
        { name: 'google-site-verification', content: '6r4SjTQqEqm9lt2fJwNnyQ_t51dTiTRtQ-TjpZK6JXA' },
      ],
      script: [
      {
        async: true, 
        src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1620906024044943",
        crossorigin: "anonymous"
      }
      ],
      link: [],
      // please note that this is an area that is likely to change
      style: [],
    }
  }
})
