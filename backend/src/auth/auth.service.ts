import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { EmployeeService } from '../employee/employee.service';
import { EmployeeGroup } from '../employee/entities/employee.entity';

@Injectable()
export class AuthService {
  constructor(
    private employeeService: EmployeeService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    console.log('Attempting to validate user:', email);
    const user = await this.employeeService.findByEmail(email);
    console.log('Found user:', user);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('Password valid:', isPasswordValid);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.group !== EmployeeGroup.HR) {
      throw new UnauthorizedException('Only HR employees can login');
    }

    delete user.password;
    return user;
  }

  async login(email: string, password: string) {
    console.log('Login attempt for:', email);
    const user = await this.validateUser(email, password);
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
      employee: user,
    };
  }
}
