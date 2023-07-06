import { PartialType } from '@nestjs/mapped-types';
import { CreateAdditionalUserDto } from './create-additional-user.dto';

export class FindAdditionalUserDto extends PartialType(
  CreateAdditionalUserDto,
) {}
