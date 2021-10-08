import React from "react";

export interface ColumnDefinition {
    title: string;
    field: string;
    cssHeaderClass?: string;
    cellRenderer?: Function;
}