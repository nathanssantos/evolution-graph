import React, { useEffect, useState } from "react";
import Controller from "../../Controller";

const EvolutionGraph = (props) => {
  const { getController } = props;
  const [mounted, setMounted] = useState(false);

  const graphController = new Controller(props);

  useEffect(() => {
    if (mounted) return;

    if (getController && typeof getController === "function") {
      getController(graphController);
    }

    graphController.create(".evolution-graph-component");

    setMounted(true);
  }, []);

  return <div className="evolution-graph-component" />;
};

export default EvolutionGraph;
