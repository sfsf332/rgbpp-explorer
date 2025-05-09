export namespace Response {
    export interface Response<T> {
      data: T
      meta?: Meta
      error?: Error[]
    }
  
    export interface Error {
      id: string
      code: number
      status: number
      title: string
      detail: string
      href: string
    }
  
    export interface Meta {
      total: number
      pageSize: number
    }
  
    export interface Wrapper<A, T = string> {
      id: number
      type: T
      attributes: A
    }
  }
  