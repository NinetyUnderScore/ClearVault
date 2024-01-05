import { getImage } from './util.mjs'
import { CanvasEventManager } from '../MIG/lib/CanvasManager.mjs'
import * as InventoryWindows from '../MIG/lib/inventories.mjs'

window.canvas = document.getElementById('demo')
const canvasManager = new CanvasEventManager(window.canvas)
canvasManager.setScale(6.0)


const getImageIcon = (item) => {
    return { path: 'item/redstone', tip: 'item name here' }
}

window.inventory = new InventoryWindows.ChestWin(canvasManager, {
    getImage, getImageIcon
})

setTimeout(() => {
    canvasManager.startRendering()
    console.log('Rendering!')
}, 440)

function clearWindow() {
    const windowMap = window.inventory.getWindowMap()

    for (const key in windowMap) {
        window.inventory[key] = []
    }
}

window.setScale = (scale) => {
    canvasManager.setScale(scale)
}

window.updateWin = () => {
    canvasManager.reset()
    const selWindow = document.getElementById('active-win').value
    window.inventory = new InventoryWindows[selWindow](canvasManager, { getImage, getImageIcon })
    canvasManager.slideInUp(window.inventory)
    window.inventory.needsUpdate = true

    if (globalThis.TESTING) {
        renderTesting()
    }
}

window.renderTesting = () => {
    const windowMap = window.inventory.getWindowMap()

    for (const key in windowMap) {
        const size = windowMap[key][1] ? Math.abs(windowMap[key][1] - windowMap[key][0]) + 1 : 1
        const getItem = (key) => new window.Item(1, key)
        const arr = [...new Array(size).keys()].map(getItem)
        window.inventory[key] = arr
    }

    window.inventory.needsUpdate = true
}
