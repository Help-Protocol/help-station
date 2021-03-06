import useHash from "../../libs/useHash"
import { TradeType } from "../../types/Types"
import TradeForm from "../../forms/TradeForm"
import Tab from "../../components/Tab"
import Page from "../../components/Page"
import TradeList from "./TradeList"

const Trade = () => {
  const { hash: type } = useHash<TradeType>()
  return (
    <Page title="Contribute">
      {!type ? (
        <TradeList />
      ) : (
        <Tab tabs={[TradeType.PLEDGE, TradeType.SWAP]} current={type}>
          <TradeForm type={type} key={type} />
        </Tab>
      )}
    </Page>
  )
}

export default Trade
