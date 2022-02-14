
declare class Notifier {
  /**
   * Create a notifier instance
   * @param err The error to be notified
   * @param doNotAlert List of excluding errors
   */
  constructor(err: Error, doNotAlert?: Error[] | any);

  /**
   * Send the notification to defined destinations.
   */
  send(): Promise<void>;
}

export = Notifier;