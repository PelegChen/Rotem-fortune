
export class ServiceWorkerConstants {
    static   GHPATH  = '/Rotem-fortune';
    static   APP_PREFIX  = 'rtmfort_';
    static   VERSION  = 'version_00';
    static   URLS  = [`${ServiceWorkerConstants.GHPATH}/`, `${ServiceWorkerConstants.GHPATH}/index.html`,
    ];
    static   CACHE_NAME  =ServiceWorkerConstants. APP_PREFIX + ServiceWorkerConstants.VERSION;
    static   CACHE_CORE_NAME  = ServiceWorkerConstants.APP_PREFIX + 'core'  ; // core

}
