class Session {
    constructor() {
        this.storageName = 'app_data';
    }

    getSecret() {
        const appData = localStorage.getItem(this.storageName);
        if (appData === null) return false;
        
        return JSON.parse(appData);
    }

    getToken() {
        const appData = localStorage.getItem(this.storageName);
        if (appData === null) return false;
        
        return JSON.parse(appData).fullToken;
    }

    setSecret(data) {
        let appData = {},
            tokenLife = new Date();
        
        for (let prop in data) {
            appData[prop] = data[prop];
        }
        
        appData['tokenDeadTime'] = new Date(tokenLife.getTime() + (data.tokenDeadTime * 1000)).toString();
        localStorage.setItem(this.storageName, JSON.stringify(appData));
        this.tokenService();
    }

    actuality() {
        let storageDate = localStorage.getItem(this.storageName);
        if (storageDate === null) return false;
        
        let actuality =  new Date(JSON.parse(storageDate).tokenDeadTime).getTime() - new Date().getTime();
        
        if (actuality < 0) {
            this.destroy();
        } else {
            this.tokenService();
            return true;
        }

        return false;
    }
    
    tokenService() {
        let storageDate = localStorage.getItem(this.storageName);
        let deadTime = new Date(new Date(JSON.parse(storageDate).tokenDeadTime).getTime() - 60000);
    
        let timer = setInterval(() => {
            if (new Date().getTime() >= deadTime) {
               let storage = JSON.parse(storageDate);
                storage.token = storage.refreshToken;
                storage.fullToken = 'Bearer ' + storage.refreshToken;
                localStorage.setItem(this.storageName, JSON.stringify(storage));
                clearInterval(timer);
            }
        }, 1000);
    }

    destroy() {
        localStorage.removeItem(this.storageName);
    }
}

export default new Session();
