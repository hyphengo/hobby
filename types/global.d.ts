/**
 * @file global.d.ts
 * @author lihuanji
 */
interface ExtendsWindow extends Window {
  WXSession(token: string): void;
}

declare var window: ExtendsWindow;

declare var PRODUCTION: any;
declare var process: any;

declare var require: any;
