import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './entity/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dto/register-user.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private  userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private readonly mailerService: MailerService
  ) 

   {}


  async createUser(createUserDto: CreateUserDto): Promise<User> {
    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hashedPassword;

    // Create the user
    const user = new this.userModel(createUserDto);
    const createdUser = await user.save();

    return createdUser;
  }




  async registerUser(registerUserDto: RegisterUserDto): Promise<User> {
    try {
      // Vérifiez d'abord si l'utilisateur existe déjà dans la base de données
      const existingUser = await this.findByEmail(registerUserDto.email);
      if (existingUser) {
        throw new Error(`User with email ${registerUserDto.email} already exists`);
      }

      // Vérifiez si les mots de passe correspondent
      if (registerUserDto.password !== registerUserDto.confirmPassword) {
        throw new Error(`Passwords do not match`);
      }

      // Hash du mot de passe avant de l'enregistrer
      const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);
      registerUserDto.password = hashedPassword;

      // Définir le rôle par défaut à 'consommateur'
      registerUserDto.role = 'consommateur';

      // Créer l'utilisateur avec le rôle par défaut ou celui spécifié dans le DTO
      const user = new this.userModel(registerUserDto);
      const createdUser = await user.save();

      // Envoyer un e-mail d'inscription
      await this.sendRegistrationEmail(registerUserDto);

      return createdUser;
    } catch (error) {
      throw new Error(`Error registering user: ${error.message}`);
    }
  }

  async sendRegistrationEmail(registerUserDto: RegisterUserDto): Promise<void> {
    // Personnalisez le contenu de l'e-mail
    const emailContent = `
      <p>Bonjour ${registerUserDto.nom},</p>
      <p>Votre inscription a été réussie avec succès.</p>
      <p>Merci de vous être inscrit sur KOOL'UP.</p>
      <p>Cordialement,</p>
      <p>L'équipe de KOOL'UP</p>
    `;

    // Envoi de l'e-mail
    try {
      await this.mailerService.sendMail({
        to: registerUserDto.email,
        subject: 'Confirmation d\'inscription',
        html: emailContent,
      });
      console.log('Registration email sent successfully');
    } catch (error) {
      console.error('Error sending registration email:', error);
      // Gérez les erreurs d'envoi d'e-mail de manière appropriée
    }
  }

  
  
  async createResto(createUserDto: CreateUserDto): Promise<User> {
    // Assuming the user creating the restaurant is always an admin
    createUserDto.role = 'resto';
  
    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hashedPassword;

    const user = new this.userModel(createUserDto);
    const createdUser = await user.save();
  
    return createdUser;
  }
  

  async createLivreur(createUserDto: CreateUserDto): Promise<User> {
    
    createUserDto.role = 'livreur';
  
    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hashedPassword;

    const user = new this.userModel(createUserDto);
    console.log(user)
    const createdUser = await user.save();
  
    return createdUser;
  }


  async updateUser(id: string, updateUserDto: Partial<UpdateUserDto>): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  
    return user;
  }
  


  async deleteUserById(id: string): Promise<void> {
    const result = await this.userModel.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }


  async getUserById(id: string): Promise<User> {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  
  // Helper method to decode token from Authorization header
  private decodeTokenFromHeader(authorizationHeader: string): any {
    const token = authorizationHeader.split(' ')[1];
    const decodedToken = this.jwtService.decode(token);
    return decodedToken;
  }



  async getUserByName(name: string): Promise<User> {
    const user = await this.userModel.findOne({ name });

    if (!user) {
      throw new NotFoundException(`User with name ${name} not found`);
    }

    return user;
  }

  async getUserByAdresse(adresse: string): Promise<User> {
    const user = await this.userModel.findOne({ adresse });

    if (!user) {
      throw new NotFoundException(`User with address ${adresse} not found`);
    }

    return user;
  }

  async getUserByTelephone(telephone: string): Promise<User> {
    const user = await this.userModel.findOne({ telephone });

    if (!user) {
      throw new NotFoundException(`User with telephone ${telephone} not found`);
    }

    return user;
  }



  async findByEmail(email: string): Promise<User> {
     const User = await this.userModel.findOne({ email });
        
     return User;
      }

      
      async getUsers(): Promise<User[]> {
        // Retrieve all users from the database
        const users = await this.userModel.find();
      
        return users;
      }


      async getRestoUsers(): Promise<User[]> {
        // Retrieve all users with the role 'resto' from the database
        const users = await this.userModel.find({ role: 'resto' });
        console.log("users", users)
    
        // Check if any users with the role 'resto' were found
        if (!users || users.length === 0) {
          throw new NotFoundException('No users with role "resto" found.');
        }
    
        return users;
      }

      async getLivreurUsers(): Promise<User[]> {
        // Retrieve all users with the role 'livreur' from the database
        const users = await this.userModel.find({ role: 'livreur' });
    
        // Check if any users with the role 'livreur' were found
        if (!users || users.length === 0) {
          throw new NotFoundException('No users with role "livreur" found.');
        }
    
        return users;
      }

      async getConsommateurUsers(): Promise<User[]> {
        const users = await this.userModel.find({ role: 'consommateur' });
        if (!users || users.length === 0) {
          throw new NotFoundException('No users with role "consommateur" found.');
        }
        return users;
      }

      async countLivreur(): Promise<number> {
        return await this.userModel.countDocuments({ role: 'livreur' });
      }
    
      async countConsommateur(): Promise<number> {
        return await this.userModel.countDocuments({ role: 'consommateur' });
      }
    
      async countResto(): Promise<number> {
        return await this.userModel.countDocuments({ role: 'resto' });
      }

  async save(User: User): Promise<User> {
    return await User.save();
  }
}
