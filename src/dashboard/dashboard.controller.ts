import { Controller, Get, Headers } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';

@ApiTags('Dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('kpi')
  @ApiOperation({ summary: 'Get Indicators (KPIs)' })
  getKpi(@Headers('x-user-id') userId: string) {
    return this.dashboardService.getKpi(userId);
  }
}
