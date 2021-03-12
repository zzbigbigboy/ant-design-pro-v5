export class AssetModel {
    private info: APP.AssetInfo = {} as APP.AssetInfo
    constructor() {}

    public get data() {
        return this.info;
    }

    public setInfo (info: APP.AssetInfo) {
        this.info = info || {} as APP.AssetInfo;
    }
}