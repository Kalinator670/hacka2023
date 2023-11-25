/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/utils/prisma.service';
import { UserProfileDto } from './dto/user-profile.dto';

@Injectable()
export class UserService {
  private readonly prisma: PrismaService;

  constructor(prisma: PrismaService) {
    this.prisma = prisma;
  }

  public async getUser(id: number): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  public async getAllUsers(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users;
  }

  public async updateUser(id: number, body: UserProfileDto): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: body,
    });
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
  }

  async deleteUser(ids: number | number[]) {
    const userIds = Array.isArray(ids) ? ids : [ids];

    const deletedUsers = await Promise.all(
      userIds.map(async (id) => {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (user) {
          await this.prisma.user.delete({ where: { id } });
          return user;
        }
        return null;
      }),
    );

    return deletedUsers.filter(Boolean);
  }
}
