const mockupSettingsId = 'mockupsSettings'
// settings keys
const mockupTypeKey = app.stringIDToTypeID('mockupType')
const widthKey = app.stringIDToTypeID('width')
const patternsPathKey = app.stringIDToTypeID('patternsPath')

const settingsId = 'settings'
// persistent settings keys
const outputPathKey = app.stringIDToTypeID('outputPath')
const outputSizeKey = app.stringIDToTypeID('outputSizeKey')
const mockupsPathKey = app.stringIDToTypeID('mockupsPathKey')

type Settings = {
    mockupType: number
    width: number
    patternsPath: string
    outputPath: string
    outputSize: number
    mockupsPath: string
}

function saveSettings(settings: Settings) {
    const mockupSettings = new ActionDescriptor()

    mockupSettings.putInteger(mockupTypeKey, settings.mockupType)
    mockupSettings.putDouble(widthKey, settings.width)
    mockupSettings.putString(patternsPathKey, settings.patternsPath)

    app.putCustomOptions(mockupSettingsId, mockupSettings, false)

    const persistentSettings = new ActionDescriptor()

    persistentSettings.putString(outputPathKey, settings.outputPath)
    persistentSettings.putInteger(outputSizeKey, settings.outputSize)
    persistentSettings.putString(mockupsPathKey, settings.mockupsPath)

    app.putCustomOptions(settingsId, persistentSettings, true)
}

export function getSettings(): Settings {
    let mockupSettings: ActionDescriptor
    try {
        mockupSettings = app.getCustomOptions(mockupSettingsId)
    } catch (error) { }
    let mockupType: number
    let width: number
    let patternsPath: string

    let persistentSettings: ActionDescriptor
    try {
        persistentSettings = app.getCustomOptions(settingsId)
    } catch (error) { }
    let outputPath: string
    let outputSize: number
    let mockupsPath: string

    if (mockupSettings) {
        if (mockupSettings.hasKey(mockupTypeKey)) mockupType = mockupSettings.getInteger(mockupTypeKey)
        if (mockupSettings.hasKey(widthKey)) width = mockupSettings.getDouble(widthKey)
        if (mockupSettings.hasKey(patternsPathKey)) patternsPath = mockupSettings.getString(patternsPathKey)
    }
    if (persistentSettings) {
        if (persistentSettings.hasKey(outputPathKey)) outputPath = persistentSettings.getString(outputPathKey)
        if (persistentSettings.hasKey(outputSizeKey)) outputSize = persistentSettings.getInteger(outputSizeKey)
        if (persistentSettings.hasKey(mockupsPathKey)) mockupsPath = persistentSettings.getString(mockupsPathKey)
    }

    return { mockupType, width, patternsPath, outputPath, outputSize, mockupsPath }
}

// Function to shorten the path and replace the middle with "..."
function shortenPath(path?: string): string {
    if (!path) return ''
    const maxLength = 50 // Maximum number of characters to display
    if (path.length > maxLength) {
        const partLength = Math.floor((maxLength - 3) / 2) // Divide remaining space for both ends
        return path.substr(0, partLength) + '...' + path.substr(path.length - partLength, partLength)
    }
    return path
}

