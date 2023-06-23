interface qrCode {
  id: string;
  urlId: string;
  image: string;
}

export interface TableType {
  id: number;
  shortUrl: string;
  longUrl: string;
  QrCode: qrCode | any;
  clicks: number;
  status: string;
  createdAt: Date | string;
}
