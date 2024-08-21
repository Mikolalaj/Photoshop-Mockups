import { properties } from './properties'
import { charToType, s2t } from './utils'

export function getScale(baseScale: number, mockupName: string, subType: string): number {
    var scaleMultiplier = 1
    var mockupProperties = properties[mockupName]
    for (var i = 0; i < mockupProperties.length; i++) {
        if (mockupProperties[i]['name'] === subType) {
            scaleMultiplier = mockupProperties[i]['scaleMultiplier']
            break // Exit the loop once the element is found
        }
    }

    return baseScale * scaleMultiplier
}

export function makePatternFillLayer(patternName: string, scale: number) {
    var scaleDesc = new ActionDescriptor()
    scaleDesc.putUnitDouble(app.charIDToTypeID('Scl '), app.charIDToTypeID('#Prc'), scale)

    var reference = new ActionReference()
    reference.putClass(s2t('contentLayer'))

    var nullDesc = new ActionDescriptor()
    nullDesc.putReference(s2t('null'), reference)

    var nameDesc = new ActionDescriptor()
    nameDesc.putString(s2t('name'), patternName)

    // var patternDesc = new ActionDescriptor()
    scaleDesc.putObject(s2t('pattern'), s2t('pattern'), nameDesc)

    var typeDesc = new ActionDescriptor()
    typeDesc.putObject(s2t('type'), s2t('patternLayer'), scaleDesc)

    nullDesc.putObject(s2t('using'), s2t('contentLayer'), typeDesc)
    try {
        app.executeAction(s2t('make'), nullDesc, DialogModes.NO)
    } catch (e) {
        throw Error('Wzory nie są zdefiniowane jako patterny w Photoshopie.')
    }
}

export function definePattern(patternName: string) {
    var desc10 = new ActionDescriptor()
    var patternAction = new ActionReference()
    patternAction.putClass(charToType('Ptrn'))
    desc10.putReference(charToType('null'), patternAction)

    var idUsng = charToType('Usng')
    var ref2 = new ActionReference()
    var idPrpr = charToType('Prpr')
    var idfsel = charToType('fsel')
    ref2.putProperty(idPrpr, idfsel)
    var idDcmn = charToType('Dcmn')
    var idOrdn = charToType('Ordn')
    var idTrgt = charToType('Trgt')
    ref2.putEnumerated(idDcmn, idOrdn, idTrgt)
    desc10.putReference(idUsng, ref2)
    desc10.putString(charToType('Nm  '), patternName)

    app.executeAction(charToType('Mk  '), desc10, DialogModes.NO)
}

export function movePattern(horizontalPx: number, verticalPx: number) {
    var move = charToType('move')
    var idnull = charToType('null')

    var selectedLayer = new ActionReference()
    var idLyr = charToType('Lyr ')
    var idOrdn = charToType('Ordn')
    var idTrgt = charToType('Trgt')
    selectedLayer.putEnumerated(idLyr, idOrdn, idTrgt)

    var desc44 = new ActionDescriptor()
    desc44.putReference(idnull, selectedLayer)

    var movePixels = new ActionDescriptor()
    var pixelUnit = charToType('#Pxl')
    movePixels.putUnitDouble(charToType('Hrzn'), pixelUnit, horizontalPx)
    movePixels.putUnitDouble(charToType('Vrtc'), pixelUnit, verticalPx)

    var offset = charToType('Ofst')
    desc44.putObject(charToType('T   '), offset, movePixels)
    app.executeAction(move, desc44, DialogModes.NO)
}
