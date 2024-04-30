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
class SwDebug {
    static isDebugMode = false;

    static isLoggingToConsole() {
        return self.location.hostname === 'localhost' && !SwDebug.isDebugMode;
    }

    static log(...args) {
        if (!SwDebug.isLoggingToConsole()) {
            return;
        }
        console.log(...args);
    }
}

