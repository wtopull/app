importScripts('/.nuxt/dist/workbox.476439e0.js')

const workboxSW = new self.WorkboxSW({
  "cacheId": "alpha",
  "clientsClaim": true,
  "directoryIndex": "/"
})

workboxSW.precache([
  {
    "url": "/.nuxt/dist/10.7dcf18c2d790f6bd87d0.js",
    "revision": "b34906389c3c37f7c16a3918caf76202"
  },
  {
    "url": "/.nuxt/dist/12.31ee2d58ccd1fe835cda.js",
    "revision": "5dc1159c480384c815e4afb41d4b96bb"
  },
  {
    "url": "/.nuxt/dist/2.62741246fba4aa84e8bf.js",
    "revision": "aa48e3a9c65bee7d313fe5138b0f1b2a"
  },
  {
    "url": "/.nuxt/dist/21.83c1c2ed8b117e37284d.js",
    "revision": "13ba641c175b7bce9facfc6fb6b7f302"
  },
  {
    "url": "/.nuxt/dist/23.15d1d97b25585dbbf4cf.js",
    "revision": "9c1ef77d3d5be3a7ee0be8b55a054c96"
  },
  {
    "url": "/.nuxt/dist/27.eb28b777096a5785bae8.js",
    "revision": "37d7de4371463c71c5d51d75f8cc95fa"
  },
  {
    "url": "/.nuxt/dist/28.a448098a63e5b9d43aa7.js",
    "revision": "1134a95d5588fae7a963f20c854c107b"
  },
  {
    "url": "/.nuxt/dist/29.c8af57eb80e1680d849f.js",
    "revision": "791657c623f1c983c7f6dc359f101ce3"
  },
  {
    "url": "/.nuxt/dist/30.c5f6a6c72368a8d85ae3.js",
    "revision": "cbe08fd16d87b0856f6cfb9ec817fae7"
  },
  {
    "url": "/.nuxt/dist/31.8b56ef99d98ca3a7a5cb.js",
    "revision": "f3956065417b5a207d1a1517558b0757"
  },
  {
    "url": "/.nuxt/dist/32.095e2429af5bcc240d82.js",
    "revision": "bbc1dea76bbd8bed213d6b839c6c310f"
  },
  {
    "url": "/.nuxt/dist/36.e1d4d8f5d29268af4e27.js",
    "revision": "1d0e2a4260a759e74b25f31115f07b5e"
  },
  {
    "url": "/.nuxt/dist/37.3599541eb0258d73fb4d.js",
    "revision": "13742f20855809dd7152826ef62519e4"
  },
  {
    "url": "/.nuxt/dist/39.ca2f25262cbfa685d6a8.js",
    "revision": "4b27eae3a93644cf3d38efc9bb66a958"
  },
  {
    "url": "/.nuxt/dist/4.1cc031587ca95d08f031.js",
    "revision": "57e88f78c2090ce1b1d1dd405e608e48"
  },
  {
    "url": "/.nuxt/dist/41.34df67c0b2b2caf697ef.js",
    "revision": "2d610f380e1be1e402d80680f45580b1"
  },
  {
    "url": "/.nuxt/dist/42.c1d6df89c0c3f23ca8ed.js",
    "revision": "180702191af8c134e6b94f9fe3aff5a2"
  },
  {
    "url": "/.nuxt/dist/43.bd303e6a415ed5d677bb.js",
    "revision": "cbb0875b1387a869a9fd04ff96cdbba8"
  },
  {
    "url": "/.nuxt/dist/44.d3465f86079acb0f7a88.js",
    "revision": "9fcb5a010a4aaf27f056e196ce8fea59"
  },
  {
    "url": "/.nuxt/dist/48.ad22ead2b169d28006ad.js",
    "revision": "b3db89df3f04812b23a7b9beff248608"
  },
  {
    "url": "/.nuxt/dist/51.796c82e21d1b67bbb0ce.js",
    "revision": "75c27c2e1595bc96f77d3535634e8254"
  },
  {
    "url": "/.nuxt/dist/52.7933623083b8a5fc8e9c.js",
    "revision": "5a577af3d177443fb10de92b55b75f9c"
  },
  {
    "url": "/.nuxt/dist/53.0404210c44ad31efff03.js",
    "revision": "434b5c4cfe8b3a6d8d26ff5b2d6ea68e"
  },
  {
    "url": "/.nuxt/dist/54.56dfed03ce85b9346759.js",
    "revision": "486a140bfa1af15ca74dfeffae17105f"
  },
  {
    "url": "/.nuxt/dist/55.d9ee6248f9c4e060517b.js",
    "revision": "f90b7dfccfcecdf121ee6dcc2ac839a0"
  },
  {
    "url": "/.nuxt/dist/57.d3ded08d562d1ed5ebcb.js",
    "revision": "ba8475ecb3b0dff3412f45e173b61930"
  },
  {
    "url": "/.nuxt/dist/58.dc1b282b9273b665a4ab.js",
    "revision": "2608bec2568c44117b4f8fefe384a8b6"
  },
  {
    "url": "/.nuxt/dist/69.1eff6c587b09bd3096e3.js",
    "revision": "21e1fea5dd94a8a95098a1a7ff768b11"
  },
  {
    "url": "/.nuxt/dist/70.6a6329c3ef6db17a7577.js",
    "revision": "6a1ef148d24e28ece0aaf7a2c5ab8529"
  },
  {
    "url": "/.nuxt/dist/71.8b481e3020ae18c562be.js",
    "revision": "84641c76e6a5609a562ed73fd0487a43"
  },
  {
    "url": "/.nuxt/dist/72.3ff3472ec42a0291bb97.js",
    "revision": "c0178be66a568511f8192aae8d91772a"
  },
  {
    "url": "/.nuxt/dist/73.c8de2de39fdffa6b556c.js",
    "revision": "bba8c4e2b6a338379684db0ee557854c"
  },
  {
    "url": "/.nuxt/dist/74.c77aadeadf58483ad84b.js",
    "revision": "14dedb71c3e02c1b354c7d230df57744"
  },
  {
    "url": "/.nuxt/dist/75.ab6de240b11cbf6daef8.js",
    "revision": "bfdc9100d10453506416596e81dc5111"
  },
  {
    "url": "/.nuxt/dist/76.558663c5ca2bf62fad38.js",
    "revision": "3145d50923c687d7f6536956e7ab5c4f"
  },
  {
    "url": "/.nuxt/dist/77.809a4ce2bd6f915c9012.js",
    "revision": "203560d489d3bed7a7d70cff76b5f82c"
  },
  {
    "url": "/.nuxt/dist/78.0b014b476037530b89e5.js",
    "revision": "f536f1c92788acea435332887382579d"
  },
  {
    "url": "/.nuxt/dist/79.6b40aa011748b32ed43c.js",
    "revision": "77ce7a92c4494aa05216a02593c6ab64"
  },
  {
    "url": "/.nuxt/dist/82.80c4f37b85d2e087a7f2.js",
    "revision": "742e1730fc5002dc836c76f223acb9ee"
  },
  {
    "url": "/.nuxt/dist/83.3befb3fb3a9f3745d5ef.js",
    "revision": "93ddb68fe0f90d71350b9cc82a0cd346"
  },
  {
    "url": "/.nuxt/dist/app.7e1bab9f373bd2cdaaaaedd52531e2b6.css",
    "revision": "7e1bab9f373bd2cdaaaaedd52531e2b6"
  },
  {
    "url": "/.nuxt/dist/app.8aab8a6e3337c4e6594a.js",
    "revision": "4fffff1605281eb2314f296462bf41fe"
  },
  {
    "url": "/.nuxt/dist/layouts_default.90347e0428033ec97434.js",
    "revision": "9fe7682efe501608c1a59976fa332151"
  },
  {
    "url": "/.nuxt/dist/manifest.4f6deaa7d9575b63e3ef.js",
    "revision": "e9c26f06b3ec474bba50832a8e0dea58"
  },
  {
    "url": "/.nuxt/dist/pages_404.a07b010d14419082da0e.js",
    "revision": "206cfb3535db00d00452c07b6f9e9ad4"
  },
  {
    "url": "/.nuxt/dist/pages_admin_agent_accountCenter.437c23f71729c4874a98.js",
    "revision": "f8fe7fe3e6524bba1a063ad14357c4bf"
  },
  {
    "url": "/.nuxt/dist/pages_admin_agent_index.6bbccdf9bf99978273d0.js",
    "revision": "949ac0a35512c7c8994d4ffc8501693d"
  },
  {
    "url": "/.nuxt/dist/pages_admin_agent_lottoOrder.cf93b98f21f7844fd4d0.js",
    "revision": "829f44c5f29b4d75de9da276103dac32"
  },
  {
    "url": "/.nuxt/dist/pages_admin_agent_lottoReport__name.be7921400fee8526d519.js",
    "revision": "54d9d4d296f197cc5c8b7ed0607002c5"
  },
  {
    "url": "/.nuxt/dist/pages_admin_agent_online.ea755db2dc3234434a3e.js",
    "revision": "5d1672dafac13531ae7675ec4f7f1442"
  },
  {
    "url": "/.nuxt/dist/pages_admin_agent_team__name.08e8f3deabefb189b252.js",
    "revision": "21d03f83877a1b43888e1d3393c88847"
  },
  {
    "url": "/.nuxt/dist/pages_admin_agent_transaction.0802ff26d912ad61100a.js",
    "revision": "e4c71f13fd5702ac31daf5b5b6162e91"
  },
  {
    "url": "/.nuxt/dist/pages_admin_agent_withdrawReport.d5f12abf630975baf1c7.js",
    "revision": "078edb303751c5956c04f063484bc939"
  },
  {
    "url": "/.nuxt/dist/pages_admin_agent.87635063b31dfe0cc9b6.js",
    "revision": "4a3c40b341e24b035286a322a2fc2299"
  },
  {
    "url": "/.nuxt/dist/pages_admin_message_compose.92af62f0d92c2c777e48.js",
    "revision": "3c0523d70ff91b26e8bcb4cd2f5d7bdc"
  },
  {
    "url": "/.nuxt/dist/pages_admin_message_index.56e689b129405f6e0bc6.js",
    "revision": "237e55926985b3549b196eeb15933404"
  },
  {
    "url": "/.nuxt/dist/pages_admin_message_outbox.01d3e3882d605aca57d1.js",
    "revision": "52a7c944d0d07530ce97925f07149b0e"
  },
  {
    "url": "/.nuxt/dist/pages_admin_message.b0717ef063f10f1f498e.js",
    "revision": "5bc1072fc19100391814ec32ea621e9a"
  },
  {
    "url": "/.nuxt/dist/pages_admin_payment_chargeReport.7ac6fe64c56a0bde52b0.js",
    "revision": "595c78b78425997b7a1860615c691ef3"
  },
  {
    "url": "/.nuxt/dist/pages_admin_payment_index.ac450d4d4822af30f972.js",
    "revision": "999e1f6bf2408d2a19195e34d45c9fd9"
  },
  {
    "url": "/.nuxt/dist/pages_admin_payment_withdraw.803cb7588d56899f394e.js",
    "revision": "56ecf6c3416d27b76e9beedefd0e2fd3"
  },
  {
    "url": "/.nuxt/dist/pages_admin_payment_withdrawReport.4e9a23853ce462908cfd.js",
    "revision": "e1e4b958b6a2ba86aabd488d00a26c0e"
  },
  {
    "url": "/.nuxt/dist/pages_admin_payment.664c9f6275d167030b2e.js",
    "revision": "230ae154ed2c62ae48e74b4b988c77cf"
  },
  {
    "url": "/.nuxt/dist/pages_admin_report_chaseOrder.66f71427a86a5fc9511b.js",
    "revision": "cadac29ecd93d421fae2c01e869276c3"
  },
  {
    "url": "/.nuxt/dist/pages_admin_report_index.38e5e8b4ee832e572fcf.js",
    "revision": "f948b4ae733d208c8b10389ab87940c5"
  },
  {
    "url": "/.nuxt/dist/pages_admin_report_lottoReport.03a860ebdb6171aec7e9.js",
    "revision": "2def244a78e1f2a4747aa0243665dee7"
  },
  {
    "url": "/.nuxt/dist/pages_admin_report_transaction.805cabde969615e87d55.js",
    "revision": "178852c5dede61a353262e4d3770173c"
  },
  {
    "url": "/.nuxt/dist/pages_admin_report.21eb74ba4cb84414ce72.js",
    "revision": "8207dc5b88ac3aeae67c49d159bbb14f"
  },
  {
    "url": "/.nuxt/dist/pages_admin_user_index.db410561072c6dc20595.js",
    "revision": "a9aba7e7208aa1b3c430b8f4b82badc5"
  },
  {
    "url": "/.nuxt/dist/pages_admin_user.437935db927177645208.js",
    "revision": "4077865cc28b0a1c2a57f934e3c7a063"
  },
  {
    "url": "/.nuxt/dist/pages_admin.e86c9abe03993e07cc00.js",
    "revision": "06a719a24af357622d62bc5c127b4538"
  },
  {
    "url": "/.nuxt/dist/pages_docs_fe_dev.f3646696e838c4c4840b.js",
    "revision": "c6b75add33d0dd6e1c4d96a9a5a6fc07"
  },
  {
    "url": "/.nuxt/dist/pages_docs_index.cf8fecc3462d1d2c4fcd.js",
    "revision": "69658667afb7f17241fef099c93a3cbd"
  },
  {
    "url": "/.nuxt/dist/pages_docs_invalid_api.1ad9566fa28b183c87d0.js",
    "revision": "4b6f31f2e2a18cfc9bfe39650a9114fd"
  },
  {
    "url": "/.nuxt/dist/pages_docs.3c2581a743b55e0abd9b.js",
    "revision": "4a1f9855d29905e411081090d8ee7c1c"
  },
  {
    "url": "/.nuxt/dist/pages_domains.290f9c0dde43cdb898ef.js",
    "revision": "6b898e002570c213dfa7137e28b3e705"
  },
  {
    "url": "/.nuxt/dist/pages_home.7298cc42f74ae1442357.js",
    "revision": "fcba3613e9268ca977936c3f3331c2eb"
  },
  {
    "url": "/.nuxt/dist/pages_index.fc4aaea32a15a8b14f27.js",
    "revision": "fb794c70bf95923cdcf1ed5796bb39b5"
  },
  {
    "url": "/.nuxt/dist/pages_login.5f57939745fa73e7374d.js",
    "revision": "8f7f19ef41969b8c4fe703bbddd53eb4"
  },
  {
    "url": "/.nuxt/dist/pages_lottery__name.df8fa3a622fcbbcbee68.js",
    "revision": "2dc622067a46aad426554221d73b019b"
  },
  {
    "url": "/.nuxt/dist/pages_news__id.03bf1db5c61cea0e48f2.js",
    "revision": "258f913b1055e466521ade0d0cc522df"
  },
  {
    "url": "/.nuxt/dist/pages_opend.f93ac63268ce6548e3e6.js",
    "revision": "ba525bd79766c4c4789cd995845dd333"
  },
  {
    "url": "/.nuxt/dist/pages_reposal__name.d6524a7a25c3a1f4705f.js",
    "revision": "f88c686c8571fd87f805dc3c0ee5808b"
  },
  {
    "url": "/.nuxt/dist/pages_signup__id.091c9118a3adea5b7a55.js",
    "revision": "a0439f1d3eb83f4dd0d944a122f9d968"
  },
  {
    "url": "/.nuxt/dist/pages_test.3129c668876a696cdf2c.js",
    "revision": "0ee4dd7c3531669e099402ba1ab327da"
  },
  {
    "url": "/.nuxt/dist/play-help.9df2bddc0fc887ddaf6b.js",
    "revision": "8d1c9fd603ae498a76e8c11bbb16c9a8"
  },
  {
    "url": "/.nuxt/dist/vendor.dc54fb811fdf77b903f3.js",
    "revision": "883437476b46ccfbf48eec30cbda40d1"
  }
])


workboxSW.router.registerRoute(new RegExp('/.nuxt/dist/.*'), workboxSW.strategies.cacheFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('/.*'), workboxSW.strategies.networkFirst({}), 'GET')

