export abstract class IEncrypter {
  abstract encrypt(text: string): Promise<string>;
  abstract theValuesMatch(
    proposedValue: string,
    hashedValue: string,
  ): Promise<boolean>;
}
