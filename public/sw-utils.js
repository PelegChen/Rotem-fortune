// eslint-disable-next-line @typescript-eslint/no-unused-vars
class ServiceWorkerConstants {
    static   GHPATH = '/Rotem-fortune';
    static   APP_PREFIX = 'rtmfort_';
    static   VERSION = 'version_00';

    static get CACHE_CORE_NAME() {
        return ServiceWorkerConstants.APP_PREFIX + 'core'; // core
    }

    static get CACHE_NAME() {
        return ServiceWorkerConstants.APP_PREFIX + ServiceWorkerConstants.VERSION;
    };

}


// eslint-disable-next-line @typescript-eslint/no-unused-vars
class ServiceWorkerDebug {
    static isDebugMode = false;
    static intervalId = null;
    static logsRecord = [];
    static debounceTime = 1000;

    static isLoggingToConsole() {
        return self.location.hostname === 'localhost' && !ServiceWorkerDebug.isDebugMode;
    }

    static log(...args) {
        if (!ServiceWorkerDebug.isLoggingToConsole()) {
            return;
        }
        console.log(...args);
    }

    static debounceLog(...args) {
        if (args && args.length === 1) {
            ServiceWorkerDebug.logsRecord.push(args[0]);
        } else {
            ServiceWorkerDebug.logsRecord.push(args);
        }
        if (!ServiceWorkerDebug.intervalId) {
            ServiceWorkerDebug.intervalId = setTimeout(() => {
                ServiceWorkerDebug.log(ServiceWorkerDebug.logsRecord);
                ServiceWorkerDebug.logsRecord = [];
                clearTimeout(ServiceWorkerDebug.intervalId);
            }, ServiceWorkerDebug.debounceTime);
        }

    }
}

