import { defineStore } from "pinia";
import { apps, defaultAppIndex, MyApp, IAppMenu } from "../../views/apppage";
import myWindow from "components/window/Window.vue";
type Tshow = MyApp | null;
const showApp: Tshow[] = [
  apps[defaultAppIndex],
  null,
  null,
  null,
  null,
  null,
  null,
  null,
];
const useMainStore = defineStore("main", {
  state: () => {
    return {
      allApps: apps, //全部app
      showApp, //显示的app
      mapAppExamples: new Map(), // app实例
      appName: "",
    };
  },
  getters: {
    getAllMenu(): IAppMenu[] {
      const menu: IAppMenu[] = [];
      this.allApps.forEach((item) => {
        menu.push({
          title: item.title,
          name: item.name,
          isHidren: item.isHidden,
          iconUrl: item.iconUrl,
          backgroundColor: item.backgroundColor,
        });
      });
      return menu;
    },
  },
  actions: {
    pushShowApp(name: string) {
      // 如果已经添加就显示
      if (this.mapAppExamples.get(name)) {
        this.mapAppExamples.get(name).recenter();
        return;
      }
      for (let item of this.allApps) {
        if (item.name == name) {
          for (const i in this.showApp) {
            if (this.showApp[i] == null) {
              this.showApp[i] = item;
              break;
            }
          }
        }
      }
    },
    deleteApp(name: string) {
      for (let index in this.showApp) {
        if (!this.showApp[index]) continue;
        if (this.showApp[index]!.name == name) {
          this.showApp[index] = null;
          this.mapAppExamples.delete(name);
        }
      }
    },
    addAppExample(name: String, app: InstanceType<typeof myWindow>) {
      this.mapAppExamples.set(name, app);
    },
    getMapAppImg(name: string, el: HTMLImageElement) {
      if (!this.mapAppExamples.get(name)) {
        return;
      }
      this.mapAppExamples.get(name)?.getImage(el);
    },
  },
});
export default useMainStore;
