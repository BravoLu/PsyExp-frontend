import { useState } from "react";
export interface ExpInfo {
  eid?: string; //
  title?: string; //
  desc?: string; //
  url?: string; //
  cur_type?: number; //
  price?: number; //
  ctime?: number; //

  tags?: string[];
  pnum?: number;
  create_time?: string;
  update_time?: string;
  deadline?: Date;
  snum?: number;
  rid?: string | null;
  state: string | number;

  subs?: SubInfo[];
  subs_num?: number;
  finished_num?: number;
}

export interface ExpStats {
  ongoing_num: number;
  finished_num: number;
  closed_num: number;
  all_num: number;
}

export interface SubInfo {
  pid?: number;
  eid: number;
  sid?: string;
  state?: string;
  finished_at?: string;
  create_time?: string;
  update_time?: string;
}

export const useExp = () => {
  const [exp, setExp] = useState<ExpInfo>({
    eid: "",
    title: "",
    desc: "",
    ctime: 0,
    pnum: 0,
    price: 0,
    url: "",
    tags: [],
    state: "1",
  });

  return { exp, setExp };
};
