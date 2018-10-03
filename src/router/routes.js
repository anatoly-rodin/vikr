import Main from '../components/Main';
import Profile from '../components/Profile.vue';
import LotInfo from '../components/LotInfo.vue';
import SignIn from '../components/SignIn.vue';
import SignUp from '../components/SignUp.vue';
import AddLot from '../components/AddLots.vue';
import MyLots from '../components/MyLots.vue';
import MyBids from '../components/MyBids.vue';
import UpdateLot from '../components/UpdateLot.vue';
import EditLotStatus from '../components/EditLotStatus.vue';
import UsersList from '../components/UsersList.vue';
import UserInfo from '../components/UserInfo.vue';
import EditUserRoles from '../components/EditUserRoles.vue';
import ErrorPage from '../components/ErrorPage.vue';

export default [
    {
        name: 'Home',
        path: '/',
        component: Main
    },
    {
        name: 'Profile',
        path: '/profile',
        component: Profile,
        meta: {
            requiresAuth: true
        }
    },
    {
        name: 'LotInfo',
        path: '/lots/:lotId',
        component: LotInfo,
        meta: {
            requiresAuth: true
        }
    },
    {
        name: 'EditLotStatus',
        path: '/lots/:lotId',
        component: EditLotStatus,
        meta: {
            requiresAuth: true,
            permissions: []
        }
    },
    {
        name: 'SignIn',
        path: '/signin',
        component: SignIn
    },
    {
        name: 'SignUp',
        path: '/signup',
        component: SignUp
    },
    {
        name: 'AddLot',
        path: '/addlot',
        component: AddLot,
        meta: {
            requiresAuth: true
        }
    },
    {
        name: 'MyLots',
        path: '/lots',
        component: MyLots,
        meta: {
            requiresAuth: true
        }
    },
    {
        name: 'MyBids',
        path: '/bids',
        component: MyBids,
        meta: {
            requiresAuth: true
        }
    },
    {
        name: 'UpdateLot',
        path: '/update/:lotId',
        component: UpdateLot,
        meta: {
            requiresAuth: true
        }
    },
    {
        name: 'UsersList',
        path: '/users',
        component: UsersList,
        props: false,
        meta: {
            requiresAuth: true
        }
    },
    {
        name: 'UserInfo',
        path: '/users/:userId',
        component: UserInfo,
        props: true,
        meta: {
            requiresAuth: true
        }
    },
    {
        name: 'EditUserRoles',
        path: '/users/:userId/edit',
        component: EditUserRoles,
        meta: {
            requiresAuth: true
        }
    },
    {
        name: 'notFound',
        path: '/404',
        component: ErrorPage
    },
    {
        path: '*',
        redirect: { name: 'notFound' },
        component: ErrorPage
    }
];
