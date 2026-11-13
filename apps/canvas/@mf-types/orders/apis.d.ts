
    export type RemoteKeys = 'orders/Widget';
    type PackageType<T> = T extends 'orders/Widget' ? typeof import('orders/Widget') :any;