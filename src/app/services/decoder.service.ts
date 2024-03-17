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

  public decodeCertificate(certData: Uint8Array): Cert | null {
    try {
      const result = ASN1.decode(certData);

      if (result.typeName() !== 'SEQUENCE') {
        throw 'Неправильна структура конверта сертифіката (очікується SEQUENCE) ';
      }

      const commonName: string = result.sub![0].sub![3].sub![2].toPrettyString();
      const cn: string = result.sub![0].sub![5].sub![1].toPrettyString();
      const validFrom: string = result.sub![0].sub![4].sub![0].toPrettyString();
      const validTo: string = result.sub![0].sub![4].sub![1].toPrettyString();

      const certificate: Cert = {
        commonName: this.getInfo(commonName),
        cn: this.getInfo(cn),
        validFrom: this.getDate(validFrom),
        validTo: this.getDate(validTo),
      }

      this.setCertificateInLocalStorage(certificate);
      return certificate;
    } catch (error) {
      console.error('Error decoding certificate:', error);
      return null;
    }
  }

  public getCertificateFromLocalStorage(): Cert[] | [] {
    const storedData: string | null = localStorage.getItem('certificate');
    return storedData ? JSON.parse(storedData) as Cert[] : [];
  }

  private getInfo(data: string): string {
    const lastColonIndex = data.lastIndexOf(':');
    if (lastColonIndex !== -1) {
      return data.substring(lastColonIndex + 1).trim();
    } else {
      return '';
    }
  }

  private getDate(date: string): string {
    const regex = /:\s*([^ ]+)/;
    const match = date.match(regex);
    return match![1];
  }

  private setCertificateInLocalStorage(cert: Cert): void {
    const foundCert = this.certArray?.find((i: { cn: string; }) => i.cn === cert.cn);
    if (!foundCert) {
      this.certArray?.push(cert);
      localStorage.setItem('certificate', JSON.stringify(this.certArray));
    }
  }
}