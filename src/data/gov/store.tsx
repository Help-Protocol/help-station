import { minus, isFinite } from "../../libs/math"
import { useGovState } from "./state"
import { useHelpTokenGovBalance } from "../contract/info"

export const useTotalStaked = () => {
  const state = useGovState()
  const balance = useHelpTokenGovBalance()

  return [balance, state?.total_deposit].every(isFinite)
    ? minus(balance, state?.total_deposit)
    : "0"
}