export function showDialog() {
    var dialog = new Window('dialog')
    dialog.text = 'Mockupy abcfirany'
    dialog.orientation = 'row'
    dialog.alignChildren = ['left', 'top']
    dialog.spacing = 10
    dialog.margins = 16

    // inputs

    var group = dialog.add('group', undefined, { name: 'group' })
    group.preferredSize.width = 150
    group.orientation = 'column'
    group.alignChildren = ['fill', 'top']
    group.spacing = 10
    group.margins = 0
    group.alignment = ['left', 'fill']

    // dropdown
    dialog['mockup'] = group.add('dropdownlist', undefined, [
        'Zasłony',
        'Zasłony velvet',
        'Poszewki',
        'Poszewki velvet',
        'Bieżniki',
        'Obrusy',
    ])
    dialog['mockup'].text = "Rodzaj mockup'a"
    dialog['mockup'].alignment = ['fill', 'top']

    // select directory with output
    let outputFolder: Folder
    var outputGroup = group.add('group')
    outputGroup.orientation = 'row'
    outputGroup.alignChildren = ['left', 'center']
    outputGroup.alignment = ['fill', 'top']

    var output = outputGroup.add('button', undefined, undefined, { name: 'output' })
    output.text = 'Wybierz folder wyjściowy'

    var outputPathText = outputGroup.add('statictext', undefined, 'Nie wybrano folderu', { name: 'outputPathText' })
    outputPathText.preferredSize.width = 250
    outputPathText.justify = 'left'

    output.onClick = function () {
        outputFolder = Folder.selectDialog('Wybierz folder wyjściowy')
        if (outputFolder) {
            outputPathText.text = shortenPath(outputFolder.fsName)
        } else {
            outputPathText.text = 'Nie wybrano folderu'
        }
    }

    // select directory with mockups
    let mockupsFolder: Folder
    var mockupsGroup = group.add('group')
    mockupsGroup.orientation = 'row'
    mockupsGroup.alignChildren = ['left', 'center']
    mockupsGroup.alignment = ['fill', 'top']

    var mockups = mockupsGroup.add('button', undefined, undefined, { name: 'mockups' })
    mockups.text = 'Wybierz folder z mockupami'

    var mockupsPathText = mockupsGroup.add('statictext', undefined, 'Nie wybrano folderu', { name: 'mockupsPathText' })
    mockupsPathText.preferredSize.width = 250
    mockupsPathText.justify = 'left'

    mockups.onClick = function () {
        mockupsFolder = Folder.selectDialog('Wybierz folder z mockupami')
        if (mockupsFolder) {
            mockupsPathText.text = shortenPath(mockupsFolder.fsName)
        } else {
            mockupsPathText.text = 'Nie wybrano folderu'
        }
    }

    // mockup settings

    const panel = group.add('panel', undefined, undefined, { name: 'panel' })
    panel.text = 'Ustawienia'
    panel.orientation = 'column'
    panel.alignChildren = ['left', 'top']
    panel.spacing = 10
    panel.margins = 10
    panel.alignment = ['fill', 'top']

    // inputs block

    const inputsGroup = panel.add('group', undefined, { name: 'inputsGroup' })
    inputsGroup.preferredSize.width = 150
    inputsGroup.orientation = 'row'
    inputsGroup.spacing = 10
    inputsGroup.margins = 0
    inputsGroup.alignment = ['fill', 'fill']

    const widthGroup = inputsGroup.add('group', undefined, { name: 'widthGroup' })
    widthGroup.size = [75, 50]
    widthGroup.orientation = 'column'
    widthGroup.alignment = ['fill', 'fill']

    const outputSizeGroup = inputsGroup.add('group', undefined, { name: 'outputSizeGroup' })
    outputSizeGroup.size = [75, 50]
    outputSizeGroup.orientation = 'column'
    outputSizeGroup.alignment = ['fill', 'fill']

    dialog['widthLabel'] = widthGroup.add('statictext', undefined, undefined, { name: 'widthLabel' })
    dialog['widthLabel'].text = 'Szerokość wzoru (cm)'
    dialog['widthLabel'].alignment = ['fill', 'top']

    dialog['width'] = widthGroup.add('edittext', undefined, undefined, { name: 'width' })
    dialog['width'].text = ''
    dialog['width'].alignment = ['fill', 'top']

    dialog['outputSizeLabel'] = outputSizeGroup.add('statictext', undefined, undefined, { name: 'outputSizeLabel' })
    dialog['outputSizeLabel'].text = 'Wymiar wyjściowego obrazu (px)'
    dialog['outputSizeLabel'].alignment = ['fill', 'top']

    dialog['outputSize'] = outputSizeGroup.add('edittext', undefined, undefined, { name: 'outputSize' })
    dialog['outputSize'].alignment = ['fill', 'top']

    // select directory with patterns
    let patternsFolder: Folder
    var patternsGroup = panel.add('group')
    patternsGroup.orientation = 'row'
    patternsGroup.alignChildren = ['left', 'center']
    patternsGroup.alignment = ['fill', 'top']

    var patterns = patternsGroup.add('button', undefined, undefined, { name: 'patterns' })
    patterns.text = 'Wybierz folder z wzorami'

    var folderPathText = patternsGroup.add('statictext', undefined, 'Nie wybrano folderu', { name: 'folderPathText' })
    folderPathText.preferredSize.width = 250
    folderPathText.justify = 'left'

    patterns.onClick = function () {
        patternsFolder = Folder.selectDialog('Wybierz folder z wzorami')
        if (patternsFolder) {
            folderPathText.text = shortenPath(patternsFolder.fsName)
        } else {
            folderPathText.text = 'Nie wybrano folderu'
        }
    }

    // buttons

    var buttonGroup = dialog.add('group', undefined, { name: 'buttonGroup' })
    buttonGroup.orientation = 'column'
    buttonGroup.alignChildren = ['fill', 'top']
    buttonGroup.spacing = 10
    buttonGroup.margins = 0

    var ok = buttonGroup.add('button', undefined, undefined, { name: 'ok' })
    ok.text = 'OK'

    var cancel = buttonGroup.add('button', undefined, undefined, { name: 'cancel' })
    cancel.text = 'Anuluj'

    ok.onClick = function () {
        if (!patternsFolder) {
            alert('Wybierz folder z wzorami')
            return
        }

        if (!outputFolder) {
            alert('Wybierz folder wyjściowy')
            return
        }

        if (!mockupsFolder) {
            alert('Wybierz folder z mockupami')
            return
        }

        let width = dialog['width'].text
        if (!width) {
            alert('Podaj szerokość wzoru')
            return
        }

        let outputSize = dialog['outputSize'].text
        if (!outputSize) {
            alert('Podaj wymiar pliku wyjściowego (px)')
            return
        }

        let mockupName = dialog['mockup'].selection
        if (!mockupName) {
            alert("Wybierz rodzaj mockup'a")
            return
        }

        saveSettings({
            mockupType: mockupName.index,
            width: width,
            patternsPath: patternsFolder.toString(),
            outputPath: outputFolder.toString(),
            outputSize: outputSize,
            mockupsPath: mockupsFolder.toString(),
        })

        dialog.close(1)
    }

    cancel.onClick = function () {
        dialog.close(2)
        return
    }

    // load persistent settings
    const settings = getSettings()
    outputPathText.text = shortenPath(settings.outputPath)
    mockupsPathText.text = shortenPath(settings.mockupsPath)
    outputFolder = new Folder(settings.outputPath)
    mockupsFolder = new Folder(settings.mockupsPath)
    dialog['outputSize'].text = settings.outputSize || 1500

    dialog.center()
    return dialog.show()
}
