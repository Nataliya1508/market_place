import { CompanyEntity } from '@app/saler/entities/company.entity';
import { IndividualEntity } from '@app/saler/entities/individual.entity';
import { UserDto } from '@app/user/dto/user.dto';
import { UserRole } from '@app/user/enums/userRole.enum';

class BaseSeller {
  id: number;
  email: string;
  role: UserRole;
  emailVerified: boolean;
  name: string;
  lastName: string;
  phoneNumber: string;
  isActive: boolean;
}

export class SellerIndividualDto extends BaseSeller {
  image?: string;
  about: string;
  contactPersonFullName: string;
  address: string;
  workingHours: string;
  bankCardNumber: string;
  bankCardExpirationDate: string;

  public static from(individual: IndividualEntity): SellerIndividualDto {
    const individualDto = new SellerIndividualDto();

    individualDto.id = individual.id;
    individualDto.name = individual.seller.name;
    individualDto.lastName = individual.seller.lastName;
    individualDto.phoneNumber = individual.seller.phoneNumber;
    individualDto.isActive = individual.seller.isActive;
    individualDto.about = individual.about;
    individualDto.contactPersonFullName = individual.contactPersonFullName;
    individualDto.address = individual.address;
    individualDto.workingHours = individual.workingHours;
    individualDto.bankCardNumber = individual.bankCardNumber;
    individualDto.bankCardExpirationDate = individual.bankCardExpirationDate;

    const userDto = UserDto.from(individual.seller.user);

    individualDto.email = userDto.email;
    individualDto.role = userDto.role;
    individualDto.emailVerified = userDto.emailVerified;

    return individualDto;
  }

  public static fromMany(
    individuals: IndividualEntity[],
  ): SellerIndividualDto[] {
    return individuals.map((individual) => this.from(individual));
  }
}

export class SellerCompanyDto extends BaseSeller {
  name: string;
  image: string;
  logo?: string;
  about: string;
  contactPersonFullName: string;
  address: string;
  workingHours: string;
  iban?: string;
  bankName?: string;
  mfo?: string;
  edrpou?: string;

  public static from(company: CompanyEntity): SellerCompanyDto {
    const companyDto = new SellerCompanyDto();

    companyDto.id = company.id;
    companyDto.name = company.seller.name;
    companyDto.lastName = company.seller.lastName;
    companyDto.phoneNumber = company.seller.phoneNumber;
    companyDto.isActive = company.seller.isActive;
    companyDto.name = company.name;
    companyDto.image = company.image;
    companyDto.logo = company.logo;
    companyDto.about = company.about;
    companyDto.contactPersonFullName = company.contactPersonFullName;
    companyDto.address = company.address;
    companyDto.workingHours = company.workingHours;
    companyDto.iban = company.iban;
    companyDto.bankName = company.bankName;
    companyDto.mfo = company.mfo;
    companyDto.edrpou = company.edrpou;

    const userDto = UserDto.from(company.seller.user);

    companyDto.email = userDto.email;
    companyDto.role = userDto.role;
    companyDto.emailVerified = userDto.emailVerified;

    return companyDto;
  }

  public static fromMany(companies: CompanyEntity[]): SellerCompanyDto[] {
    return companies.map((company) => this.from(company));
  }
}
