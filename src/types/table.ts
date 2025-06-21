import type { ComputedRef } from 'vue';
import type { Optional } from './generics.ts';

export const TableContext = Symbol('TableContext');
export const TableRowContext = Symbol('TableRowContext');

export interface TableColumn {
    colspan: number;
    label: string;
    width: string;
}

export interface ColumnProps {
    header: string;
    colspan?: number;
    notation?: string;
}

export interface TableContextType {
    data: ComputedRef<any[]>;
    getColSpan: (cols: number) => string;
    getHeaders: ComputedRef<readonly TableColumn[]>;
    setHeaders: (header: Record<string, Optional<TableColumn, 'width'>>) => void;
    updatePage: (page: number) => void;
    updateSelectedPaginatePerPage: (page: number) => void;
}

export interface TableRowContextType {
    data: any;
    parseValue: (value: string) => string;
}
