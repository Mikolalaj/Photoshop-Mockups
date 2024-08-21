import { getMockupLayer, calcScale, MockupType, properties } from './properties'
import { getSettings, showDialog } from './dialog'
import { resizeAndSaveImage } from './resize'
import { definePattern, getScale, makePatternFillLayer, movePattern } from './patterns'

const psApp = app

function charToType(charId: string) {
    return app.charIDToTypeID(charId)
}

function mapLabelToValue(label: number): MockupType {
    if (label === 0) return MockupType.Curtains
    if (label === 1) return MockupType.CurtainsVelvet
    if (label === 2) return MockupType.Pillow
    if (label === 3) return MockupType.PillowVelvet
    if (label === 4) return MockupType.Tablerunner
    if (label === 5) return MockupType.Tablecloth
    throw new Error("Nieznany rodzaj mockup'a '" + label + "'")
}

function openMockup(mockupsFolder: string, mockupName: string, subType: string) {
    var mockupProperties = properties[mockupName]
    var mockupPath = null

    for (var i = 0; i < mockupProperties.length; i++) {
        if (mockupProperties[i]['name'] === subType) {
            mockupPath = mockupProperties[i]['path']
            break // Exit the loop once the element is found
        }
    }
    psApp.open(new File(mockupsFolder + '/' + mockupPath))
}

function updateMockup(mockupName: MockupType, patternName: string, scale: number, subType: string) {
    const psDoc = psApp.activeDocument
    const mockupLayers = getMockupLayer(mockupName, subType, psDoc)

    try {
        for (var i = 0; i < mockupLayers.length; i++) {
            psDoc.activeLayer = mockupLayers[i]['layerName']
            if (mockupLayers[i]['type'] === '3D') {
                open3DLayerTexture(0)
            } else {
                openSmartObject()
            }
            var smartDoc = psApp.activeDocument
            smartDoc.activeLayer = smartDoc.layers[0]

            makePatternFillLayer(patternName, getScale(scale, mockupName, subType))

            if (mockupLayers[i]['transform']) {
                // Move the pattern to the correct position
                movePattern(mockupLayers[i]['transform'].x, mockupLayers[i]['transform'].y)
            }

            // Save and close the smart object document
            smartDoc.save()
            smartDoc.close()
        }
    } catch (e) {
        alert('Error: ' + e)
    }
}

function openSmartObject() {
    psApp.executeAction(psApp.stringIDToTypeID('placedLayerEditContents'), undefined, DialogModes.NO)
}

function open3DLayerTexture(textureIndex: number) {
    var descriptor = new ActionDescriptor()
    descriptor.putInteger(psApp.stringIDToTypeID('textureIndex'), textureIndex)
    psApp.executeAction(psApp.stringIDToTypeID('open3DLayerTexture'), descriptor, DialogModes.NO)
}

function exportMockup(outputFolder: string, mockupName: string, imageName: string, subType: string) {
    // export the mockup as a jpg
    const jpgOptions = new JPEGSaveOptions()
    jpgOptions.quality = 12
    jpgOptions.embedColorProfile = false
    jpgOptions.formatOptions = FormatOptions.STANDARDBASELINE
    jpgOptions.matte = MatteType.NONE

    if (imageName.slice(-4) !== '.jpg') {
        imageName += '.jpg'
    }

    var mockupProperties = properties[mockupName]
    var prefix = null

    for (var i = 0; i < mockupProperties.length; i++) {
        if (mockupProperties[i]['name'] === subType) {
            prefix = mockupProperties[i]['exportPrefix']
            break // Exit the loop once the element is found
        }
    }

    const filePath = outputFolder + '/' + prefix + imageName
    const jpgFile = new File(filePath)
    const psDoc = psApp.activeDocument
    psDoc.saveAs(jpgFile, jpgOptions, true, Extension.LOWERCASE)

    resizeAndSaveImage(filePath, [1500, 1250])
}

function readFiles(folder: Folder) {
    var files = folder.getFiles()
    const filesNames = []
    for (var i = 0; i < files.length; i++) {
        var file = files[i]
        if (file instanceof File) {
            filesNames.push(file.name)
        }
    }
    return filesNames
}

function closeFile() {
    const psDoc = psApp.activeDocument
    // close the document without saving
    psDoc.close(SaveOptions.DONOTSAVECHANGES)
}

function getPatternSize(folderRef: Folder) {
    var files = folderRef.getFiles(function (file: any) {
        return file instanceof File && file.name.match(/\.(jpg|jpeg|png|tif|tiff|psd)$/i)
    })

    // Create an array to store the dimensions of each file
    var dimensions = []

    // Loop through each file
    for (var i = 0; i < files.length; i++) {
        var fileRef = files[i] as File
        var docRef = psApp.open(fileRef)

        // Get the width and height of the document
        var width = (docRef.width as UnitValue).as('px') // width in pixels
        var height = (docRef.height as UnitValue).as('px') // height in pixels

        // Save the dimensions to the array
        dimensions.push({
            name: fileRef.name,
            width: width,
            height: height,
        })

        try {
            makePatternFillLayer(fileRef.name, 100)
        } catch (e) {
            definePattern(fileRef.name)
        }

        // Optional: Close the document without saving
        docRef.close(SaveOptions.DONOTSAVECHANGES)
    }

    // Iterate through the files and check if all files have the same dimensions
    var sameDimensions = true
    var firstWidth = dimensions[0].width
    var firstHeight = dimensions[0].height

    for (var k = 1; k < dimensions.length; k++) {
        if (dimensions[k].width !== firstWidth || dimensions[k].height !== firstHeight) {
            sameDimensions = false
            break
        }
    }

    if (!sameDimensions) {
        throw new Error('Not all files have the same dimensions.')
    }

    if (firstWidth < firstHeight) return firstWidth
    return firstHeight
}

export function createMockup() {
    var result = showDialog()
    if (result === 2) {
        return
    }
    const { mockupType, patternsPath, width, outputPath, mockupsPath } = getSettings()
    const patternsFolder = new Folder(patternsPath)

    var mockupNameValue = mapLabelToValue(mockupType)
    var widthPx = getPatternSize(patternsFolder)
    var scale = calcScale(mockupNameValue, width, widthPx)

    var subTypes = properties[mockupNameValue]
    for (var i = 0; i < subTypes.length; i++) {
        var subType = subTypes[i]['name']
        openMockup(mockupsPath, mockupNameValue, subType)
        var patternNames = readFiles(patternsFolder)
        for (var j = 0; j < patternNames.length; j++) {
            var patternName = patternNames[j]
            updateMockup(mockupNameValue, patternName, scale, subType)
            exportMockup(outputPath, mockupNameValue, patternName, subType)
        }
        closeFile()
    }
    alert('Zrobione!')
}
