interface qrCode {
  id: string;
  urlId: string;
  image: string;
}

export interface TableType {
  id: string;
  shortUrl: string;
  longUrl: string;
  QrCode: qrCode | any;
  clicks: number;
  status: string;
  createdAt: Date | string;
}
