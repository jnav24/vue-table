import type { ComputedRef, Ref } from 'vue';
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
    allChecked: Ref<boolean>;
    checkedItems: Ref<(string | number)[]>;
    data: ComputedRef<any[]>;
    getColSpan: (cols: number) => string;
    getHeaders: ComputedRef<readonly TableColumn[]>;
    selectable: boolean;
    setAllChecked: (v: boolean) => void;
    setHeaders: (header: Record<string, Optional<TableColumn, 'width'>>) => void;
    toggleCheckedItem: (checked: boolean, id: number | string) => void;
    updatePage: (page: number) => void;
    updateSelectedPaginatePerPage: (page: number) => void;
}

export interface TableRowContextType {
    data: any;
    parseValue: (value: string) => string;
}
