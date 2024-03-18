import { Injectable } from '@angular/core';
import ASN1 from '@lapo/asn1js';
import { Cert } from '../models/certificate.model';

@Injectable({
  providedIn: 'root'
})
export class DecoderService {
  public certArray: Cert[] | undefined;

  constructor() {
    this.certArray = this.getCertificateFromLocalStorage();
  }

  public getCertificateFromLocalStorage(): Cert[] | [] {
    const storedData: string | null = localStorage.getItem('certificate');
    return storedData ? JSON.parse(storedData) as Cert[] : [];
  }

  public decodeCertificate(certData: Uint8Array): Cert | null {
    try {
      const result = ASN1.decode(certData);
      if (result.typeName() !== 'SEQUENCE') {
        throw 'Неправильна структура конверта сертифіката (очікується SEQUENCE) ';
      }

      const cn: string = this.getData(result.sub![0].sub![3].toPrettyString(), 'commonName');
      const commonName: string = this.getData(result.sub![0].sub![5].toPrettyString(), 'commonName');
      const validFrom: string = this.getDate(result.sub![0].sub![4].sub![0].toPrettyString());
      const validTo: string = this.getDate(result.sub![0].sub![4].sub![1].toPrettyString());
      const serialNumber: string = this.getData(result.sub![0].sub![5].toPrettyString(), 'serialNumber');

      const certificate: Cert = {
        commonName: commonName,
        cn: cn,
        validFrom: validFrom,
        validTo: validTo,
        serialNumber: serialNumber,
      }

      this.setCertificateInLocalStorage(certificate);
      return certificate;
    } catch (error) {
      alert('Error decoding certificate');
      console.error('Error decoding certificate:', error);
      return null;
    }
  }

  private getData(data: string, keyword: string): string {
    const regex = new RegExp(`${keyword}\\|X\\.520 DN component\\n\\s*UTF8String @\\d+\\+\\d+: ([^\\n]+)`);
    const match = data.match(regex);
    if (match) {
      return match[1].trim();
    } else {
      return `Значення ${keyword} не знайдено.`;
    }
  }

  private getDate(date: string): string {
    const regex = /:\s*([^ ]+)/;
    const match = date.match(regex);
    return match![1];
  }

  private setCertificateInLocalStorage(cert: Cert): void {
    const foundCert = this.certArray?.find((i: { serialNumber: string; }) => i.serialNumber === cert.serialNumber);
    if (!foundCert) {
      this.certArray?.push(cert);
      localStorage.setItem('certificate', JSON.stringify(this.certArray));
    }
  }
}