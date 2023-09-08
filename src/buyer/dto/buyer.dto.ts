import { BuyerEntity } from '@app/buyer/buyer.entity';
import { UserDto } from '@app/user/dto/user.dto';
import { UserRole } from '@app/user/enums/userRole.enum';

export class BuyerDto {
  id: number;
  email: string;
  role: UserRole;
  emailVerified: boolean;
  name: string;
  lastName: string;
  phoneNumber: string;
  isActive: boolean;

  public static from(buyer: BuyerEntity): BuyerDto {
    const buyerDto = new BuyerDto();

    buyerDto.id = buyer.id;
    buyerDto.name = buyer.name;
    buyerDto.lastName = buyer.lastName;
    buyerDto.phoneNumber = buyer.phoneNumber;
    buyerDto.isActive = buyer.isActive;

    const userDto = UserDto.from(buyer.user);

    buyerDto.email = userDto.email;
    buyerDto.role = userDto.role;
    buyerDto.emailVerified = userDto.emailVerified;

    return buyerDto;
  }

  public static fromMany(buyers: BuyerEntity[]): BuyerDto[] {
    return buyers.map((buyer) => this.from(buyer));
  }
}
