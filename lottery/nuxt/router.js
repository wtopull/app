import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _111a9952 = () => import('..\\pages\\slot.vue' /* webpackChunkName: "pages_slot" */).then(m => m.default || m)
const _2cf38b51 = () => import('..\\pages\\opend.vue' /* webpackChunkName: "pages_opend" */).then(m => m.default || m)
const _6b6b8514 = () => import('..\\pages\\docs.vue' /* webpackChunkName: "pages_docs" */).then(m => m.default || m)
const _126eb0ee = () => import('..\\pages\\docs\\index.vue' /* webpackChunkName: "pages_docs_index" */).then(m => m.default || m)
const _a6ce06f4 = () => import('..\\pages\\docs\\example.vue' /* webpackChunkName: "pages_docs_example" */).then(m => m.default || m)
const _45960f67 = () => import('..\\pages\\docs\\architecture.vue' /* webpackChunkName: "pages_docs_architecture" */).then(m => m.default || m)
const _c7e7cbec = () => import('..\\pages\\docs\\style_guide.vue' /* webpackChunkName: "pages_docs_style_guide" */).then(m => m.default || m)
const _5c442e74 = () => import('..\\pages\\admin.vue' /* webpackChunkName: "pages_admin" */).then(m => m.default || m)
const _356ea811 = () => import('..\\pages\\admin\\user.vue' /* webpackChunkName: "pages_admin_user" */).then(m => m.default || m)
const _208aa751 = () => import('..\\pages\\admin\\user\\index.vue' /* webpackChunkName: "pages_admin_user_index" */).then(m => m.default || m)
const _300c0d9e = () => import('..\\pages\\admin\\message.vue' /* webpackChunkName: "pages_admin_message" */).then(m => m.default || m)
const _72105b9e = () => import('..\\pages\\admin\\message\\index.vue' /* webpackChunkName: "pages_admin_message_index" */).then(m => m.default || m)
const _98de8e24 = () => import('..\\pages\\admin\\message\\outbox.vue' /* webpackChunkName: "pages_admin_message_outbox" */).then(m => m.default || m)
const _b636359e = () => import('..\\pages\\admin\\message\\compose.vue' /* webpackChunkName: "pages_admin_message_compose" */).then(m => m.default || m)
const _0165e9af = () => import('..\\pages\\admin\\agent.vue' /* webpackChunkName: "pages_admin_agent" */).then(m => m.default || m)
const _ebdc101a = () => import('..\\pages\\admin\\agent\\index.vue' /* webpackChunkName: "pages_admin_agent_index" */).then(m => m.default || m)
const _20fdb13f = () => import('..\\pages\\admin\\agent\\transaction.vue' /* webpackChunkName: "pages_admin_agent_transaction" */).then(m => m.default || m)
const _06b386fe = () => import('..\\pages\\admin\\agent\\contract.vue' /* webpackChunkName: "pages_admin_agent_contract" */).then(m => m.default || m)
const _69e151e6 = () => import('..\\pages\\admin\\agent\\contract\\manage.vue' /* webpackChunkName: "pages_admin_agent_contract_manage" */).then(m => m.default || m)
const _765de302 = () => import('..\\pages\\admin\\agent\\online.vue' /* webpackChunkName: "pages_admin_agent_online" */).then(m => m.default || m)
const _0f9a61ce = () => import('..\\pages\\admin\\agent\\team\\_name.vue' /* webpackChunkName: "pages_admin_agent_team__name" */).then(m => m.default || m)
const _2fe0554c = () => import('..\\pages\\admin\\agent\\contract_list.vue' /* webpackChunkName: "pages_admin_agent_contract_list" */).then(m => m.default || m)
const _6c446c6a = () => import('..\\pages\\admin\\agent\\withdraw_report.vue' /* webpackChunkName: "pages_admin_agent_withdraw_report" */).then(m => m.default || m)
const _5c624abc = () => import('..\\pages\\admin\\agent\\lotto_order.vue' /* webpackChunkName: "pages_admin_agent_lotto_order" */).then(m => m.default || m)
const _7f688158 = () => import('..\\pages\\admin\\agent\\contract_prize.vue' /* webpackChunkName: "pages_admin_agent_contract_prize" */).then(m => m.default || m)
const _00643e56 = () => import('..\\pages\\admin\\agent\\account_center.vue' /* webpackChunkName: "pages_admin_agent_account_center" */).then(m => m.default || m)
const _96f59450 = () => import('..\\pages\\admin\\agent\\game_report\\_name.vue' /* webpackChunkName: "pages_admin_agent_game_report__name" */).then(m => m.default || m)
const _7f97d8a0 = () => import('..\\pages\\admin\\payment.vue' /* webpackChunkName: "pages_admin_payment" */).then(m => m.default || m)
const _fe7c8a5c = () => import('..\\pages\\admin\\payment\\index.vue' /* webpackChunkName: "pages_admin_payment_index" */).then(m => m.default || m)
const _3e22518c = () => import('..\\pages\\admin\\payment\\withdraw.vue' /* webpackChunkName: "pages_admin_payment_withdraw" */).then(m => m.default || m)
const _20a929fb = () => import('..\\pages\\admin\\payment\\third_platform.vue' /* webpackChunkName: "pages_admin_payment_third_platform" */).then(m => m.default || m)
const _f7858ec2 = () => import('..\\pages\\admin\\payment\\charge_report.vue' /* webpackChunkName: "pages_admin_payment_charge_report" */).then(m => m.default || m)
const _19ec8900 = () => import('..\\pages\\admin\\payment\\platform_report.vue' /* webpackChunkName: "pages_admin_payment_platform_report" */).then(m => m.default || m)
const _16e16489 = () => import('..\\pages\\admin\\payment\\withdraw_report.vue' /* webpackChunkName: "pages_admin_payment_withdraw_report" */).then(m => m.default || m)
const _30dbbd0c = () => import('..\\pages\\admin\\report.vue' /* webpackChunkName: "pages_admin_report" */).then(m => m.default || m)
const _5a9875c8 = () => import('..\\pages\\admin\\report\\index.vue' /* webpackChunkName: "pages_admin_report_index" */).then(m => m.default || m)
const _6381bb54 = () => import('..\\pages\\admin\\report\\transaction.vue' /* webpackChunkName: "pages_admin_report_transaction" */).then(m => m.default || m)
const _86760e9a = () => import('..\\pages\\admin\\report\\chase_order.vue' /* webpackChunkName: "pages_admin_report_chase_order" */).then(m => m.default || m)
const _f2e5cd7e = () => import('..\\pages\\admin\\report\\lotto_report.vue' /* webpackChunkName: "pages_admin_report_lotto_report" */).then(m => m.default || m)
const _6676e1a4 = () => import('..\\pages\\admin\\playhelp\\_type.vue' /* webpackChunkName: "pages_admin_playhelp__type" */).then(m => m.default || m)
const _04f152f7 = () => import('..\\pages\\real.vue' /* webpackChunkName: "pages_real" */).then(m => m.default || m)
const _fe928bf8 = () => import('..\\pages\\about.vue' /* webpackChunkName: "pages_about" */).then(m => m.default || m)
const _172ec422 = () => import('..\\pages\\404.vue' /* webpackChunkName: "pages_404" */).then(m => m.default || m)
const _6a1637e0 = () => import('..\\pages\\login.vue' /* webpackChunkName: "pages_login" */).then(m => m.default || m)
const _35401de6 = () => import('..\\pages\\domains.vue' /* webpackChunkName: "pages_domains" */).then(m => m.default || m)
const _1b3b65b8 = () => import('..\\pages\\home.vue' /* webpackChunkName: "pages_home" */).then(m => m.default || m)
const _04108bf7 = () => import('..\\pages\\chess.vue' /* webpackChunkName: "pages_chess" */).then(m => m.default || m)
const _7f3338b2 = () => import('..\\pages\\events.vue' /* webpackChunkName: "pages_events" */).then(m => m.default || m)
const _1848b82a = () => import('..\\pages\\test.vue' /* webpackChunkName: "pages_test" */).then(m => m.default || m)
const _cae1dc5a = () => import('..\\pages\\issues.vue' /* webpackChunkName: "pages_issues" */).then(m => m.default || m)
const _6913c162 = () => import('..\\pages\\issues\\index.vue' /* webpackChunkName: "pages_issues_index" */).then(m => m.default || m)
const _5d17e98e = () => import('..\\pages\\issues\\doc_enter.vue' /* webpackChunkName: "pages_issues_doc_enter" */).then(m => m.default || m)
const _66a8f4d9 = () => import('..\\pages\\signup\\_id.vue' /* webpackChunkName: "pages_signup__id" */).then(m => m.default || m)
const _f233f152 = () => import('..\\pages\\reposal\\_name.vue' /* webpackChunkName: "pages_reposal__name" */).then(m => m.default || m)
const _3a45bf1a = () => import('..\\pages\\lottery\\_name.vue' /* webpackChunkName: "pages_lottery__name" */).then(m => m.default || m)
const _543bd93e = () => import('..\\pages\\news\\_id.vue' /* webpackChunkName: "pages_news__id" */).then(m => m.default || m)
const _b5864186 = () => import('..\\pages\\ui_docs.vue' /* webpackChunkName: "pages_ui_docs" */).then(m => m.default || m)
const _285446a5 = () => import('..\\pages\\ui_docs\\index.vue' /* webpackChunkName: "pages_ui_docs_index" */).then(m => m.default || m)
const _bf22d66e = () => import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */).then(m => m.default || m)



