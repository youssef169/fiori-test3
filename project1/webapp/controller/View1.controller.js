sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("sap.aymax.dev.project1.controller.View1", {
        onInit() {
            var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/zye_CDS2_CDS/");
            this.getView().setModel(oModel); 
        }
    });
});