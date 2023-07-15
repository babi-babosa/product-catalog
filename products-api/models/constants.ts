export interface Operator {
    uiLabel: string,
    id: string
}

export interface DataType {
    uiLabel: string,
    id: string
}

export interface Property {
    id: number,
    name: string,
    type: string
}


export interface OptionsProperty {
    property_id: number,
    value: string
}

export interface InformationToBeFiltered {
    products: Array<any>,
    availableDataTypes: Array<DataType>,
    availableOperators: Array<DataType>,
}
