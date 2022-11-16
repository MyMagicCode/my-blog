import { defineStore } from "pinia";
import { apps, defaultAppIndex, MyApp, IAppMenu } from "../../views/apppage";
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
      for (let item of this.allApps) {
        if (item.name == name && this.showApp.indexOf(item) == -1) {
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
        }
      }
    },
    changeHidden(name: string, isHidden: boolean) {
      for (let item of this.showApp) {
        if (item != null && item!.name == name) {
          item!.isHidden = isHidden;
        }
      }
    },
  },
});
export default useMainStore;
