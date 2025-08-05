sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator"
], (Controller, Filter, FilterOperator) => {
  "use strict";

  return Controller.extend("sap.aymax.dev.project1.controller.View2", {
    onInit() {
      const oRouter = this.getOwnerComponent().getRouter();
      oRouter.getRoute("View2").attachPatternMatched(this._onRouteMatched, this);
    },

    _onRouteMatched(oEvent) {
      const sEbeln = oEvent.getParameter("arguments").ebeln;

      const oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZYE_CDS2_ITEMS_CDS/");
      this.getView().setModel(oModel);

      const oTable = this.getView().byId("itemTable");

      oTable.bindItems({
        path: "/zye_CDS2_items",
        filters: [new Filter("ebeln", FilterOperator.EQ, sEbeln)],
        template: oTable.getBindingInfo("items").template
      });
    },
onNavBack() {
  this.getOwnerComponent().getRouter().navTo("View1");
}
  });
});
