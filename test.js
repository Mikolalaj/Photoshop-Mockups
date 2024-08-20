function movePattern(horizontalPx, verticalPx) {
    var idmove = charIDToTypeID("move");
    var desc44 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref5 = new ActionReference();
    var idLyr = charIDToTypeID("Lyr ");
    var idOrdn = charIDToTypeID("Ordn");
    var idTrgt = charIDToTypeID("Trgt");
    ref5.putEnumerated(idLyr, idOrdn, idTrgt);
    desc44.putReference(idnull, ref5);
    var idT = charIDToTypeID("T   ");
    var desc45 = new ActionDescriptor();
    var idHrzn = charIDToTypeID("Hrzn");
    var idPxl = charIDToTypeID("#Pxl");
    desc45.putUnitDouble(idHrzn, idPxl, horizontalPx);
    var idVrtc = charIDToTypeID("Vrtc");
    var idPxl = charIDToTypeID("#Pxl");
    desc45.putUnitDouble(idVrtc, idPxl, verticalPx);
    var idOfst = charIDToTypeID("Ofst");
    desc44.putObject(idT, idOfst, desc45);
    executeAction(idmove, desc44, DialogModes.NO);
}