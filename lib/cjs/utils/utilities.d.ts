declare type RequesterArgs = {
    url: string;
    fromOrigin: string;
    checkOrigin?: boolean;
};
export declare function initRequester<Data>({ url, checkOrigin, data, hook, close, }: RequesterArgs & {
    data?: Data;
    hook?: (args: Data) => void;
    close?: () => void;
}): void;
declare type ResponderArgs = {
    fromOrigin: string;
    setFromOrigin: (o: string) => void;
    checkOrigin?: boolean;
};
export declare function initReceiver<Data>({ fromOrigin, setFromOrigin, checkOrigin, hook, }: ResponderArgs & {
    hook: (args: Data) => void;
}): void;
export declare function postMessage<Data>(data: Data, targetOrigin: string): void;
export declare function signalClose(targetOrigin: string): void;
/**
 * Clean up on unmount
 */
export declare const cleanUp: () => () => void;
export {};
