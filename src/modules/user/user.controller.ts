import {
  Controller,
  Put,
  Delete,
  Get,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { AuthorizationGuard } from '../authorization/guards/authorization.guard';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { UserProfileDto } from './dto/user-profile.dto';

@ApiTags('User')
@UseGuards(AuthorizationGuard)
@Controller('user')
export class UserController {
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  @ApiOkResponse({ type: 'Inf user' })
  @Get('/:ok')
  async getUser(@Param() params: CreateUserDto): Promise<User> {
    const user = await this.userService.getUser(params.id);
    return user;
  }

  @ApiOkResponse({ type: 'All users blin' })
  @Get('/all')
  async getUsers(): Promise<User[]> {
    const users = await this.userService.getAllUsers();
    return users;
  }

  @ApiOkResponse({ type: 'Change inf user' })
  @Put('/update_profile')
  async updateUser(@Body() body: UserProfileDto): Promise<unknown> {
    const user = await this.userService.updateUser(body.id, body);
    return user;
  }

  @ApiOkResponse({ type: 'Delete user' })
  @Delete('/:ids')
  async deleteUser(@Param('ids') ids: string) {
    const userIds = ids.split(',').map(Number);

    const deletedUsers = await this.userService.deleteUser(userIds);

    return {
      message: 'Пользователь успешно удален!',
      deletedUsers,
    };
  }
}
