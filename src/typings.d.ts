declare type SensorRecord = {
  Do_am: string;
  Do_duc: string;
  Kinh_do: string;
  Ngay: string;
  Nhiet_do: string;
  Thoi_gian: string;
  Toc_do: string;
  Vi_do: string;
  pH: string;
};

declare type DataW = {
  // Timestamp là ngày
  [timestamp: string]: {
    Do_am: string;
    Do_duc: string;
    Ngay: string;
    Nhiet_do: string;
    Thoi_gian: string;
    Toc_do: string;
    Timestampt: string;
    pH: string;
  };
};
