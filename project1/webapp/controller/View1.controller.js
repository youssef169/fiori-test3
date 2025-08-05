sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (Controller, JSONModel, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("sap.aymax.dev.project1.controller.View1", {
        onInit() {
            const oODataModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/zye_CDS2_CDS/");
            this.getView().setModel(oODataModel);

            // Second model for vendor dropdown value help
            const oVendorModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZYE_VENDOR_VH_CDS/");
            this.getView().setModel(oVendorModel, "vendorVH");

            // JSON model to store selected filter values
            const oFilterModel = new JSONModel({
                selectedPONumbers: [],
                selectedVendors: []
            });
            this.getView().setModel(oFilterModel, "filterModel");
        },

        onSearch() {
            const oView = this.getView();
            const oTable = oView.byId("table1");
            const oBinding = oTable.getBinding("items");
            const oFilterData = oView.getModel("filterModel").getData();

            let aFilters = [];

            // 🔹 PO number filter
            if (oFilterData.selectedPONumbers.length > 0) {
                const aPoFilters = oFilterData.selectedPONumbers.map(po => new Filter("ebeln", FilterOperator.EQ, po));
                aFilters.push(new Filter({ filters: aPoFilters, and: false }));
            }

            // 🔹 Vendor filter
            if (oFilterData.selectedVendors.length > 0) {
                const aVendorFilters = oFilterData.selectedVendors.map(vendor => new Filter("lifnr", FilterOperator.EQ, vendor));
                aFilters.push(new Filter({ filters: aVendorFilters, and: false }));
            }

            oBinding.filter(aFilters);
        },
        onRowPress(oEvent) {
    const oSelectedItem = oEvent.getSource();
    const oCtx = oSelectedItem.getBindingContext();
    const sPO = oCtx.getProperty("ebeln");

    this.getOwnerComponent().getRouter().navTo("View2", {
        ebeln: sPO
    });
}
    });
});
