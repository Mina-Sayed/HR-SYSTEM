import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { EmployeeGroup } from '../employee/entities/employee.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredGroup = this.reflector.get<EmployeeGroup>(
      'group',
      context.getHandler(),
    );
    if (!requiredGroup) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return user && user.group === requiredGroup;
  }
}
