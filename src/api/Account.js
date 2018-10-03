import api from './api';

class Account {
    signUp(data) {
        return api({
            method: 'post',
            url: 'api/user/register',
            data: {
                "username": data.name,
                "email": data.email,
                "plainPassword": {
                      "first": data.password,
                      "second": data.password
                    }
                }
        });
    }
    signIn(data) {
        let datar = {
            'grant_type': 'password',
            'client_id': '1_3bcbxd9e24g0gk4swg0kwgcwg4o8k8g4g888kwc44gcc0gwwk4',
            'client_secret': '4ok2x70rlfokc8g0wws8c8kwcokw80k44sg48goc0ok4w0so0k',
            'username': data.username,
            'password': data.password
        };

        return api({
            method: 'post',
            url: 'oauth/v2/token',
            data: datar
        });
    }
    isAdmin(data) {
        return api({
            method: 'get',
            url: '/api/user/isAdmin',
            headers: {
                'Authorization': data
            }
        });
    }
    getUserBids(data) {
        return api({
            method: 'get',
            url: '/api/lots/getUserBids',
            headers: {
                'Authorization': data
            }
        });
    }
    saveLots(data) {
        return api({
            method: 'post',
            url: '/api/lots/createLots',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': data.token
            },
            data: data.payload
        });
    }
    getActualLots(data) {
        return api({
            method: 'get',
            url: '/api/lots/getActualLots',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': data
            }
        });
    }
    getCreatorLots(data) {
        return api({
            method: 'get',
            url: '/api/lots/getCreatorLots',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': data
            }
        });
    }
    updateLot(data) {
        return api({
            method: 'post',
            url: '/api/lots/update/' + data.lotId,
            headers: {
                'Authorization': data.header
            },
            data: data.data
        });
    }
    setLotStatus(token, data) {
        return api({
            method: 'post',
            url: '/api/lots/setLotStatus',
            headers: {
                'Authorization': token
            },
            data: data
        });
    }
    getLotStatuses(data) {
        return api({
            method: 'get',
            url: '/api/lots/getLotStatuses',
            headers: {
                'Authorization': data
            }
        });
    }
    setBid(data) {
        return api({
            method: 'post',
            url: '/api/lots/bid?lotId=' + data.lotId + '&' + 'amount=' + data.amount,
            headers: {
                'Authorization': data.header
            }
        });
    }
    getBids(data) {
        return api({
            method: 'get',
            url: '/api/lots/getBids?id=',
            headers: {
                'Authorization': data
            }
        });
    }
    getUsers(data) {
        return api({
            method: 'get',
            url: '/api/user/getAllUsers',
            headers: {
                'Authorization': data
            }
        });
    }
    getUserInfo(data) {
        return api({
            method: 'get',
            url: '/api/user/getInfo',
            headers: {
                'Authorization': data
            }
        });
    }
    getUserRoles(token, id) {
        return api({
            method: 'get',
            url: '/api/user/getUserRoles?id=' + id,
            headers: {
                'Authorization': token
            }
        });
    }
    
    loadAllUsersRoles(token) {
        return api({
            method: 'get',
            url: '/api/user/getRoles',
            headers: {
                'Authorization': token
            }
        });
    }
    
    addUserRole(token, data) {
        return api({
            method: 'post',
            url: '/api/user/setRole',
            headers: {
                'Authorization': token
            },
            data: data
        });
    }
    
    removeUserRole(token, data) {
        return api({
            method: 'post',
            url: '/api/user/removeRole',
            headers: {
                'Authorization': token
            },
            data: data
        });
    }
}

let account = new Account();

export default account;
