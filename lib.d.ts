// global variable(webpack injected)
declare const __DEV__: boolean;
declare const __DEMOS__: DEMOItem[];
declare const __ICONS__: string[];

interface DEMOItem {
  name: string;
  done: boolean;
  tested: boolean;
}
