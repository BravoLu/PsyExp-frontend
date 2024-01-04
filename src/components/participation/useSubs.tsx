import { useEffect, useState } from "react";

import { querySubs } from "./http";
import { useParams } from "react-router-dom";
import { SubInfo } from "../experiments/entity";

export const useSubs = () => {
  const { id } = useParams();
  const [subs, setSubs] = useState<SubInfo[]>([]);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [pageSize, setPageSizes] = useState<number>(10);
  const [isLoading, setIsLoading] = useState(false);
  const [totalNum, setTotalNum] = useState(0);
  const [state, setState] = useState<string>("0");
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (id !== undefined) {
      querySubs({
        pid: Number(id),
        page_index: pageIndex,
        page_size: pageSize,
        state: Number(state),
      })
        .then((res) => {
          setSubs(res.subs);
          setTotalNum(res.total_num);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [pageIndex, rerender, state]);

  return {
    isLoading,
    subs,
    totalNum,
    pageIndex,
    pageSize,
    state,
    rerender,
    setPageIndex,
    setPageSizes,
    setState,
    setRerender,
  };
};
