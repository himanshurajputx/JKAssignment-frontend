export class Alert {
  type: AlertType | undefined;
  message: string | undefined;
  title: string | undefined;
  id: string | undefined;
  delay: number | undefined;
  keepAfterRouteChange: boolean | undefined;
  isVisible: boolean | undefined;
  userData: any;
  constructor(init?:Partial<Alert>) {
    Object.assign(this, init);
  }
}

export enum AlertType {
  success = "success",
  error = "error",
  info = "info",
  warning = "warning"
}

export enum PositiionType {
  TopCenter = 0,
  TopLeft = 1,
  TopRight = 2,
  BottomCenter = 3,
  BottomLeft = 4,
  BottomRight = 5,
  Middle = 6,
}
