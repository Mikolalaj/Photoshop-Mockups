export enum MockupType {
    Pillow = 'pillow',
    Tablecloth = 'tablecloth',
    PillowVelvet = 'pillow-velvet',
    Tablerunner = 'tablerunner',
    Curtains = 'curtains',
    CurtainsVelvet = 'curtains-velvet',
}

export enum LayerType {
    SmartObject = 'smartObject',
    ThreeDimensions = '3D',
}

export type MockupLayer = {
    layerName: Layer
    type: LayerType
    transform?: {
        x: number
        y: number
    }
}

export type MockupSubType = {
    name: string
    path: string
    exportPrefix: string
    scaleMultiplier: number
}

export type Properties = {
    [key in MockupType]: Array<MockupSubType>
}

export const properties: Properties = {
    pillow: [
        {
            name: 'front',
            path: 'Poszewki/POSZEWKI 3/pillows_1/1 copy.psd',
            exportPrefix: 'poszewka-1-',
            scaleMultiplier: 1,
        },
        {
            name: 'side',
            path: 'Poszewki/POSZEWKI 3/pillows_1/12 copy.psd',
            exportPrefix: 'poszewka-2-',
            scaleMultiplier: 1,
        },
        {
            name: 'double',
            path: 'Poszewki/POSZEWKI 3/pillows_1/6 copy.psd',
            exportPrefix: 'poszewka-3-',
            scaleMultiplier: 1,
        },
    ],
    tablecloth: [
        {
            name: 'side',
            path: 'Obrus/Side.psd',
            exportPrefix: 'obrus-1-',
            scaleMultiplier: 1,
        },
        {
            name: 'close',
            path: 'Obrus/Close.psd',
            exportPrefix: 'obrus-2-',
            scaleMultiplier: 1,
        },
        {
            name: 'front',
            path: 'Obrus/Front.psd',
            exportPrefix: 'obrus-3-',
            scaleMultiplier: 1,
        },
        {
            name: 'round',
            path: 'Obrus okrągły/Scene-9.psd',
            exportPrefix: 'obrus-4-',
            scaleMultiplier: 0.40909,
        },
    ],
    'pillow-velvet': [
        // {
        //     name: 'front',
        //     path: 'Poszewki/VELVET/Velvet Cushion Cover Mockup by Creatsy (1).psd',
        //     exportPrefix: 'poszewka-velvet-1-',
        //     scaleMultiplier: 1,
        // },
        // {
        //     name: 'side',
        //     path: 'Poszewki/VELVET/Velvet Cushion Cover Mockup by Creatsy (2).psd',
        //     exportPrefix: 'poszewka-velvet-2-',
        //     scaleMultiplier: 1,
        // },
        // {
        //     name: 'close',
        //     path: 'Poszewki/VELVET/Velvet Cushion Cover Mockup by Creatsy (15).psd',
        //     exportPrefix: 'poszewka-velvet-3-',
        //     scaleMultiplier: 1,
        // },
        // {
        //     name: 'flat',
        //     path: 'Poszewki/VELVET/Velvet Cushion Cover Mockup by Creatsy (17).psd',
        //     exportPrefix: 'poszewka-velvet-4-',
        //     scaleMultiplier: 1,
        // },
        {
            name: 'flat-and-front',
            path: 'Poszewki/VELVET/Velvet Cushion Cover Mockup by Creatsy (19).psd',
            exportPrefix: 'poszewka-velvet-5-',
            scaleMultiplier: 1,
        },
    ],
    tablerunner: [
        {
            name: 'close',
            path: 'Bieżnik 40x180/Close.psd',
            exportPrefix: 'bieznik-1-',
            scaleMultiplier: 1,
        },
        {
            name: 'front',
            path: 'Bieżnik 40x180/Front.psd',
            exportPrefix: 'bieznik-2-',
            scaleMultiplier: 0.53279,
        },
        {
            name: 'side',
            path: 'Bieżnik 40x180/Side.psd',
            exportPrefix: 'bieznik-3-',
            scaleMultiplier: 0.53279,
        },
        {
            name: 'top',
            path: 'Bieżnik 40x180/Top.psd',
            exportPrefix: 'bieznik-4-',
            scaleMultiplier: 0.53279,
        },
        {
            name: 'close-60',
            path: 'Bieżnik 60x120/Close.psd',
            exportPrefix: 'bieznik-5-',
            scaleMultiplier: 0.75471,
        },
        {
            name: 'front-60',
            path: 'Bieżnik 60x120/Front.psd',
            exportPrefix: 'bieznik-6-',
            scaleMultiplier: 0.75471,
        },
        {
            name: 'side-60',
            path: 'Bieżnik 60x120/Side.psd',
            exportPrefix: 'bieznik-7-',
            scaleMultiplier: 0.75471,
        },
        {
            name: 'top-60',
            path: 'Bieżnik 60x120/Top.psd',
            exportPrefix: 'bieznik-8-',
            scaleMultiplier: 0.75471,
        },
    ],
    curtains: [
        {
            name: 'tape',
            path: 'Zasłony/ZASŁONA TAŚMA.psd',
            exportPrefix: 'tasma-',
            scaleMultiplier: 1,
        },
        {
            name: 'tunnel',
            path: 'Zasłony/ZASŁONA TAŚMA KIESZENIE.psd',
            exportPrefix: 'tasma-kieszenie-',
            scaleMultiplier: 1,
        },
        {
            name: 'eyelet',
            path: 'Zasłony/ZASŁONA PRZELOTKI.psd',
            exportPrefix: 'przelotki-',
            scaleMultiplier: 1,
        },
    ],
    'curtains-velvet': [
        {
            name: 'eyelet-front',
            path: 'Velvet Eyelet Curtains/Front.psd',
            exportPrefix: 'przelotki-velvet-1-',
            scaleMultiplier: 1,
        },
        {
            name: 'eyelet-close',
            path: 'Velvet Eyelet Curtains/Close.psd',
            exportPrefix: 'przelotki-velvet-2-',
            scaleMultiplier: 2.33161,
        },
        {
            name: 'eyelet-close-side',
            path: 'Velvet Eyelet Curtains/Close side.psd',
            exportPrefix: 'przelotki-velvet-3-',
            scaleMultiplier: 2.33161,
        },
        {
            name: 'tape-front',
            path: 'Velvet Pencil Pleat Curtains/Front.psd',
            exportPrefix: 'tasma-velvet-1-',
            scaleMultiplier: 1,
        },
        {
            name: 'tape-close',
            path: 'Velvet Pencil Pleat Curtains/Close.psd',
            exportPrefix: 'tasma-velvet-2-',
            scaleMultiplier: 2.33161,
        },
        {
            name: 'tape-close-side',
            path: 'Velvet Pencil Pleat Curtains/Close side.psd',
            exportPrefix: 'tasma-velvet-3-',
            scaleMultiplier: 2.33161,
        },
    ],
}

