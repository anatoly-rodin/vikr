<template>
    <div id="app">
        <div class="header">
            <div class="container">
                <div class="row">
                    <nav class="header__nav">
                        <router-link class="logo" to="/">
                            <span>Vikrey</span>
                        </router-link>
                    </nav>
                    <div class="header__user">
                        <div v-if="!isAutorized">
                            <router-link :to="{ name: 'SignIn' }">
                                <span>Sign in</span>
                            </router-link>
                            &nbsp;/&nbsp;
                            <router-link :to="{ name: 'SignUp' }">
                                <span>Sign Up</span>
                            </router-link>
                        </div>
                        <div v-else
                             class="dropdown-toggle"
                             data-toggle="dropdown"
                             role="button"
                             aria-haspopup="true"
                             aria-expanded="false">
                            <span>{{ this.$store.state.user.name }} <span class="caret"></span></span>
                            <ul class="dropdown-menu">
                                <li v-if="canCreateLot">
                                    <router-link :to="{ name: 'AddLot' }" href="javascript:void(0);">Add lots</router-link>
                                </li>
                                <li>
                                    <router-link :to="{ name: 'MyBids' }"
                                                 href="javascript:void(0);">
                                        Profile
                                    </router-link>
                                </li>
                                <li v-if="canSeeLots">
                                    <router-link :to="{ name: 'MyLots' }"
                                                 href="javascript:void(0);">
                                        My lots
                                    </router-link>
                                </li>
                                <li v-if="canSeeUsers">
                                    <router-link :to="{ name: 'UsersList' }"
                                                 href="javascript:void(0);">
                                        Users
                                    </router-link>
                                </li>
                                <li>
                                    <a href="javascript:void(0);" @click="logOut">
                                        <span>logout</span>
                                        <span class="glyphicon glyphicon-log-in"></span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <span class="glyphicon glyphicon-user" aria-hidden="true"></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="content">
            <transition name="fade">
                <router-view></router-view>
            </transition>
            <div class="loading" v-show="isLoading">
                <span>loading...</span>
            </div>
        </div>
    </div>
</template>
<script>
    import store from '@/store/index';
    
    export default {
        name: 'App',
        store,
        data() {
            return {}
        },
        methods: {
            logOut() {
                this.$store.dispatch('logout');
            }
        },
        computed: {
            isAutorized() {
                return this.$store.state.access;
            },
            isLoading() {
                return this.$store.state.loading;
            },
            canCreateLot() {
                let roles = this.$store.state.user.roles;
                return (roles.includes('ROLE_ADMIN') || roles.includes('ROLE_OPERATOR'));
            },
            canSeeLots() {
                let roles = this.$store.state.user.roles;
                return (roles.includes('ROLE_ADMIN') || roles.includes('ROLE_OPERATOR'));
            },
            canSeeUsers() {
                let roles = this.$store.state.user.roles;
                return roles.includes('ROLE_ADMIN');
            }
        }
    }
</script>
