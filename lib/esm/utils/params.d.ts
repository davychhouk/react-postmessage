export declare const getOriginFromUrl: (url: string) => string;
export declare const getParam: (href: string, name: string) => string | null;
declare type Param = {
    name: string;
    value: string | undefined;
};
export declare const attachParamsToUrl: (url: string, params: Param[]) => string;
export {};
