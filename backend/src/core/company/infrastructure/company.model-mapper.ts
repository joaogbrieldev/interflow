import { User } from '@core/user/domain/user.aggregate';
import { CompanyAggregate } from '../domain/company.aggregate';
import { CompanyModel } from './company.model';

export abstract class CompanyModelMapper {
  static mapToDomain(
    normalizedPersistencyObject: CompanyModel,
  ): CompanyAggregate {
    let user: User;
    if (normalizedPersistencyObject.user) {
      user = new User({
        name: normalizedPersistencyObject.user.name,
        email: normalizedPersistencyObject.user.email,
      });
    }

    const company: CompanyAggregate = new CompanyAggregate({
      id: normalizedPersistencyObject.id,
      name: normalizedPersistencyObject.name,
      email: normalizedPersistencyObject.email,
      phone: normalizedPersistencyObject.phone,
      contact: normalizedPersistencyObject.contact.map((item) => ({
        name: item.name,
        role: item.role,
      })),
      company_website: normalizedPersistencyObject.website,
      user: user ?? null,
      country: normalizedPersistencyObject.country,
    });

    return company;
  }
  static mapToModel(
    normalizedPersistencyObject: CompanyAggregate,
  ): CompanyModel {
    const company: CompanyModel = new CompanyModel();
    company.id = normalizedPersistencyObject.id;
    company.name = normalizedPersistencyObject.name;
    company.email = normalizedPersistencyObject.email.getValue();
    company.phone = normalizedPersistencyObject.phone.getValue();
    company.website = normalizedPersistencyObject.company_website;
    company.country = normalizedPersistencyObject.country;
    return company;
  }
}
