import { config } from '@xeno/tamagui-config'

export type Conf = typeof config

declare module '@xeno/ui' {
  interface TamaguiCustomConfig extends Conf {}
}
