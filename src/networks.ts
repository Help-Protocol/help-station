import { NetworkInfo } from "@terra-dev/wallet-types"

type HelpNetworkInfo = NetworkInfo & LocalNetworkConfig

const networks: Record<string, HelpNetworkInfo> = {
  testnet: {
    name: "testnet",
    chainID: "bombay-12",
    lcd: "https://bombay-lcd.terra.dev",
    contract: "https://help-network-testnet-assets.vercel.app/bombay.json",
    mantle: "https://bombay-mantle.terra.dev/",
    shuttle: {
      ethereum: "terra10a29fyas9768pw8mewdrar3kzr07jz8f3n73t3",
      bsc: "terra1paav7jul3dzwzv78j0k59glmevttnkfgmgzv2r",
    },
    fee: { gasPrice: 0.15, amount: 150000 }, // 0.15 UST
  },
}

export const defaultNetwork = networks.testnet

export default networks
