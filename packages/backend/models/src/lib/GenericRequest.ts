export interface GenericRequest<T extends object> {
    build(): T;
}