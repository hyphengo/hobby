export declare const initListData: any

export interface ListType {
  items?: Array<any>
  page?: number
  total?: number
  [prop: string]: any
}

export declare function pageList(
  state: ListType,
  result: any,
  key: string,
  viewModel?: any
): ListType

interface SelectList {
  key: string;
  text: string;
}

interface KVType {
  key: string;
  value: string;
}

export declare function format2SelectList(data: any, kv?: KVType): SelectList | null
