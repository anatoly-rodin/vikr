import Vue from 'vue';
import Vuex from 'vuex';
import Session from '../utils/Session';
import { Account } from '../api';
import router from '../router/index';
import {ADMIN, USER} from "../utils/roles";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        loading: false,
        access: Session.actuality(),
        user: {
            id: null,
            name: Session.getSecret().username,
            roles: Session.getSecret().roles || []
        },
        userBids: [],
        userLots: [],
        users: [],
        userById: {},
        actualLots: [],
        lotStatuses: [],
        userRoles: [],
        allUsersRoles: []
    },
    getters: {
        getName: (state) => {
            return state.user.name;
        },
        isLoadingData: (state) => {
            return state.loading;
        },
        getLot: state => id => {
            if (state.userLots == null) return {};

            return state.userLots.find(lot => lot.id === id);
        },
        getUserById: state => {
            return state.userById;
        },
        isAdmin: state => {
            return state.user.roles.includes(ADMIN) || false;
        },
        canSetBid: state => {
            return state.user.roles.includes(USER);
        },
        userRoles: state => {
            return state.userRoles;
        },
        getAllUsersRoles: state => {
            return state.allUsersRoles;
        }
    },
    mutations: {
        setAccess(state, data) {
            Session.setSecret({
                'token': data.access_token,
                'fullToken': 'Bearer ' + data.access_token,
                'refreshToken': data.refresh_token,
                'tokenDeadTime': data.expires_in,
                'username': state.user.name,
                'roles': state.user.roles
            });

            state.access = true;
            router.push({ name: 'Home' });
        },
        setName(state, data) {
            state.user.name = data;
        },
        destroy(state) {
            Session.destroy();
            state.access = false;
            state.loading = false;
            state.userLots = null;
            state.isAdmin = false;
            router.push({ name: 'Home' });
        },
        setUserBids(state, data) {
            state.userBids = data;
        },
        setUserLots(state, data) {
            state.userLots = data;
        },
        switchLoading(state, data) {
            state.loading = data;
        },
        setUsers(state, data) {
            state.users = data;
        },
        setUserInfo(state, data) {
            state.user.id = data.id;
            state.user.name = data.username;
            state.user.roles = data.roles;
        },
        setUserById(state, data) {
            state.userById = data;
        },
        setLotStatuses(state, data) {
            state.lotStatuses = data
        },
        setUserRoles(state, data) {
            state.userRoles = data;
        },
        setAllUsersRoles(state, data) {
            state.allUsersRoles = data;
        }
    },
    actions: {
        signIn({commit}, payload) {
            let authData = {};

            commit('switchLoading', true);

            Account.signIn(payload)
                .then((result) => {
                    let token = 'Bearer' + ' ' + result.data.access_token;
                    authData = result.data;

                    Account.getUserInfo(token)
                        .then((data) => {
                            commit('setUserInfo', data.data);
                        }).then(() => {
                            commit('setAccess', authData);
                        }).catch(() => {
                        alert('Ошибка загрузки информации о пользователе.');
                    });

                    commit('switchLoading', false);
                })
                .catch(() => {
                    alert('Ошибка входа.');
                    commit('switchLoading', false);
                });
        },
        signUp({commit}, payload) {
            commit('switchLoading', true);
            Account.signUp(payload)
                .then(
                    ({data}) => {
                        alert('Пользователь создан.');
                        commit('switchLoading', false);
                        router.push({name: 'Signin'});
                    })
                .catch(() => {
                    alert('Ошибка регистрации');
                    commit('switchLoading', false);
                });
        },
        logout({commit}) {
            commit('destroy');
            router.push({ name: 'Home' });
        },
        setBid({commit, state}, payload) {
            let dataForUpdate = {};

            dataForUpdate['header'] = Session.getToken();
            dataForUpdate['lotId'] = payload.lotId;
            dataForUpdate['amount'] = payload.amount;

            commit('switchLoading', true);

            Account.setBid(dataForUpdate).then(
                () => {
                    alert('Ставка сделана');
                    commit('switchLoading', false);
                    router.push({name: 'Home'});
                })
                .catch((e) => {
                    alert('Ошибка создания ставки');
                    commit('switchLoading', false);
                });
        },
        saveLots({commit, state}, payload) {
            let token = Session.getToken();
            commit('switchLoading', true);
            Account.saveLots({token, payload}).then(
                ({data}) => {
                    commit('switchLoading', false);
                    router.push({name: 'MyLots'});
                })
                .catch((data) => {
                    alert('Ошибка создания лота/лотов');
                    commit('switchLoading', false);
                });
        },
        updateLot({commit, state}, payload) {
            let dataForUpdate = {};

            dataForUpdate['header'] = Session.getToken();
            dataForUpdate['lotId'] = payload.lotId;
            dataForUpdate['data'] = payload.data;

            commit('switchLoading', true);

            Account.updateLot(dataForUpdate)
                .then(() => {
                    alert('Лот обновлен');
                    commit('switchLoading', false);
                    router.push({name: 'MyLots'});
                })
                .catch((e) => {
                    alert('Ошибка обновления лота');
                    commit('switchLoading', false);
                });
        },
        getUserBids({commit, state}) {
            commit('switchLoading', true);
            Account.getUserBids(Session.getToken()).then(
                ({data}) => {
                    commit('setUserBids', data);
                    commit('switchLoading', false);
                })
                .catch((e) => {
                    alert('Ошибка загрузки ставок');
                });
        },
        getActualLots({commit, state}) {
            commit('switchLoading', true);

            Account.getActualLots(Session.getToken())
                .then(({data}) => {
                    commit('switchLoading', false);
                    state.actualLots = data || [];
                })
                .catch((data) => {
                    state.actualLots = [];

                    (data.response.status == '404') ?
                        alert('Активных лотов нет.') :
                        alert('Ошибка загрузки активных лотов.');

                    commit('switchLoading', false);

                });
        },
        getCreatorLots({commit, state}) {
            commit('switchLoading', true);
            Account.getCreatorLots(Session.getToken()).then(
                ({data}) => {
                    commit('switchLoading', false);
                    commit('setUserLots', data);
                })
                .catch((data) => {
                    commit('setUserLots', []);

                    (data.response.status == '404') ?
                        alert('Лоты отсутсвуют') :
                        alert('Ошибка загрузки лотов');

                    commit('switchLoading', false);
                });
        },
        getBids({commit, state}, payload) {
            Account.getBids(payload).then(
                ({data}) => {
                    //commit('setUserBids', data);
                })
                .catch((e) => {
                    alert('Ошибка');
                });
        },
        getUsers({commit}) {
            commit('switchLoading', true);

            Account.getUsers(Session.getToken()).then(
                ({data}) => {
                    commit('switchLoading', false);
                    commit('setUsers', data);
                })
                .catch((data) => {
                    (data.response.status == '404') ?
                        alert('Пользователи отсутствуют') : "";

                    commit('switchLoading', false);
                });
        },
        getUserById({ commit }, payload) {
            commit('switchLoading', true);

            Account.getUsers(Session.getToken())
                .then(({data}) => {
                    if (data.find(user => user.id == payload)) {
                        commit('setUserById', data.find(user => user.id == payload));
                        commit('switchLoading', false);
                    } else {
                        commit('switchLoading', false);
                        alert('Пользователь отсутствует.');
                        router.push({ name: 'UsersList' });
                    }
                }).catch((data) => {
                    (data.response.status == '404') ?
                        alert('Пользователь отсутствует') : '';
                    commit('switchLoading', false);
                });
        },
        setLotStatus({commit}, payload) {
            commit('switchLoading', true);

            Account.setLotStatus(Session.getToken(), payload).then(
                ({data}) => {
                    commit('switchLoading', false);
                    alert('Статус лота обновлен.');
                    router.push({name: 'MyLots'});
                })
                .catch((data) => {
                    alert('Ошибка обновления лота.');
                    commit('switchLoading', false);
                });
        },
        getLotStatuses({commit}) {
            commit('switchLoading', true);
            Account.getLotStatuses(Session.getToken()).then(
                ({data}) => {
                    commit('setLotStatuses', data);
                    commit('switchLoading', false);
                })
                .catch((data) => {
                    alert('Ощибка загрузки статусов лота.');
                    commit('switchLoading', false);
                });
        },
        getUserRoles({ commit }, payload) {
            commit('switchLoading', true);

            Account.getUserRoles(Session.getToken(), payload)
                .then(({data}) => {
                    commit('setUserRoles', data);

                    Account.loadAllUsersRoles(Session.getToken())
                        .then(({data}) => {
                            commit('setAllUsersRoles', data);
                            commit('switchLoading', false);
                        }).catch((data) => {
                            alert('Ощибка загрузки статусов.');
                            commit('switchLoading', false);
                        });
                }).catch((data) => {
                    alert('Ощибка загрузки статусов пользователя.');
                    commit('switchLoading', false);
                });
        },
        addRole({ commit }, payload) {
            commit('switchLoading', true);

            Account.addUserRole(Session.getToken(), payload)
                .then(() => {
                    commit('switchLoading', false);
                    alert('Роль добавлена.');
                    router.push({name: 'UsersList'});
                })
                .catch((data) => {
                    alert('Ошибка добавления роли.');
                    commit('switchLoading', false);
                });
        },
        removeRole({ commit }, payload) {
            commit('switchLoading', true);

            Account.removeUserRole(Session.getToken(), payload)
                .then(() => {
                    commit('switchLoading', false);
                    alert('Роль удалена.');
                    router.push({name: 'UsersList'});
                })
                .catch((data) => {
                    alert('Ошибка добавления роли.');
                    commit('switchLoading', false);
                });
        }
    }
});

export default store;
