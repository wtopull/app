import UAParser from 'ua-parser-js'

export const UA = UAParser()
const UAName = UA.browser.name

export const isMobile  = UA.device && (UA.device.type === 'mobile')
export const isIE = UAName === 'IE'
export const isEdge = UAName === 'Edge'
//1=Web, 2=Android APP, 3=iOS APP, 4=PC, 5=h5,6=other
export const DeviceType = isMobile ? 5 : 1