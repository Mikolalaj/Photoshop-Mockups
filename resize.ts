export function resizeAndSaveImage(filePath: string, sizes: Array<number>) {
    var fileRef = new File(filePath)

    if (!fileRef.exists) {
        alert('The file does not exist: ' + filePath)
        return
    }

    // Open the image
    var doc = app.open(fileRef)

    const oldWidth = doc.width
    const oldHeight = doc.height
    const aspectRatio = (oldHeight as number) / (oldWidth as number)

    let newWidth: number
    let newHeight: number

    // sort the sizes in descending order
    sizes = sizes.sort((a, b) => b - a)

    for (let size of sizes) {
        if (oldWidth < oldHeight) {
            newHeight = size
        } else {
            newWidth = size
        }

        // Calculate the new height if only width is provided
        if (!newHeight) {
            newHeight = newWidth * aspectRatio
        }

        // Calculate the new width if only height is provided
        if (!newWidth) {
            newWidth = newHeight * aspectRatio
        }

        // Resize the image
        doc.resizeImage(UnitValue(newWidth, 'px'), UnitValue(newHeight, 'px'))

        const newSuffix = '-' + size + '.jpg'
        const newFilePath = filePath.replace(/\.jpg$/, newSuffix)

        // Save the image
        var saveFile = new File(newFilePath)
        var options = new JPEGSaveOptions()
        options.quality = 10
        doc.saveAs(saveFile, options, true)
        newWidth = undefined
        newHeight = undefined
    }

    doc.close(SaveOptions.DONOTSAVECHANGES)
}
