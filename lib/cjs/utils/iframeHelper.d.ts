declare type RequesterArgs = {
    url: string;
    fromOrigin: string;
    checkOrigin?: boolean;
};
export declare function initRequester<Data, HookData>({ url, checkOrigin, data, hook, }: RequesterArgs & {
    data: Data;
    hook: (d: HookData) => void;
}): void;
declare type ResponderArgs = {
    fromOrigin: string;
    checkOrigin?: boolean;
};
export declare function initReceiver<HookData>({ fromOrigin, checkOrigin, hook, }: ResponderArgs & {
    hook: (args: HookData) => void;
}): void;
/**
 * Clean up on unmount
 */
export declare const cleanUp: () => () => void;
export {};
