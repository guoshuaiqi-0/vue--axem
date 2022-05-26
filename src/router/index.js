import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [{
		path: '/home',
		name: 'home',
		component: HomeView,
		children: [{
			path: '/questionBank',
			name: 'questionBank',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import( /* webpackChunkName: "about" */ '../views/QuestionBank.vue')
		}, {
			path: '/JSquestionBank',
			name: 'JSquestionBank',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import( /* webpackChunkName: "about" */ '../views/JSQuestionBank.vue')
		}, {
			path: '/personalData',
			name: 'personalData',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import( /* webpackChunkName: "about" */ '../views/PersonalData.vue')
		}, {
			path: '/calendarInterface',
			name: 'calendarInterface',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import( /* webpackChunkName: "about" */ '../views/CalendarInterface.vue')
		}, {
			path: '/createTask',
			name: 'createTask',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import( /* webpackChunkName: "about" */ '../views/CreateTask.vue')
		}, {
			path: '/taskList',
			name: 'taskList',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import( /* webpackChunkName: "about" */ '../views/TaskList.vue')
		}, {
			path: '/roleManagement',
			name: 'roleManagement',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import( /* webpackChunkName: "about" */ '../views/RoleManagement.vue')
		}, {
			path: '/taskDetails',
			name: 'taskDetails',
			component: () => import( /* webpackChunkName: "about" */ '../views/TaskDetails.vue')
		}]
	},
	{
		path: '/',
		name: 'about',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import( /* webpackChunkName: "about" */ '../views/DengLu.vue')
	},
	{
		path: '/register',
		name: 'register',
		component: () => import( /* webpackChunkName: "about" */ '../views/RegisterView.vue')
	},

]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
