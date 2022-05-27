import { defineStore } from "pinia";
import { apps, defaultAppIndex, MyApp, IAppMenu } from "../../views/apppage";
const showApp: MyApp[] = [apps[defaultAppIndex]];
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
          tittle: item.tittle,
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
          this.showApp.push(item);
        }
      }
    },
    removeApp(name: string) {
      for (let item of this.showApp) {
        if (item.name == name) {
          this.showApp.splice(this.showApp.indexOf(item), 1);
        }
      }
    },
    changeHidden(name: string, isHidden: boolean) {
      for (let item of this.showApp) {
        if (item.name == name) {
          item.isHidden = isHidden;
        }
      }
    },
  },
});
export default useMainStore;
