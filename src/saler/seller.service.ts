// import { CompanyEntity } from '@app/saler/entities/company.entity';
// import { IndividualEntity } from '@app/saler/entities/individual.entity';
// import { SellerEntity } from '@app/saler/entities/saler.entity';
// import {
//   CreateCompanySeller,
//   CreateIndividualSeller,
//   CreateSeller,
// } from '@app/saler/types/createSeller.type';
// import { UserEntity } from '@app/user/entities/user.entity';
// import { UserRole } from '@app/user/enums/userRole.enum';
// import { UserService } from '@app/user/user.service';
// import { EntityCondition } from '@app/utils/types/entityCondition.type';
// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';

// @Injectable()
// export class SellerService {
//   constructor(
//     @InjectRepository(SellerEntity)
//     private readonly sellerRepository: Repository<SellerEntity>,
//     @InjectRepository(IndividualEntity)
//     private readonly individualRepository: Repository<IndividualEntity>,
//     @InjectRepository(CompanyEntity)
//     private readonly companyRepository: Repository<CompanyEntity>,
//     private readonly configService: ConfigService,
//     private readonly userService: UserService,
//   ) {}

//   public async createIndividual(
//     data: CreateIndividualSeller,
//   ): Promise<IndividualEntity | null> {
//     const { email, password, ...sellerData } = data;
//     const { name, lastName, phoneNumber, isActive, ...individualData } =
//       sellerData;

//     const user = await this.userService.create({
//       email,
//       password,
//       role: UserRole.SellerIndividual,
//     });

//     // FIXME: The following steps should be executed as a transaction
//     const seller = await this.createSeller({
//       name,
//       lastName,
//       phoneNumber,
//       email,
//       password,
//       user,
//     });

//     const foundIndividual = await this.individualRepository.findOne({
//       where: { seller: { id: seller.id } },
//     });

//     // Updating individual's data if individual already exists
//     const individualToSave = foundIndividual
//       ? { id: foundIndividual.id, ...individualData }
//       : { ...individualData, seller };

//     return await this.individualRepository.save(
//       this.individualRepository.create(individualToSave),
//     );
//   }

//   public async findOneIndividual(
//     options: EntityCondition<IndividualEntity>,
//   ): Promise<IndividualEntity | null> {
//     return await this.individualRepository.findOne({ where: options });
//   }

//   public async createCompany(
//     data: CreateCompanySeller,
//   ): Promise<CompanyEntity | null> {
//     const { email, password, ...sellerData } = data;
//     const { name, lastName, phoneNumber, isActive, ...companyData } =
//       sellerData;

//     const user = await this.userService.create({
//       email,
//       password,
//       role: UserRole.SellerCompany,
//     });

//     // FIXME: The following steps should be executed as a transaction
//     const seller = await this.createSeller({
//       name,
//       lastName,
//       phoneNumber,
//       email,
//       password,
//       user,
//     });

//     const foundCompany = await this.companyRepository.findOne({
//       where: { seller: { id: seller.id } },
//     });

//     // Updating company's data if company already exists
//     const companyToSave = foundCompany
//       ? { id: foundCompany.id, ...companyData, name: companyData.companyName }
//       : { ...companyData, name: companyData.companyName, seller };

//     return await this.companyRepository.save(
//       this.companyRepository.create(companyToSave),
//     );
//   }

//   public async findOneCompany(
//     options: EntityCondition<UserEntity & SellerEntity & CompanyEntity>,
//   ): Promise<CompanyEntity | null> {
//     return await this.companyRepository.findOne({ where: options });
//   }

//   private async createSeller(
//     data: CreateSeller & { user: UserEntity },
//   ): Promise<SellerEntity> {
//     const foundSeller = await this.sellerRepository.findOne({
//       where: { user: { id: data.user.id } },
//     });

//     const sellerToSave = foundSeller ? { id: foundSeller.id, ...data } : data;

//     return await this.sellerRepository.save(
//       this.sellerRepository.create(sellerToSave),
//     );
//   }

//   public async findOne(
//     options: EntityCondition<UserEntity & SellerEntity>,
//   ): Promise<SellerEntity | null> {
//     return this.sellerRepository.findOne({ where: options });
//   }
// }
import { Role } from '@app/user/enums/enums';
import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { SellerEntity } from './entities/saler.entity';
import { SellerResponseInterface } from './types/sellerResponse.interface';

@Injectable()
export class SellerService {
  generateJwt(seller: SellerEntity): string {
    return sign(
      {
        id: seller.id,
        role: Role.Seller,
        email: seller.email,
      },
      process.env.JWT_SECRET,
    );
  }

  buildSellerResponse(seller: SellerEntity): SellerResponseInterface {
    return {
      seller: {
        ...seller,
        token: this.generateJwt(seller),
      },
    };
  }
}
