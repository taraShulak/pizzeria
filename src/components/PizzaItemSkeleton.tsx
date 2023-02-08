import React from "react"
import ContentLoader from "react-content-loader"
//@ts-ignore
const PizzaItemSkeleton: React.FC = (props) => (
  <ContentLoader 
  speed={2}
  width={280}
  height={460}
  viewBox="0 0 280 480"
  backgroundColor="#9e9a9a"
  foregroundColor="#ecebeb"
  {...props}
>
  <rect x="0" y="332" rx="10" ry="10" width="260" height="88" /> 
  <rect x="1" y="285" rx="10" ry="10" width="260" height="34" /> 
  <rect x="6" y="435" rx="10" ry="10" width="68" height="38" /> 
  <rect x="101" y="429" rx="30" ry="30" width="161" height="50" /> 
  <circle cx="129" cy="135" r="129" /> 
  <circle cx="217" cy="162" r="13" />
</ContentLoader>
)

export default PizzaItemSkeleton

