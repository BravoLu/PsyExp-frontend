import { useEffect, useState } from "react";
import { ExpInfo, ExpStats } from "./entity";
import { useParams } from "react-router-dom";
import { queryExps } from "./http";

const useExps = () => {
  const params = useParams();
  const [exps, setExps] = useState<ExpInfo[] | null | undefined>(null);
  const [stats, setStats] = useState<ExpStats>({
    ongoing_num: 0,
    closed_num: 0,
    finished_num: 0,
    all_num: 0,
  });
  const [order, setOrder] = useState(0);
  const [rid, setRid] = useState<number>(Number(params["id"]));
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [pageSize, setPageSizes] = useState<number>(10);
  const [isLoading, setIsLoading] = useState(false);
  const [totalNum, setTotalNum] = useState(0);
  const [state, setState] = useState<string>("0");
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    queryExps({
      rid: rid,
      page_index: pageIndex,
      page_size: pageSize,
      order_type: order,
      state: Number(state),
    })
      .then((result) => {
        setExps(result.exps);
        setStats(result.stats);
        setTotalNum(result.total_num);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("error: ", error);
      });
  }, [pageIndex, order, state, rerender]);

  return {
    isLoading,
    exps,
    totalNum,
    rid,
    pageIndex,
    pageSize,
    order,
    state,
    stats,
    rerender,
    setRid,
    setPageIndex,
    setPageSizes,
    setOrder,
    setState,
    setStats,
    setRerender,
  };
};

export default useExps;