if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise(resolve => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash && document.querySelector(to.hash)) {
        // scroll to anchor by returning the selector
        position = { selector: to.hash }
      }
      resolve(position)
    })
  })
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'active',
    scrollBehavior,
    routes: [
		{
			path: "/slot",
			component: _111a9952,
			name: "slot"
		},
		{
			path: "/opend",
			component: _2cf38b51,
			name: "opend"
		},
		{
			path: "/docs",
			component: _6b6b8514,
			children: [
				{
					path: "",
					component: _126eb0ee,
					name: "docs"
				},
				{
					path: "example",
					component: _a6ce06f4,
					name: "docs-example"
				},
				{
					path: "architecture",
					component: _45960f67,
					name: "docs-architecture"
				},
				{
					path: "style:guide",
					component: _c7e7cbec,
					name: "docs-styleguide"
				}
			]
		},
		{
			path: "/admin",
			component: _5c442e74,
			name: "admin",
			children: [
				{
					path: "user",
					component: _356ea811,
					children: [
						{
							path: "",
							component: _208aa751,
							name: "admin-user"
						}
					]
				},
				{
					path: "message",
					component: _300c0d9e,
					children: [
						{
							path: "",
							component: _72105b9e,
							name: "admin-message"
						},
						{
							path: "outbox",
							component: _98de8e24,
							name: "admin-message-outbox"
						},
						{
							path: "compose",
							component: _b636359e,
							name: "admin-message-compose"
						}
					]
				},
				{
					path: "agent",
					component: _0165e9af,
					children: [
						{
							path: "",
							component: _ebdc101a,
							name: "admin-agent"
						},
						{
							path: "transaction",
							component: _20fdb13f,
							name: "admin-agent-transaction"
						},
						{
							path: "contract",
							component: _06b386fe,
							name: "admin-agent-contract",
							children: [
								{
									path: "manage",
									component: _69e151e6,
									name: "admin-agent-contract-manage"
								}
							]
						},
						{
							path: "online",
							component: _765de302,
							name: "admin-agent-online"
						},
						{
							path: "team/:name?",
							component: _0f9a61ce,
							name: "admin-agent-team-name"
						},
						{
							path: "contract:list",
							component: _2fe0554c,
							name: "admin-agent-contractlist"
						},
						{
							path: "withdraw:report",
							component: _6c446c6a,
							name: "admin-agent-withdrawreport"
						},
						{
							path: "lotto:order",
							component: _5c624abc,
							name: "admin-agent-lottoorder"
						},
						{
							path: "contract:prize",
							component: _7f688158,
							name: "admin-agent-contractprize"
						},
						{
							path: "account:center",
							component: _00643e56,
							name: "admin-agent-accountcenter"
						},
						{
							path: "game:report/:name?",
							component: _96f59450,
							name: "admin-agent-gamereport-name"
						}
					]
				},
				{
					path: "payment",
					component: _7f97d8a0,
					children: [
						{
							path: "",
							component: _fe7c8a5c,
							name: "admin-payment"
						},
						{
							path: "withdraw",
							component: _3e22518c,
							name: "admin-payment-withdraw"
						},
						{
							path: "third:platform",
							component: _20a929fb,
							name: "admin-payment-thirdplatform"
						},
						{
							path: "charge:report",
							component: _f7858ec2,
							name: "admin-payment-chargereport"
						},
						{
							path: "platform:report",
							component: _19ec8900,
							name: "admin-payment-platformreport"
						},
						{
							path: "withdraw:report",
							component: _16e16489,
							name: "admin-payment-withdrawreport"
						}
					]
				},
				{
					path: "report",
					component: _30dbbd0c,
					children: [
						{
							path: "",
							component: _5a9875c8,
							name: "admin-report"
						},
						{
							path: "transaction",
							component: _6381bb54,
							name: "admin-report-transaction"
						},
						{
							path: "chase:order",
							component: _86760e9a,
							name: "admin-report-chaseorder"
						},
						{
							path: "lotto:report",
							component: _f2e5cd7e,
							name: "admin-report-lottoreport"
						}
					]
				},
				{
					path: "playhelp/:type?",
					component: _6676e1a4,
					name: "admin-playhelp-type"
				}
			]
		},
		{
			path: "/real",
			component: _04f152f7,
			name: "real"
		},
		{
			path: "/about",
			component: _fe928bf8,
			name: "about"
		},
		{
			path: "/404",
			component: _172ec422,
			name: "404"
		},
		{
			path: "/login",
			component: _6a1637e0,
			name: "login"
		},
		{
			path: "/domains",
			component: _35401de6,
			name: "domains"
		},
		{
			path: "/home",
			component: _1b3b65b8,
			name: "home"
		},
		{
			path: "/chess",
			component: _04108bf7,
			name: "chess"
		},
		{
			path: "/events",
			component: _7f3338b2,
			name: "events"
		},
		{
			path: "/test",
			component: _1848b82a,
			name: "test"
		},
		{
			path: "/issues",
			component: _cae1dc5a,
			children: [
				{
					path: "",
					component: _6913c162,
					name: "issues"
				},
				{
					path: "doc:enter",
					component: _5d17e98e,
					name: "issues-docenter"
				}
			]
		},
		{
			path: "/signup/:id?",
			component: _66a8f4d9,
			name: "signup-id"
		},
		{
			path: "/reposal/:name?",
			component: _f233f152,
			name: "reposal-name"
		},
		{
			path: "/lottery/:name?",
			component: _3a45bf1a,
			name: "lottery-name"
		},
		{
			path: "/news/:id?",
			component: _543bd93e,
			name: "news-id"
		},
		{
			path: "/ui:docs",
			component: _b5864186,
			children: [
				{
					path: "",
					component: _285446a5,
					name: "uidocs"
				}
			]
		},
		{
			path: "/",
			component: _bf22d66e,
			name: "index"
		}
    ],
    
    
    fallback: false
  })
}
