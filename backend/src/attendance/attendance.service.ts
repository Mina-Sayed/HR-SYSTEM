import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Attendance } from './entities/attendance.entity';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { EmployeeService } from '../employee/employee.service';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private attendanceRepository: Repository<Attendance>,
    private employeeService: EmployeeService,
  ) {}

  async create(createAttendanceDto: CreateAttendanceDto): Promise<Attendance> {
    const employee = await this.employeeService.findOne(
      createAttendanceDto.employeeId,
    );

    // Check if attendance already exists for this date
    const existingAttendance = await this.attendanceRepository.findOne({
      where: {
        employeeId: createAttendanceDto.employeeId,
        date: createAttendanceDto.date,
      },
    });

    if (existingAttendance) {
      throw new ConflictException('Attendance already recorded for this date');
    }

    const attendance = this.attendanceRepository.create({
      ...createAttendanceDto,
      employee,
    });

    return this.attendanceRepository.save(attendance);
  }

  async findAll(): Promise<Attendance[]> {
    return this.attendanceRepository.find({
      relations: ['employee'],
      order: {
        date: 'DESC',
      },
    });
  }

  async findByEmployee(employeeId: number): Promise<Attendance[]> {
    await this.employeeService.findOne(employeeId); // Verify employee exists

    return this.attendanceRepository.find({
      where: { employeeId },
      relations: ['employee'],
      order: {
        date: 'DESC',
      },
    });
  }

  async findByDateRange(
    startDate: string,
    endDate: string,
  ): Promise<Attendance[]> {
    return this.attendanceRepository.find({
      where: {
        date: Between(startDate, endDate),
      },
      relations: ['employee'],
      order: {
        date: 'DESC',
      },
    });
  }

  async remove(id: number): Promise<void> {
    const result = await this.attendanceRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Attendance record with ID ${id} not found`);
    }
  }
}
