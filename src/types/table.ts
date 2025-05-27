import type { ComputedRef } from 'vue';
import type { Optional } from './generics.ts';

export const TableContext = Symbol('TableContext');

export interface TableColumn {
    colspan: number;
    label: string;
    width: string;
}

export interface TableContextType {
    getHeaders: ComputedRef<readonly TableColumn[]>;
    setHeaders: (header: Record<string, Optional<TableColumn, 'width'>>) => void;
}
