import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('DHIS2 - Extension')
@Controller('extension')
export class ExtensionController {}
