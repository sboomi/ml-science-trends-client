export type MetaProps = {
  title?: string;
  keywords?: string;
  description?: string;
};

export type CopyrightProps = {
  websiteName?: string;
};

export type DisplayAlertProps = {
  category: 'error' | 'warning' | 'info' | 'success';
  msg: string;
  open: boolean;
  closeMsg: any;
};
