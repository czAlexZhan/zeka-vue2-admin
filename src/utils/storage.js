/**
 * 本地存储
 */
import { createLocalforage, createStorage } from '@msp/core-js'

const storagePrefix = import.meta.env.VITE_STORAGE_PREFIX || ''

export const localStg = createStorage('local', storagePrefix)

export const sessionStg = createStorage('session', storagePrefix)

export const localforage = createLocalforage('local')

export const localforageOfIndexDB = createLocalforage('indexedDB')
