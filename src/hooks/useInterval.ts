import React, { useEffect, useRef } from 'react';

/**
 * useInterval hook base on Dan Abramov's hook
 * @param {()=>void} callback
 * @param {number} delayInMilliseconds
 */
export const useInterval = (callback: React.MutableRefObject<any>, delayInMilliseconds: number) => {
    /** @type {React.MutableRefObject<any>}  */
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        if (savedCallback.current) {

            savedCallback.current = callback as any;
        }
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            // @ts-expect-error this exists
            savedCallback.current();
        }

        if (delayInMilliseconds !== null) {
            const id : number = setInterval(tick, delayInMilliseconds) as number;
            return () => clearInterval(id);
        }
    }, [delayInMilliseconds]);
};
