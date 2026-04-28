import { IsString, IsOptional, IsUUID, IsIn } from 'class-validator';

export class CreateResourceDto {
  @IsString()
  title!: string;

  @IsString()
  content!: string;

  @IsUUID()
  categoryId!: string;

  @IsUUID()
  languageId!: string;

  @IsOptional()
  @IsString()
  source_url?: string;

  @IsOptional()
  @IsIn(['draft', 'published', 'review'])
  status?: string;
}