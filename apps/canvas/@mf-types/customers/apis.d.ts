
    export type RemoteKeys = 'customers/Widget';
    type PackageType<T> = T extends 'customers/Widget' ? typeof import('customers/Widget') :any;