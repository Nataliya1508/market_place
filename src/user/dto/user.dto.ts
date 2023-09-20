// import { UserEntity } from '@app/user/entities/user.entity';
// import { UserRole } from '@app/user/enums/userRole.enum';

// export class UserDto {
//   id: number;
//   email: string;
//   role: UserRole;
//   emailVerified: boolean;

//   public static from(user: UserEntity): UserDto {
//     const userDto = new UserDto();

//     userDto.id = user.id;
//     userDto.email = user.email;
//     userDto.role = user.role;
//     userDto.emailVerified = user.emailVerified;

//     return userDto;
//   }

//   public static fromMany(users: UserEntity[]): UserDto[] {
//     return users.map((user) => this.from(user));
//   }
// }
