import { config } from '@xeno/tamagui-config'

export type Conf = typeof config

declare module 'tamagui' {
    interface TamaguiCustomConfig extends Conf { }
}