export function getMockupLayer(mockupType: MockupType, subType: string, psDoc: Document): Array<MockupLayer> {
    if (mockupType === 'pillow') {
        if (subType === 'front' || subType === 'side') {
            return [{ layerName: psDoc.artLayers.getByName('Design'), type: LayerType.SmartObject }]
        } else if (subType === 'double') {
            return [
                { layerName: psDoc.artLayers.getByName('Design (1)'), type: LayerType.SmartObject },
                { layerName: psDoc.artLayers.getByName('Design (2)'), type: LayerType.SmartObject },
            ]
        }
    } else if (mockupType === 'tablecloth') {
        if (subType === 'side') {
            var tableGroup = psDoc.layerSets.getByName('Table')
            var groupLayer = tableGroup.layers[3] as LayerSet
            return [{ layerName: groupLayer.layers[3], type: LayerType.SmartObject }]
        } else if (subType === 'close') {
            var objectsGroup = psDoc.layerSets.getByName('Object')
            var groupLayer = objectsGroup.layers[2] as LayerSet
            return [{ layerName: groupLayer.layers[2], type: LayerType.SmartObject }]
        } else if (subType === 'front') {
            var tableGroup = psDoc.layerSets.getByName('Table')
            var groupLayer = tableGroup.layers[3] as LayerSet
            return [{ layerName: groupLayer.layers[3], type: LayerType.SmartObject }]
        } else if (subType === 'round') {
            var tableGroup = psDoc.layerSets.getByName('TABLECLOTH')
            return [{ layerName: tableGroup.layers[6], type: LayerType.ThreeDimensions }]
        } else {
            throw new Error('Unsupported tablecloth mockup sub type')
        }
    } else if (mockupType === 'pillow-velvet') {
        if (subType === 'front') {
            var objectGroup = psDoc.layerSets.getByName('Object')
            return [
                { layerName: objectGroup.layers[2], type: LayerType.SmartObject },
                { layerName: objectGroup.layers[3], type: LayerType.SmartObject },
            ]
        } else if (subType === 'side') {
            var objectGroup = psDoc.layerSets.getByName('Object')
            return [
                { layerName: objectGroup.layers[2], type: LayerType.SmartObject },
                { layerName: objectGroup.layers[3], type: LayerType.SmartObject },
            ]
        } else if (subType === 'close') {
            var objectGroup = psDoc.layerSets.getByName('Object')
            return [
                { layerName: objectGroup.layers[4], type: LayerType.SmartObject },
                { layerName: objectGroup.layers[5], type: LayerType.SmartObject },
            ]
        } else if (subType === 'flat') {
            var objectGroup = psDoc.layerSets.getByName('Object')
            return [
                { layerName: objectGroup.layers[3], type: LayerType.SmartObject },
                { layerName: objectGroup.layers[4], type: LayerType.SmartObject },
            ]
        } else if (subType === 'flat-and-front') {
            var topObjectGroup = psDoc.layerSets.getByName('Object (top)')
            var bottomObjectGroup = psDoc.layerSets.getByName('Object (bottom)')
            return [
                { layerName: topObjectGroup.layers[2], type: LayerType.SmartObject },
                { layerName: topObjectGroup.layers[3], type: LayerType.SmartObject },
                {
                    layerName: bottomObjectGroup.layers[3],
                    type: LayerType.SmartObject,
                    transform: {
                        x: 3021,
                        y: 3021,
                    },
                },
                { layerName: bottomObjectGroup.layers[4], type: LayerType.SmartObject },
            ]
        } else {
            throw new Error('Unsupported velvet pillow mockup sub type')
        }
    } else if (mockupType === 'tablerunner') {
        if (subType === 'close') {
            var objectsGroup = psDoc.layerSets.getByName('Object')
            return [{ layerName: objectsGroup.layers[7], type: LayerType.SmartObject }]
        } else if (subType === 'front') {
            var objectsGroup = psDoc.layerSets.getByName('Table')
            return [{ layerName: objectsGroup.layers[8], type: LayerType.SmartObject }]
        } else if (subType === 'side' || subType === 'top') {
            var objectsGroup = psDoc.layerSets.getByName('Table')
            return [{ layerName: objectsGroup.layers[7], type: LayerType.SmartObject }]
        } else if (subType === 'close-60') {
            var objectsGroup = psDoc.layerSets.getByName('Objects')
            return [{ layerName: objectsGroup.layers[7], type: LayerType.SmartObject }]
        } else if (subType === 'front-60' || subType === 'side-60' || subType === 'top-60') {
            var objectsGroup = psDoc.layerSets.getByName('Table')
            return [{ layerName: objectsGroup.layers[7], type: LayerType.SmartObject }]
        } else {
            throw new Error('Unsupported table runner mockup sub type')
        }
    } else if (mockupType === 'curtains') {
        if (subType === 'tape') {
            var objectsGroup = psDoc.layers[1] as LayerSet
            return [
                { layerName: objectsGroup.layers[0], type: LayerType.ThreeDimensions },
                { layerName: objectsGroup.layers[1], type: LayerType.ThreeDimensions },
            ]
        } else if (subType === 'eyelet') {
            var objectsGroup = psDoc.layers[1] as LayerSet
            return [{ layerName: objectsGroup.layers[0], type: LayerType.ThreeDimensions }]
        } else if (subType === 'tunnel') {
            var objectsGroup = psDoc.layers[1] as LayerSet
            return [{ layerName: objectsGroup.layers[0], type: LayerType.ThreeDimensions }]
        } else {
            throw new Error('Unsupported curtains mockup sub type')
        }
    } else if (mockupType === 'curtains-velvet') {
        if (subType === 'eyelet-front' || subType === 'tape-front') {
            var cushionFloorGroup = psDoc.layers[3] as LayerSet
            var armchairGroup = psDoc.layers[5] as LayerSet
            var cushionArmchairGroup = armchairGroup.layers[0] as LayerSet
            return [
                { layerName: psDoc.layers[11], type: LayerType.ThreeDimensions },
                { layerName: psDoc.layers[12], type: LayerType.ThreeDimensions },
                { layerName: cushionFloorGroup.layers[2], type: LayerType.SmartObject },
                { layerName: cushionArmchairGroup.layers[2], type: LayerType.SmartObject },
            ]
        } else if (
            subType === 'eyelet-close' ||
            subType === 'eyelet-close-side' ||
            subType === 'tape-close' ||
            subType === 'tape-close-side'
        ) {
            return [{ layerName: psDoc.layers[6], type: LayerType.ThreeDimensions }]
        } else {
            throw new Error('Unsupported velvet curtains mockup sub type')
        }
    } else {
        throw new Error('Unsupported mockup type')
    }
}

export function getScale(mockupName: MockupType, patternWidthCm: number, patternWidthPx: number): number {
    const pillow = (3008 / ((patternWidthPx / patternWidthCm) * 40)) * 100
    const scales = {
        [MockupType.Pillow]: pillow,
        [MockupType.Tablecloth]: pillow * 0.301369863,
        [MockupType.Tablerunner]: pillow * 0.465753425,
        [MockupType.Curtains]: pillow * 0.397260274,
        [MockupType.PillowVelvet]: pillow * 1.003322259,
        [MockupType.CurtainsVelvet]: pillow * 0.256850498,
    }
    return scales[mockupName]
}
