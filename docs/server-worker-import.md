# Importing to service worker

The usual way to import a module in a service worker is to use the `importScripts` function. This function takes a list of URLs to import, and it will load and execute them in order.

```javascript
importScripts('path/to/module.js');
``
```

## The docs are incorrect

https://stackoverflow.com/questions/75240599/cannot-use-import-statement-outside-module-when-registering-service-worker-fro
