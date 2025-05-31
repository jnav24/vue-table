import type { ComputedRef } from 'vue';
import type { Optional } from './generics.ts';

export const TableContext = Symbol('TableContext');
export const TableRowContext = Symbol('TableRowContext');

export interface TableColumn {
    colspan: number;
    label: string;
    width: string;
}

export interface TableContextType {
    data: any[];
    getColSpan: (cols: number) => string;
    getHeaders: ComputedRef<readonly TableColumn[]>;
    setHeaders: (header: Record<string, Optional<TableColumn, 'width'>>) => void;
}

export interface TableRowContextType {
    data: any;
    parseValue: (value: string) => string;
}
