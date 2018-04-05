import UAParser from 'ua-parser-js'

export const UA = UAParser()
const UAName = UA.browser.name

export const isMobile  = UA.device && (UA.device.type === 'mobile')
export const isIE = UAName === 'IE'
export const isEdge = UAName === 'Edge'

export const DeviceType = isMobile ? 2 : 1