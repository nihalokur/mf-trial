
    export type RemoteKeys = 'customerAddresses/Widget';
    type PackageType<T> = T extends 'customerAddresses/Widget' ? typeof import('customerAddresses/Widget') :any;