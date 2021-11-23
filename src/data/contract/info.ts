import { atom, selector } from "recoil"
import { useStoreLoadable } from "../utils/loadable"
import { getContractQueryQuery } from "../utils/query"
import { protocolQuery } from "./protocol"

export const helpTokenInfoQuery = selector({
  key: "helpTokenInfo",
  get: async ({ get }) => {
    const { contracts } = get(protocolQuery)
    const getContractQuery = get(getContractQueryQuery)
    const response = await getContractQuery<{ total_supply: string }>(
      {
        contract: contracts["helpToken"],
        msg: { token_info: {} },
      },
      "helpTokenInfo"
    )

    return response
  },
})

export const helpTokenGovBalanceQuery = selector({
  key: "helpTokenGovBalance",
  get: async ({ get }) => {
    const { contracts } = get(protocolQuery)
    const getContractQuery = get(getContractQueryQuery)
    const response = await getContractQuery<Balance>(
      {
        contract: contracts["helpToken"],
        msg: { balance: { address: contracts["gov"] } },
      },
      "helpTokenGovBalance"
    )

    return response?.balance ?? "0"
  },
})

const helpTokenGovBalanceState = atom({
  key: "helpTokenGovBalanceState",
  default: "0",
})

export const helpTokenCommunityBalanceQuery = selector({
  key: "helpTokenCommunityBalance",
  get: async ({ get }) => {
    const { contracts } = get(protocolQuery)
    const getContractQuery = get(getContractQueryQuery)
    const response = await getContractQuery<Balance>(
      {
        contract: contracts["helpToken"],
        msg: { balance: { address: contracts["community"] } },
      },
      "helpTokenCommunityBalance"
    )

    return response?.balance ?? "0"
  },
})

const helpTokenCommunityBalanceState = atom({
  key: "helpTokenCommunityBalanceState",
  default: "0",
})

export const communityConfigQuery = selector({
  key: "communityConfig",
  get: async ({ get }) => {
    const { contracts } = get(protocolQuery)
    const getContractQuery = get(getContractQueryQuery)
    const response = await getContractQuery<{ spend_limit: string }>(
      { contract: contracts["community"], msg: { config: {} } },
      "communityConfig"
    )

    return response
  },
})

export const factoryDistributionInfoQuery = selector({
  key: "factoryDistributionInfo",
  get: async ({ get }) => {
    const { contracts } = get(protocolQuery)
    const getContractQuery = get(getContractQueryQuery)
    const response = await getContractQuery<{ weights: DistributionWeight[] }>(
      {
        contract: contracts["factory"],
        msg: { distribution_info: {} },
      },
      "factoryDistributionInfo"
    )

    return response?.weights
  },
})

export const getDistributionWeightQuery = selector({
  key: "getDistributionWeight",
  get: ({ get }) => {
    const weights = get(factoryDistributionInfoQuery)
    return (token: string) => weights?.find(([addr]) => addr === token)?.[1]
  },
})

/* store */
export const useHelpTokenGovBalance = () => {
  return useStoreLoadable(helpTokenGovBalanceQuery, helpTokenGovBalanceState)
}

export const useHelpTokenCommunityBalance = () => {
  return useStoreLoadable(
    helpTokenCommunityBalanceQuery,
    helpTokenCommunityBalanceState
  )
}
