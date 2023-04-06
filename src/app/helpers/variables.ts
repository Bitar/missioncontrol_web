export enum Actions {
  CREATE = 1,
  EDIT,
  FILTER,
  EXPORT,
  DELETE,
}

export enum PageTypes {
  INDEX = 'index',
  CREATE = 'create',
  EDIT = 'edit',
  SHOW = 'show',
  REPORT = 'report',
  ERROR = 'error',
}

export enum ToastType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  PENDING = 'pending',
}
