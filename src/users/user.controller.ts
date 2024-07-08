import { Body, Controller, UseGuards, Delete, Get, Param, Post, Put, Headers, Query  } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
 import { RolesGuard } from 'src/auth/Roles/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { User, UserRole } from './entity/user.entity';
import { Admin, Resto } from 'src/auth/Roles/adminResto.decorator';
import { RegisterUserDto } from './dto/register-user.dto';
import { Roles } from 'src/auth/Roles/resto-roles.guard';


@Controller('users')
export class UserController {
  constructor(private  userService: UserService) {}

  @Post('register')
  async registerUser(@Body() registerUserDto: RegisterUserDto) {
    // Appelez la méthode du service d'utilisateur pour l'enregistrement
    try {
      const newUser = await this.userService.registerUser(registerUserDto);
      return { message: 'User registered successfully', user: newUser };
    } catch (error) {
      return { message: 'Error registering user', error: error.message };
    }
  }
 
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post('create-resto')
  async createResto(@Body() createUserDto: CreateUserDto) {
    return this.userService.createResto(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create-livreur')
  async createLivreur(@Body() createUserDto: CreateUserDto) {
    return this.userService.createLivreur(createUserDto);
  }
  
  
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUserById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('name/:name')
  async getUserByName(@Param('name') name: string) {
    return this.userService.getUserByName(name);
  }


  @UseGuards(JwtAuthGuard)
  @Get('adresse/:adresse')
  async getUserByAdresse(@Param('adresse') adresse: string) {
    return this.userService.getUserByAdresse(adresse);
  }

  @UseGuards(JwtAuthGuard)
  @Get('telephone/:telephone')
  async getUserByTelephone(@Param('telephone') telephone: string) {
    return this.userService.getUserByTelephone(telephone);
  }

  

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }


  @UseGuards(JwtAuthGuard)
  @Get('resto/Allresto')
  async getRestoUsers(): Promise<User[]> {
    return this.userService.getRestoUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get('livreur/Alllivreur')
  async getLivreurUsers(): Promise<User[]> {
    return this.userService.getLivreurUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get('consommateur/Allconsommateur')
  async getConsommateurUsers(): Promise<User[]> {
    return this.userService.getConsommateurUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get('count/livreurs')
  async countLivreur(): Promise<{ count: number }> {
    const count = await this.userService.countLivreur();
    return { count };
  }

  @UseGuards(JwtAuthGuard)
  @Get('count/consommateurs')
  async countConsommateur(): Promise<{ count: number }> {
    const count = await this.userService.countConsommateur();
    return { count };
  }

  @UseGuards(JwtAuthGuard)
  @Get('count/restos')
  async countResto(): Promise<{ count: number }> {
    const count = await this.userService.countResto();
    return { count };
  }


}
 