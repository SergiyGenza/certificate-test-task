import { Injectable } from '@angular/core';
import ASN1 from '@lapo/asn1js';
import { Certificate } from '../models/certificate.model';

@Injectable({
  providedIn: 'root'
})
export class DecoderService {

  constructor() { }

  decodeCertificate(certData: Uint8Array): Certificate | null {
    try {
      const result = ASN1.decode(certData);
      const commonName: string = result.sub![0].sub![3].sub![2].toPrettyString();
      const cn = result.sub![0].sub![5].sub![1].toPrettyString()
      const validFrom = result.sub![0].sub![4].sub![0].toPrettyString()
      const validTo = result.sub![0].sub![4].sub![1].toPrettyString()

      const certificate: Certificate = {
        commonName: this.getCommonName(commonName),
        cn: this.getCommonName(cn),
        validFrom: this.getDate(validFrom),
        validTo: this.getDate(validTo),
      }
      console.log(certificate);
      
      return certificate;
    } catch (error) {
      console.error('Error decoding certificate:', error);
      return null;
    }
  }

  getCommonName(data: string): string {
    const lastColonIndex = data.lastIndexOf(':');
    if (lastColonIndex !== -1) {
      return data.substring(lastColonIndex + 1).trim();
    } else {
      return '';
    }
  }

  getDate(date: string) {
    const regex = /:\s*([^ ]+)/;
    const match = date.match(regex);
    return match![1];
  }

}