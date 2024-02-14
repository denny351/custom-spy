import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "react-feather";
import Layout from "../components/common/Layout";
import ActionButton from "../components/common/ActionButton";
import SetRow from "../components/SetsPage/SetRow";
import sets from "../testData/sets";

function SetsPage() {
  const [setsType, setSetsType] = useState<"premade" | "custom">("premade");

  return (
    <Layout>
      <Link to="/" className="flex items-center absolute top-6">
        <ChevronLeft />
        Back
      </Link>

      <div className="flex flex-col items-center">
        <h2 className="text-xl my-6">Sets</h2>

        <div className="flex mb-6">
          <ActionButton
            onClick={() => setSetsType("premade")}
            className={`mr-2.5 my-0 text-sm w-40 ${setsType === "premade" && "bg-spy-gray"}`}
          >
            Premade
          </ActionButton>

          <ActionButton
            onClick={() => setSetsType("custom")}
            className={`my-0 text-sm w-40 ${setsType === "custom" && "bg-spy-gray"}`}
          >
            Custom
          </ActionButton>
        </div>

        {setsType === "premade" &&
          sets.map((set) => (
            <SetRow key={set.id} name={set.name} cardsQuantity={set.locations.length} />
          ))}
        {setsType === "custom" &&
          sets.map((set) => (
            <SetRow key={set.id} name={set.name} cardsQuantity={set.locations.length} />
          ))}
      </div>
    </Layout>
  );
}

export default SetsPage;
